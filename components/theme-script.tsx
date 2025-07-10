"use client";

import { defaultDarkThemeStyles, defaultLightThemeStyles } from "@/config/theme";

export function ThemeScript() {
  const scriptContent = `
    (function() {
      const storageKey = "editor-storage";
      const root = document.documentElement;
      const defaultLightStyles = ${JSON.stringify(defaultLightThemeStyles)};
      const defaultDarkStyles = ${JSON.stringify(defaultDarkThemeStyles)};

      // Get theme from localStorage first, then fall back to system preference
      let themeState = null;
      let currentMode = "light"; // Default fallback
      
      try {
        const persistedStateJSON = localStorage.getItem(storageKey);
        if (persistedStateJSON) {
          themeState = JSON.parse(persistedStateJSON)?.state?.themeState;
          if (themeState?.currentMode) {
            currentMode = themeState.currentMode;
          }
        }
      } catch (e) {
        console.warn("Theme initialization: Failed to read/parse localStorage:", e);
      }

      // If no theme in localStorage, check system preference
      if (!themeState?.currentMode) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        currentMode = prefersDark ? "dark" : "light";
      }

      // Apply the theme immediately to prevent flash
      const activeStyles = currentMode === "dark" 
        ? (themeState?.styles?.dark || defaultDarkStyles)
        : (themeState?.styles?.light || defaultLightStyles);

      const stylesToApply = Object.keys(defaultLightStyles);

      for (const styleName of stylesToApply) {
        const value = activeStyles[styleName];
        if (value !== undefined) {
          root.style.setProperty(\`--\${styleName}\`, value);
        }
      }

      // Set the theme class
      if (currentMode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} suppressHydrationWarning />;
}
