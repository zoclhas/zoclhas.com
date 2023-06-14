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
    }

    return (
        <LayoutGroup>
            <ul className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                {projects.map((project, i) => (
                    <motion.li
                        key={i + 1}
                        layoutId={`${i + 1}`}
                        onClick={() => index === false && setIndex(i + 1)}
                    >
                        <motion.article
                            className="p-4 bg-[rgb(var(--secondary-rgb),0.2)] rounded-3xl flex gap-4 items-center h-full backdrop-blur-xl max-lg:flex-col cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <div className="relative grow">
                                <img
                                    src={project.coverImage}
                                    alt="Project Cover Image"
                                    className="rounded-2xl shadow-lg w-full"
                                    loading="lazy"
                                    width={150}
                                    height={250}
                                />
                                <motion.a
                                    className="absolute bottom-2 right-2 bg-[rgb(var(--secondary-rgb),0.2)] backdrop-blur-md p-2 rounded-full grid items-center"
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
                                    components={{
                                        a({ children, ...props }) {
                                            return (
                                                <a
                                                    {...props}
                                                    target="_blank"
                                                    onClick={(e) =>
                                                        e.preventDefault()
                                                    }
                                                    className="underline"
                                                >
                                                    {children}
                                                </a>
                                            );
                                        },
                                        p({ children }) {
                                            return (
                                                <p className="text-lg leading-5 max-h-[50px] overflow-hidden relative after:block after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-[var(--s)] after:bottom-0 after:left-0 max-lg:max-h-[80px]">
                                                    {children}
                                                </p>
                                            );
                                        },
                                    }}
                                >
                                    {project.description}
                                </ReactMarkdown>

                                <div className="mt-4 flex justify-between">
                                    <Button
                                        fill
                                        onClick={() =>
                                            index === false && setIndex(i + 1)
                                        }
                                    >
                                        More Info
                                    </Button>
                                    <div className="flex gap-2">
                                        {project.links.site && (
                                            <IconButton
                                                href={project.links.site}
                                                fill
                                            >
                                                <ExternalLink />
                                            </IconButton>
                                        )}
                                        {project.links.github && (
                                            <IconButton
                                                href={project.links.github}
                                                fill
                                            >
                                                <GitHub />
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
                            <motion.div
                                key="modal"
                                className="z-[3000] w-full h-full grid place-items-center absolute top-0 left-0 bg-[rgb(var(--primary-rgb),0.7)] backdrop-blur-xl p-4 max-md:fixed overflow-scroll"
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
                                <motion.div
                                    layoutId={`${index}`}
                                    className="max-w-[800px] overflow-y-scroll"
                                >
                                    <motion.article className="p-4 bg-[rgb(var(--secondary-rgb),0.2)] rounded-3xl flex gap-4 items-center h-max backdrop-blur-3xl max-sm:flex-col">
                                        <div className="relative md:h-[312px] md:aspect-square">
                                            <img
                                                src={
                                                    projects[index - 1]
                                                        .coverImage
                                                }
                                                alt="Projects[index] Cover Image"
                                                className="rounded-2xl  shadow-lg "
                                            />
                                            <motion.a
                                                className="absolute bottom-2 right-2 bg-[rgb(var(--secondary-rgb),0.2)] backdrop-blur-md p-2 rounded-full grid items-center"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                href={
                                                    projects[index - 1].links
                                                        .site
                                                }
                                                target="_blank"
                                            >
                                                <ExternalLink
                                                    fill="#fff"
                                                    height={0.9}
                                                />
                                            </motion.a>
                                            <motion.button
                                                className="absolute top-2 right-2 bg-[rgb(var(--secondary-rgb),0.2)] backdrop-blur-md p-2 rounded-full grid items-center md:hidden"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handleClose}
                                            >
                                                <Cross
                                                    fill="#fff"
                                                    height={0.9}
                                                />
                                            </motion.button>
                                        </div>
                                        <div>
                                            <h1 className="text-5xl">
                                                {projects[index - 1].title}
                                            </h1>
                                            <ReactMarkdown
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
                                                        return (
                                                            <p className="text-base">
                                                                {children}
                                                            </p>
                                                        );
                                                    },
                                                }}
                                            >
                                                {
                                                    projects[index - 1]
                                                        .description
                                                }
                                            </ReactMarkdown>
                                            <div className="flex max-w-[500px] flex-wrap gap-2 mt-2">
                                                {projects[index - 1].stack.map(
                                                    (s) => (
                                                        <div
                                                            key={s}
                                                            className="px-2 py-1 bg-[rgb(var(--primary-rgb),0.2)] rounded-xl max-h-8 overflow-hidden grow text-center"
                                                        >
                                                            {s}
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            <div className="mt-4 flex justify-end gap-2">
                                                {projects[index - 1].links
                                                    .site && (
                                                    <IconButton
                                                        target="blank"
                                                        href={
                                                            projects[index - 1]
                                                                .links.site ||
                                                            ""
                                                        }
                                                        fill
                                                    >
                                                        <ExternalLink />
                                                    </IconButton>
                                                )}
                                                {projects[index - 1].links
                                                    .github && (
                                                    <IconButton
                                                        target="blank"
                                                        href={
                                                            projects[index - 1]
                                                                .links.github ||
                                                            ""
                                                        }
                                                        fill
                                                    >
                                                        <GitHub />
                                                    </IconButton>
                                                )}
                                            </div>
                                        </div>
                                    </motion.article>
                                </motion.div>
                            </motion.div>,
                            document.body
                        )}
                    </>
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
};
