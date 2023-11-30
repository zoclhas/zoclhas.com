"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const Links = ({ col }: { col?: boolean }) => {
  const pathname = usePathname();

  const links = [
    { label: "Projects", href: "/projects" },
    { label: "Writings", href: "/writings" },
    { label: "Contact", href: "/contact" },
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
                "before:from-priamry-300/50 before:to-priamry-200/50 dark:before:to-priamry-600/50 dark:before:from-priamry-700/50 relative isolate before:absolute before:inset-0 before:-z-[1] before:block before:h-[calc(100%+12px)] before:w-[calc(100%+12px)] before:-translate-x-1.5 before:-translate-y-1.5 before:scale-0 before:rounded-lg before:bg-gradient-to-t before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-100",

                isActive &&
                  "before:inset-auto before:bottom-0 before:h-2 before:w-full before:-translate-x-0 before:-translate-y-0 before:scale-100 before:rounded",
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
