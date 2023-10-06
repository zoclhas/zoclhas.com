"use client";

import { motion } from "framer-motion";
import { GitHub } from "@/components/icons";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, translateY: 200 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="max-xs:mx-4 mx-auto my-2 flex max-h-[56px] max-w-[450px] items-center justify-center gap-5 overflow-hidden rounded-3xl bg-[rgb(var(--secondary-rgb),0.2)] p-4 backdrop-blur-lg"
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
    </motion.footer>
  );
}
