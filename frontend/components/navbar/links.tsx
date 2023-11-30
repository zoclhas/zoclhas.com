"use client";

import Link from "next/link";

export const Links = () => {
  const links = [
    { label: "Projects", href: "/projects" },
    { label: "Writings", href: "/writings" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <ul className="flex gap-4">
      {links.map((link, i) => (
        <li key={i}>
          <Link
            href={link.label}
            className="dark:hover:text-sand5 hover:text-sand11 transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
