"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";

export const NavBar = () => {
  return (
    <>
      <nav className="max-xs:px-4 from-[rgb(var(--primary-rgb,1)] sticky top-0 isolate z-[1000] flex h-[80px] w-full items-center justify-between gap-4 bg-gradient-to-b p-4 px-12">
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ type: "spring", opacity: 1, translateY: 0 }}
          whileHover={{ scale: 1.1, opacity: 0.7 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/" className="text-2xl font-bold">
            zoclhas.com
          </Link>
        </motion.div>

        <ThemeSwitch />

        <div className="gradient-blur">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </>
  );
};
