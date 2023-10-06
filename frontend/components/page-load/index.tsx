"use client";

import { useEffect, useState } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { motion } from "framer-motion";

export const PageLoad = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoaded) {
      setTimeout(() => setIsOpen(false), 1000);
      setTimeout(() => setIsLoaded(true), 1500);
    }
  }, [isLoaded]);

  if (isLoaded) {
    if (window.innerWidth <= 768) {
      document.body.style.overflowY = "scroll";
    }
    return null;
  }

  const variants = {
    open: { scale: 1 },
    close: { scale: 0 },
  };

  if (typeof document !== "undefined") {
    if (window.innerWidth <= 768) {
      document.body.style.overflowY = "hidden";
    }
  }

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={isOpen ? "open" : "close"}
      variants={variants}
      className="bg-primary fixed z-[3000] grid h-full w-full place-items-center"
    >
      <div>
        <div className="flex select-none items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <h1 className="max-xs:text-4xl text-7xl">zoclhas.com</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              delay: 0.5,
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 0.3,
                type: "spring",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 0.2,
              }}
            >
              <div
                className="border-secondary mx-auto h-12 w-12 rotate-45 rounded-full border-8 border-solid border-t-transparent opacity-50 max-sm:h-8 max-sm:w-8 max-sm:border-4"
                aria-labelledby="Loading Spinner"
              ></div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            delay: 0.5,
          }}
        >
          <h2 className="text-center text-lg font-normal">hi :)</h2>
        </motion.div>
      </div>
    </motion.div>
  );
};
