"use client";

import { getPresetThemeStyles } from "@/utils/theme-preset-helper";
import { cn } from "@/lib/utils";
import { colorFormatter } from "@/utils/color-converter";
import { ThemeEditorState } from "@/types/theme";
import { Button } from "./ui/button";

// ColorBox component remains internal to ThemePresetButtons
const ColorBox = ({ color }: { color: string }) => {
  return <div className="h-3 w-3 rounded-sm border" style={{ backgroundColor: color }} />;
};

interface ThemePresetButtonsProps {
  presetNames: string[];
  mode: "light" | "dark";
  themeState: ThemeEditorState;
  applyThemePreset: (presetName: string) => void;
}

export function ThemePresetButtons({
  presetNames,
  mode,
  themeState,
  applyThemePreset,
}: ThemePresetButtonsProps) {
  // Use the intended slice of presets
  const presetsToShow = presetNames || [];
  const numUniquePresets = presetsToShow.length;

  // Avoid rendering if no presets
  if (numUniquePresets === 0) {
    return null;
  }

  // --- Configuration ---
  const numRows = 1;
  const buttonWidthPx = 160; // Keep consistent with previous style
  const gapPx = 16; // space-x-4 -> 1rem = 16px
  // const rowGapPx = 16; // gap-y-4 -> 1rem = 16px
  // const duplicationFactor = 4; // Duplicate multiple times for wider screens
  const baseDurationPerItem = 5; // Seconds per item for animation speed
  // ---------------------

  // Distribute presets somewhat evenly across rows
  const presetsByRow: string[][] = Array.from({ length: numRows }, () => []);
  presetsToShow.forEach((preset, index) => {
    presetsByRow[index % numRows].push(preset);
  });

  // Function to create props for a single row
  const createRowProps = (rowIndex: number) => {
    const rowPresets = presetsByRow[rowIndex];
    const numPresetsInRow = rowPresets.length;
    if (numPresetsInRow === 0) return null;

    // const duplicatedRowPresets = Array(duplicationFactor).fill(rowPresets).flat();
    const totalWidth = numPresetsInRow * (buttonWidthPx + gapPx);
    const duration = numPresetsInRow * baseDurationPerItem;

    // Stagger start slightly for visual effect
    const initialOffset = 0;

    return {
      key: `row-${rowIndex}`,
      presets: rowPresets,
      numOriginalPresets: numPresetsInRow,
      animate: { x: [initialOffset, initialOffset - totalWidth] }, // Animate based on original set width, starting from offset
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
      },
      style: { x: initialOffset }, // Apply initial offset
    };
  };

  const rowsData = Array.from({ length: numRows }, (_, i) => createRowProps(i)).filter(Boolean);

  return (
    // Container for the rows with vertical gap
    <div>
      {rowsData.map((rowData) => (
        <div key={rowData!.key} className="flex flex-wrap">
          <div className="flex flex-wrap" style={{ gap: `${gapPx}px` }}>
            {rowData!.presets.map((presetName, index) => {
              const themeStyles = getPresetThemeStyles(presetName)[mode];
              const bgColor = colorFormatter(themeStyles.primary, "hsl", "4");
              const isSelected = presetName === themeState.preset;

              return (
                <Button
                  key={`${presetName}-${index}`}
                  className={cn(
                    "bg-primary/10 wrap flex h-10 items-center justify-center transition-colors duration-200",
                    "px-4 py-3 hover:shadow-lg",
                    isSelected ? "ring-primary/50 shadow-md ring-2" : ""
                  )}
                  style={{
                    backgroundColor: bgColor
                      .replace("hsl", "hsla")
                      .replace(/\s+/g, ", ")
                      .replace(")", ", 0.10)"),
                    color: themeStyles.foreground,
                  }}
                  variant="ghost"
                  onClick={() => applyThemePreset(presetName)}
                >
                  <div className="flex items-center gap-2.5 text-center">
                    <div className="flex gap-1">
                      <ColorBox color={themeStyles.primary} />
                      <ColorBox color={themeStyles.secondary} />
                      <ColorBox color={themeStyles.accent} />
                    </div>
                    <span className="px-1 leading-tight capitalize">
                      {presetName.replace(/-/g, " ")}
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
