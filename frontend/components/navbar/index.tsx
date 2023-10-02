"use client";

import { useEffect, useState } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { InpageScroll } from "@/components/button/InpageScroll";

export const NavBar = () => {
  const { scroll } = useLocomotiveScroll();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!isLoaded) {
      setTimeout(() => setIsLoaded(true), 1500);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <nav className="fixed z-[1000] flex h-[80px] w-full items-center justify-between gap-4 bg-[rgb(var(--primary-rgb),0.7)] p-4 px-12 backdrop-blur-lg max-xs:px-4">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ type: "spring", opacity: 1, translateY: 0 }}
            whileHover={{ scale: 1.1, opacity: 0.7 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href="/"
              className="text-2xl font-bold"
              onClick={(e) => {
                e.preventDefault();
                scroll.scrollTo("top", {
                  duration: 350,
                });
              }}
            >
              zoclhas.com
            </Link>
          </motion.div>

          <ThemeSwitch />
        </div>

        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ type: "spring", opacity: 1, translateY: 0 }}
        >
          <InpageScroll href="#contact" fill>
            Contact
          </InpageScroll>
        </motion.div>
      </nav>
    </>
  );
};
