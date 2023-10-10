"use client";

import { usePathname } from "next/navigation";
import { GitHub } from "@/components/icons";
import { useEffect, useState } from "react";

export default function Footer() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.split("/").includes("writings") || pathname === "/unsub") {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [pathname]);

  return (
    <footer
      className={`max-xs:mx-4 mx-auto my-2 flex max-h-[56px] max-w-[450px] items-center justify-center gap-5 overflow-hidden rounded-3xl bg-[rgb(var(--secondary-rgb),0.2)] p-4 backdrop-blur-lg md:mt-8 ${
        hidden ? "!hidden" : ""
      }`}
    >
      <div className="w-max">
        <GitHub height={1.4} />
      </div>
      <p>
        View source on{" "}
        <a
          href="https://github.com/zoclhas/zoclhas.com"
          target="_blank"
          className="font-bold underline"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
