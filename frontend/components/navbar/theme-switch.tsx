"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export const ThemeSwitch = ({ theme }: { theme: string }) => {
  const [_theme, setTheme] = useState(theme);

  const toogleTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle("dark");
    if (root.classList.contains("dark")) {
      setTheme("dark");
      document.cookie = `theme=${"dark"}`;
    } else {
      setTheme("light");
      document.cookie = `theme=${"light"}`;
    }
  };

  return (
    <button onClick={toogleTheme} aria-label="Theme switch button">
      {_theme == "dark" ? (
        <Moon className="text-paper size-5 translate-y-0.5" />
      ) : _theme == "light" ? (
        <Sun className="size-5 translate-y-0.5 text-blue-800" />
      ) : null}
    </button>
  );
};
