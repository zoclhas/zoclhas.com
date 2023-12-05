import Link from "next/link";
import { ThemeSwtich } from "./theme-switch";
import { Links } from "./links";
import { Button } from "../button";
import { Github } from "lucide-react";
import { Menu } from "./menu";

export const Navbar = () => {
  return (
    <nav className="relative isolate z-[1000] flex items-center justify-center px-4 py-8">
      <header className="shadow-default z-[1001] flex max-w-5xl grow items-center justify-between gap-2 rounded-3xl bg-gradient-to-t from-gray-200/40 to-gray-100/30 p-2 backdrop-blur-2xl dark:bg-gradient-to-b dark:from-gray-900/20 dark:to-gray-900/[0.6]">
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
            >
              <Github className="stroke-sand1" />
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
