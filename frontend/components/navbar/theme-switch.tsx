"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const themes = [
    { color: "green", hex: "#8eabab", prim: "#2c4141" },
    { color: "maroon", hex: "#ab8e96", prim: "#412c31" },
    { color: "pink", hex: "#ab8ea6", prim: "#412c40" },
    { color: "blue", hex: "#8e94ab", prim: "#2c2f41" },
    { color: "yellow", hex: "#aaab8e", prim: "#413f2c" },
  ];

  const variants = {
    open: { translateY: 0, opacity: 1 },
    close: { translateY: 30, opacity: 0 },
  };

  const changeTheme = (color: string) => {
    setTheme(color);
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isOpen) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "scroll";
      }
    }
  }, [isOpen]);

  return (
    <>
      <div className="relative z-[1002]">
        <motion.button
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ type: "spring", opacity: 1, translateY: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="border-secondary from-primary to-secondary h-12 w-12 cursor-pointer rounded-full border-4 border-opacity-30  bg-gradient-to-tr"
          aria-labelledby="theme-switch-dropdown"
          aria-label="theme-switch-dropdown"
          title="theme-switch-dropdown"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        ></motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="absolute right-0 z-[1002] mt-4 flex w-[200px] flex-col gap-2 rounded-2xl bg-white/10 p-2 backdrop-blur-lg"
              initial={{ translateY: 20, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: 20, opacity: 0 }}
            >
              {themes.map((th, i) => (
                <motion.li
                  className={`flex cursor-pointer items-center gap-2 rounded-xl p-2 transition-colors hover:bg-white/5 ${
                    theme === th.color ? "bg-white/10" : null
                  }`}
                  initial={variants.close}
                  animate={variants.open}
                  exit={variants.close}
                  key={th.hex}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    translateY: { delay: i * 0.05 },
                    opacity: { delay: i * 0.05 },
                  }}
                  onClick={() => changeTheme(th.color)}
                >
                  <div
                    className="border-secondary h-8 w-8 rounded-full border-2 border-opacity-30"
                    style={{
                      background: `linear-gradient(45deg, ${th.prim}, ${th.hex})`,
                      borderColor: th.hex,
                    }}
                  ></div>
                  <span className="drop-shadow-lg">{th.color}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {isOpen &&
        createPortal(
          // @ts-ignore
          <div
            className="fixed top-0 z-[100] h-full w-full"
            onClick={() => setIsOpen(false)}
          ></div>,
          document.body,
        )}
    </>
  );
};
