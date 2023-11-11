"use client";

import { motion } from "framer-motion";
import { Spotify } from "@/components/spotify";
import Link from "next/link";
import { About as AboutGlobalProps, Post } from "@/payload-types";
import { NormalRenderBlocks } from "../render-content";

export const About = ({
  posts,
  about,
}: {
  posts: { docs: Post[] };
  about: AboutGlobalProps;
}) => {
  const stacks = about.tech;

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
      <motion.div
        className="about-p my-4 text-3xl max-sm:text-2xl"
        initial={{ opacity: 0, translateY: 100 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <NormalRenderBlocks layout={about.content} />
      </motion.div>
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

      <motion.div
        className="mt-12 flex w-full flex-col gap-4"
        variants={container}
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: true }}
      >
        <Link href="/writings" className="group flex items-center gap-3">
          <motion.h1 className="text-4xl" variants={child}>
            Latest Writings
          </motion.h1>
          <motion.svg
            variants={child}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform ease-in group-hover:translate-x-1"
          >
            <path d="m9 18 6-6-6-6" />
          </motion.svg>
        </Link>
        {posts.docs.map((post) => (
          <motion.div key={post.id} className="flex flex-col" variants={child}>
            <span className="ml-4 text-sm font-bold text-[rgb(var(--secondary-rgb),0.8)]">
              {post.createdAt.slice(0, 10)}
            </span>
            <Link
              href={`/writings/${post.slug}`}
              className="group relative rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] p-4 transition-colors ease-in hover:bg-[rgb(var(--secondary-rgb),0.15)]"
            >
              <h2 className="flex justify-between gap-2 text-2xl">
                {post.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform ease-in group-hover:translate-x-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </h2>
              <p>{post.subtitle}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-4 right-4 mt-4 max-md:relative max-md:bottom-0 max-md:right-0 md:hidden">
        <Spotify />
      </div>
    </>
  );
};
