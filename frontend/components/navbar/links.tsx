"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const Links = ({ col }: { col?: boolean }) => {
  const pathname = usePathname();

  const links = [
    { label: "Projects", href: "/projects" },
    { label: "Writings", href: "/writings" },
  ];

  return (
    <ul className={twMerge("hidden gap-4 md:flex", col && "flex flex-col")}>
      {links.map((link, i) => {
        const isActive = pathname.includes(link.href);

        return (
          <li key={i} className={col ? "flex justify-center" : undefined}>
            <Link
              href={link.href}
              className={twMerge(
                "after:from-priamry-300/90 after:to-priamry-200/90 dark:after:to-priamry-600/50 dark:after:from-priamry-700/50 relative isolate before:transition-transform before:duration-300 before:ease-in-out after:absolute after:bottom-0 after:left-0 after:-z-[1] after:block after:h-2 after:w-full after:-translate-x-0 after:-translate-y-0 after:scale-0 after:rounded after:bg-gradient-to-b after:transition-transform after:duration-300 after:ease-in-out after:content-[''] hover:before:scale-100",

                !isActive &&
                  "before:from-priamry-300/50 before:to-priamry-200/50 dark:before:to-priamry-600/50 dark:before:from-priamry-700/50 before:absolute before:inset-0 before:-z-[1] before:block before:h-[calc(100%+12px)] before:w-[calc(100%+12px)] before:-translate-x-1.5 before:-translate-y-1.5 before:scale-0 before:rounded-lg before:bg-gradient-to-b",

                isActive && "after:scale-100",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
