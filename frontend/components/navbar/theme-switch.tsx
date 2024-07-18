import { Moon, Sun } from "lucide-react";
import { toggle } from "./theme-action";

export const ThemeSwitch = ({ theme }: { theme: string }) => {
  return (
    <li>
      <form action={toggle}>
        <button type="submit" aria-label="Theme switch button">
          {theme == "dark" ? (
            <Moon className="text-paper size-5 translate-y-0.5" />
          ) : theme == "light" ? (
            <Sun className="size-5 translate-y-0.5 text-blue-800" />
          ) : null}
        </button>
      </form>
    </li>
  );
};
