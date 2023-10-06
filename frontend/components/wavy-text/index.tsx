"use client";

// https://dev.to/harshhhdev/create-a-satisfying-wavy-text-animation-with-framer-motion-3hb5

import { FC, useState } from "react";
import {
  motion,
  Variants,
  HTMLMotionProps,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

interface Props extends HTMLMotionProps<"h1"> {
  text: string;
  delay?: number;
  replay: boolean;
  duration?: number;
  float?: boolean;
}

export const WavyText: FC<Props> = ({
  text,
  delay = 0,
  duration = 0.05,
  replay,
  float,
  ...props
}: Props) => {
  const { scrollYProgress } = useScroll();
  const [hookedYPostion, setHookedYPosition] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHookedYPosition(latest);
  });

  const letters = Array.from(text);

  const container: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.h1
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate={replay ? "visible" : "hidden"}
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          data-scroll={float}
          data-scroll-speed={float ? index * 0.5 : "0"}
          style={{ translateY: float ? hookedYPostion * index * -75 : 1 }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};
