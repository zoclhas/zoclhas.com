"use client";

import { motion } from "framer-motion";
import { Spotify } from "@/components/spotify";

export const About = () => {
  const stacks = [
    "JavaScript",
    "TypeScript",
    "Next.js",
    "React",
    "TailwindCSS",
    "CSS",
    "SCSS",
    "Python",
    "Django",
    "Flutter",
  ];

  const container = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: i * 0.001,
      },
    }),
  };

  const child = {
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
    <>
      <motion.p
        className="my-4 text-3xl max-sm:text-2xl"
        initial={{ opacity: 0, translateY: 100 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Hello! I&apos;m Zoclhas. I&apos;m primary a webdev, but occasionally
        work on the BE with Django. I also do textures from time to time for{" "}
        <motion.a
          className="dlink"
          href="https://zaura.net"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          zaura.net
        </motion.a>
        . I try to deliver HQ stuff :D (and a swifte &lt;3)
      </motion.p>
      <div className="mt-4 flex flex-col">
        <h3>Technologies:</h3>
        <motion.div
          className="flex flex-wrap gap-2"
          variants={container}
          initial="hidden"
          whileInView={"visible"}
          viewport={{ once: true }}
        >
          {stacks.map((stack) => (
            <motion.div
              className="grow select-none rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] px-6 py-2 text-center"
              key={stack}
              variants={child}
            >
              {stack}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-4 right-4 mt-4 max-md:relative max-md:bottom-0 max-md:right-0 md:hidden">
        <Spotify />
      </div>
    </>
  );
};
