"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useLocomotiveScroll } from "react-locomotive-scroll";

import { GitHub, ExternalLink, Cross } from "@/components/icons";
import { IconButton } from "@/components/icon-button";
import { Button } from "../button";

import { projects } from "@/components/projects";
import { createPortal } from "react-dom";

export const Projects = () => {
  const { scroll } = useLocomotiveScroll();
  const [index, setIndex] = useState<any>(false);

  const handleClose = useCallback(() => {
    setIndex(false);
  }, []);
  const handleSetIndex = useCallback((i: number) => {
    if (index === false) {
      setIndex(i);
    }
  }, []);

  if (typeof document !== "undefined" && scroll) {
    if (index > 0) {
      scroll.stop();
      if (window.innerWidth <= 768) {
        document.body.style.overflowY = "hidden";
      }
    } else {
      scroll.start();
      if (window.innerWidth <= 768) {
        document.body.style.overflowY = "scroll";
      }
    }

    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape" && index) {
        handleClose();
      }
    });
  }

  return (
    <LayoutGroup>
      <ul className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {projects.map((project, i) => (
          <motion.li
            key={i + 1}
            layoutId={`${i + 1}`}
            onClick={() => handleSetIndex(i + 1)}
          >
            <motion.article
              className="grid h-full cursor-pointer grid-cols-[0.5fr,1.5fr] items-center gap-4 rounded-3xl bg-[rgb(var(--secondary-rgb),0.2)] p-4 backdrop-blur-xl max-lg:flex max-lg:flex-col lg:max-h-[300px]"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="relative">
                <img
                  src={project.coverImage}
                  alt="Project Cover Image"
                  className="w-full max-w-[350px] rounded-2xl shadow-lg"
                  loading="lazy"
                />
                <motion.a
                  className="absolute bottom-2 right-2 grid items-center rounded-full bg-[rgb(var(--secondary-rgb),0.2)] p-2 backdrop-blur-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={project.links.site}
                  target="_blank"
                >
                  <ExternalLink fill="#fff" height={0.9} />
                </motion.a>
              </div>
              <div>
                <h1 className="text-5xl">{project.title}</h1>
                <ReactMarkdown
                  className="relative max-h-[50px] overflow-hidden after:absolute after:bottom-0 after:left-0 after:block after:h-full after:w-full after:bg-gradient-to-t after:from-[var(--s)] max-lg:max-h-[80px]"
                  components={{
                    a({ children, ...props }) {
                      return (
                        <a
                          {...props}
                          target="_blank"
                          onClick={(e) => e.preventDefault()}
                          className="underline"
                        >
                          {children}
                        </a>
                      );
                    },
                    p({ children }) {
                      return <p className="text-lg leading-5">{children}</p>;
                    },
                  }}
                >
                  {project.description}
                </ReactMarkdown>

                <div className="mt-4 flex justify-between">
                  <Button
                    fill
                    onClick={() => index === false && setIndex(i + 1)}
                  >
                    More Info
                  </Button>
                  <div className="flex gap-2">
                    {project.links.github && (
                      <IconButton
                        href={project.links.github}
                        target="_blank"
                        fill
                      >
                        <GitHub />
                      </IconButton>
                    )}
                    {project.links.site && (
                      <IconButton
                        href={project.links.site}
                        target="_blank"
                        fill
                      >
                        <ExternalLink />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.li>
        ))}
      </ul>
      <AnimatePresence>
        {index !== false && (
          <>
            {createPortal(
              // @ts-ignore
              <motion.div
                key="modal"
                className="fixed left-0 top-0 z-[3000] grid h-full w-full place-items-center overflow-y-scroll bg-[rgb(var(--primary-rgb),0.7)] p-4 backdrop-blur-xl max-md:fixed"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    handleClose();
                  }
                }}
                variants={{
                  hidden: {
                    opacity: 0,
                    transition: {
                      duration: 0.16,
                    },
                  },
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.04,
                      duration: 0.2,
                    },
                  },
                }}
                initial="hidden"
                exit="hidden"
                animate="visible"
              >
                <motion.div layoutId={`${index}`} className="max-w-[800px]">
                  <motion.article className="flex h-max items-center gap-4 rounded-3xl bg-[rgb(var(--secondary-rgb),0.2)] p-4 backdrop-blur-3xl max-sm:flex-col">
                    <div className="relative md:aspect-square md:h-[312px]">
                      <img
                        src={projects[index - 1].coverImage}
                        alt="Projects[index] Cover Image"
                        className="rounded-2xl  shadow-lg "
                      />
                      <motion.a
                        className="absolute bottom-2 right-2 grid items-center rounded-full bg-[rgb(var(--secondary-rgb),0.2)] p-2 backdrop-blur-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={projects[index - 1].links.site}
                        target="_blank"
                      >
                        <ExternalLink fill="#fff" height={0.9} />
                      </motion.a>
                      <motion.button
                        className="absolute right-2 top-2 grid items-center rounded-full bg-[rgb(var(--secondary-rgb),0.2)] p-2 backdrop-blur-md md:hidden"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClose}
                      >
                        <Cross fill="#fff" height={0.9} />
                      </motion.button>
                    </div>
                    <div>
                      <h1 className="text-5xl">{projects[index - 1].title}</h1>
                      <ReactMarkdown
                        className="card-content"
                        components={{
                          a({ children, ...props }) {
                            return (
                              <a
                                {...props}
                                target="_blank"
                                className="underline"
                              >
                                {children}
                              </a>
                            );
                          },
                          p({ children }) {
                            return <p className="text-base">{children}</p>;
                          },
                        }}
                      >
                        {projects[index - 1].description}
                      </ReactMarkdown>
                      <div className="mt-2 flex max-w-[500px] flex-wrap gap-2">
                        {projects[index - 1].stack.map((s) => (
                          <div
                            key={s}
                            className="max-h-8 grow overflow-hidden rounded-xl bg-[rgb(var(--primary-rgb),0.2)] px-2 py-1 text-center"
                          >
                            {s}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-end gap-2">
                        {projects[index - 1].links.github && (
                          <IconButton
                            target="_blank"
                            href={projects[index - 1].links.github || ""}
                            fill
                          >
                            <GitHub />
                          </IconButton>
                        )}
                        {projects[index - 1].links.site && (
                          <IconButton
                            target="_blank"
                            href={projects[index - 1].links.site || ""}
                            fill
                          >
                            <ExternalLink />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </motion.div>
              </motion.div>,
              document.body,
            )}
          </>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};
