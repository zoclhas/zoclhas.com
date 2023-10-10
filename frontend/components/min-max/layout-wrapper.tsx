"use client";

import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { Posts } from "@/app/writings/types";
import Link from "next/link";
import { MotionDivWrapper } from "@/components/min-max/index";

export const LayoutWrapper = ({ posts }: { posts: Posts }) => {
  const [layout, setLayout] = useState<"min" | "max">("max");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const layoutFromStorage = localStorage.getItem("layout");
    if (layoutFromStorage) {
      if (
        String(layoutFromStorage) === "min" ||
        String(layoutFromStorage) === "max"
      ) {
        setLayout(layoutFromStorage as unknown as "min" | "max");
      }
    }

    setMounted(true);

    const setLayoutFromEvent = (event: any) => {
      setLayout(event.detail.layout);
    };

    document.addEventListener("layoutUpdate", setLayoutFromEvent);

    return () => {
      document.removeEventListener("layoutUpdate", setLayoutFromEvent);
    };
  }, []);

  if (mounted) {
    return (
      <LayoutGroup>
        {layout === "max" ? (
          <>
            {posts.docs.map((post) => (
              <MotionDivWrapper key={post.id} id={post.id}>
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
              </MotionDivWrapper>
            ))}
          </>
        ) : (
          <>
            {posts.docs.map((post) => (
              <MotionDivWrapper
                key={post.id}
                id={post.id}
                className="flex max-sm:flex-col sm:items-center sm:gap-4"
              >
                <span className="ml-4 text-sm font-bold text-[rgb(var(--secondary-rgb),0.8)]">
                  {post.createdAt.slice(0, 10)}
                </span>
                <Link
                  href={`/writings/${post.slug}`}
                  className="group relative flex items-center rounded-xl px-4 transition-colors ease-in hover:bg-[rgb(var(--secondary-rgb),0.15)]"
                >
                  <h2 className="flex items-center justify-between gap-2 text-2xl">
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
                </Link>
              </MotionDivWrapper>
            ))}
          </>
        )}
      </LayoutGroup>
    );
  }
};
