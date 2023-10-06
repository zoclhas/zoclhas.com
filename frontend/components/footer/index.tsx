"use client";

import { motion } from "framer-motion";
import { GitHub } from "@/components/icons";

const shouldRenderFooter =
  typeof document !== "undefined" && window.innerWidth > 768;

export default function Footer() {
  if (shouldRenderFooter) {
    return (
      <motion.footer
        className="group fixed bottom-4 left-4 flex max-h-[56px] w-full items-center gap-5 overflow-hidden rounded-3xl bg-[rgb(var(--secondary-rgb),0.2)] p-4 backdrop-blur-lg"
        initial={{ maxWidth: "56px", opacity: 0, translateY: 200 }}
        animate={{ opacity: 1, translateY: 0 }}
        whileHover={{
          maxWidth: "300px",
        }}
        transition={{
          type: "spring",
          translateY: {
            delay: 1.8,
          },
          opacity: {
            delay: 1.8,
          },
        }}
      >
        <div className="ml-1 w-max">
          <GitHub />
        </div>
        <motion.p className="!max-w-[0px] overflow-hidden transition-transform ease-in group-hover:!max-w-[300px]">
          View source on{" "}
          <a
            href="https://github.com/zoclhas/zoclhas.com"
            target="_blank"
            className="font-bold underline"
          >
            GitHub
          </a>
        </motion.p>
      </motion.footer>
    );
  } else {
    return (
      <motion.footer className="mx-4 my-2 flex max-h-[56px] items-center justify-center gap-5 overflow-hidden rounded-3xl bg-[rgb(var(--secondary-rgb),0.2)] p-4 backdrop-blur-lg">
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
}
