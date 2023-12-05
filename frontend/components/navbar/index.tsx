import Link from "next/link";
import { ThemeSwtich } from "./theme-switch";
import { Links } from "./links";
import { Button } from "../button";
import { Menu } from "./menu";
import { GitHub } from "../icons";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 isolate z-[1000] flex items-center justify-center bg-gradient-to-b from-gray-50 from-50% px-4 py-8 dark:from-gray-950">
      <header className="shadow-default relative isolate z-[1001] flex max-w-3xl grow items-center justify-between gap-2 rounded-3xl bg-gradient-to-t from-gray-100/40 to-gray-100/20 p-2 px-1 backdrop-blur-2xl before:absolute before:inset-0 before:-z-[1] before:block before:h-full before:w-full before:rounded-[26px] before:bg-gradient-to-t before:from-gray-50 before:to-gray-50 before:content-[''] after:absolute after:inset-0 after:-z-[2] after:block after:h-[calc(100%+4px)] after:w-[calc(100%+4px)] after:-translate-x-0.5 after:-translate-y-0.5 after:rounded-[26px] after:bg-gradient-to-b after:from-gray-100 after:to-gray-100 after:content-[''] dark:from-gray-900/20 dark:to-gray-900 dark:before:bg-gradient-to-b before:dark:from-gray-950 before:dark:to-gray-950 dark:after:bg-gradient-to-t after:dark:from-gray-900/0 after:dark:to-gray-900/50">
        <Link
          href="/"
          className="dark:hover:text-sand5 hover:text-sand11 transition-colors"
        >
          <h1 className="px-2 font-semibold">zoclhas.com</h1>
        </Link>

        <Links />

        <ul className="flex gap-1">
          <li>
            <Button
              href="https://github.com/zoclhas"
              target="_blank"
              isIcon
              className="github-button"
              aria-label="Zoclhas's GitHub profile button"
            >
              <GitHub />
            </Button>
          </li>
          <li className="hidden md:block">
            <ThemeSwtich />
          </li>
          <li>
            <Menu />
          </li>
        </ul>
      </header>
    </nav>
  );
};
