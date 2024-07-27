import { cookies } from "next/headers";
import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";

export const Navbar = () => {
  const theme = cookies().get("theme")?.value || "light";

  return (
    <nav className="from-paper sticky top-0 max-w-xl bg-gradient-to-b px-4 min-[576px]:mx-auto dark:from-neutral-950">
      <header className="flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex gap-1 text-amber-900 after:opacity-0 after:content-['(cd)'] hover:text-amber-700 hover:after:opacity-50 dark:text-amber-400 dark:hover:text-amber-200"
          aria-label="Open"
        >
          <h1 className="underline">zoch.dev</h1>
        </Link>

        <ul className="flex items-center gap-2">
          <ThemeSwitch theme={theme} />
        </ul>
      </header>

      <div className="gradient-blur" aria-hidden>
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
