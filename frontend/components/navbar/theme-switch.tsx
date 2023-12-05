"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { MoonStar, Sun } from "lucide-react";

export const ThemeSwtich = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  function handleSetTheme() {
    console.log(theme);
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      isIcon
      onClick={() => handleSetTheme()}
      aria-label="Switch themes button"
    >
      {theme === "dark" ? <MoonStar /> : <Sun />}
    </Button>
  );
};
