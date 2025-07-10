"use client";
import { useEditorStore } from "@/store/theme-store";
import { defaultPresets } from "@/utils/theme-presets";
import { ThemePresetButtons } from "@/components/theme-preset-buttons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";

export function ThemePresetSelector() {
  const { themeState, applyThemePreset, setThemeState } = useEditorStore();
  const mode = themeState.currentMode;
  const presetNames = Object.keys(defaultPresets);
  return (
    <section id="examples" className="space-y-4">
      <div>
        <Label className="text-base font-medium">Theme Mode</Label>
        <RadioGroup
          onValueChange={(value) =>
            setThemeState({
              ...themeState,
              currentMode: value as "light" | "dark",
            })
          }
          defaultValue={mode}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="light" id="r1" />
            <Label htmlFor="r1">Light</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="dark" id="r2" />
            <Label htmlFor="r2">Dark</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <Label className="text-base font-medium">Theme Presets</Label>
        <ThemePresetButtons
          presetNames={presetNames}
          mode={mode}
          themeState={themeState}
          applyThemePreset={applyThemePreset}
        />
      </div>
    </section>
  );
}
