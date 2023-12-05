"use client";

import { MenuIcon, Plus } from "lucide-react";
import { Button } from "../button";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Links } from "./links";
import { createPortal } from "react-dom";
import { ThemeSwtich } from "./theme-switch";

export const Menu = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (open) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "scroll";
      }
    }
  }, [open]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (typeof document !== "undefined") {
    return (
      <>
        <AnimatePresence>
          <Button
            isIcon
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={!open ? "Open Menu Button" : "Close Menu Button"}
          >
            {!open ? (
              <motion.span
                className="block"
                key="menu-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MenuIcon />
              </motion.span>
            ) : (
              <motion.span
                className="block"
                key="close-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Plus className="rotate-45" />
              </motion.span>
            )}
          </Button>
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 1000 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="shadow-default absolute inset-0 -z-[99] h-max w-full overflow-hidden rounded-3xl bg-gradient-to-t from-gray-100/40 to-gray-100/20 px-4 pb-4 pt-20 backdrop-blur-2xl dark:from-gray-900/20 dark:to-gray-900/10"
            >
              <Links col />
              <div className="flex justify-end">
                <ThemeSwtich />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {createPortal(
          open && (
            <div
              className="fixed inset-0 z-[900] h-full w-full"
              onClick={() => setOpen(false)}
            ></div>
          ),
          document.body,
        )}
      </>
    );
  }
};
