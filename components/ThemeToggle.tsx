"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center"></div>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center overflow-hidden transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-none"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Moon
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 transform ${
            currentTheme === "dark"
              ? "scale-100 rotate-0 opacity-100 text-zinc-100"
              : "scale-50 rotate-90 opacity-0 text-zinc-900"
          }`}
        />
        <Sun
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 transform ${
            currentTheme === "dark"
              ? "scale-50 -rotate-90 opacity-0 text-zinc-100"
              : "scale-100 rotate-0 opacity-100 text-zinc-900"
          }`}
        />
      </div>
    </button>
  );
}
