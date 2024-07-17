import { cookies } from "next/headers";
import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";

export const Navbar = () => {
  const theme = cookies().get("theme")?.value || "dark";

  return (
    <nav className="max-w-xl px-4 min-[576px]:mx-auto">
      <header className="flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex gap-1 text-amber-900 after:opacity-0 after:content-['(cd)'] hover:text-amber-700 hover:after:opacity-50 dark:text-amber-400 dark:hover:text-amber-200"
          aria-label="Open"
        >
          <h1 className="underline">zoclhas.com</h1>
        </Link>

        <ul className="flex items-center gap-2">
          <ThemeSwitch theme={theme} />
        </ul>
      </header>

      <div className="gradient-blur">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};
