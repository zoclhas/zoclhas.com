"use client";

import { motion } from "framer-motion";
import { GitHub } from "@/components/icons";

const shouldRenderFooter =
    typeof document !== "undefined" && window.innerWidth > 768;

export default function Footer() {
    if (shouldRenderFooter) {
        return (
            <motion.footer
                className="max-w-[40rem] bg-[rgb(var(--secondary-rgb),0.2)] p-4 absolute bottom-4 left-4 rounded-3xl backdrop-blur-lg overflow-hidden flex gap-5 items-center w-full max-h-[56px]"
                initial={{ maxWidth: "56px", opacity: 0, translateY: 200 }}
                animate={{ opacity: 1, translateY: 0 }}
                whileHover={{
                    maxWidth: "300px",
                }}
                transition={{
                    type: "spring",
                    translateY: {
                        delay: 1.8,
                    },
                    opacity: {
                        delay: 1.8,
                    },
                }}
            >
                <div className="w-max ml-1">
                    <GitHub />
                </div>
                <p>
                    View source on{" "}
                    <a
                        href="https://github.com/zoclhas/zoclhas.com"
                        target="_blank"
                        className="underline font-bold"
                    >
                        GitHub
                    </a>
                </p>
            </motion.footer>
        );
    } else {
        return (
            <motion.footer className="my-2 mx-4 bg-[rgb(var(--secondary-rgb),0.2)] p-4 rounded-3xl backdrop-blur-lg overflow-hidden flex gap-5 items-center max-h-[56px] justify-center">
                <div className="w-max">
                    <GitHub height={1.4} />
                </div>
                <p>
                    View source on{" "}
                    <a
                        href="https://github.com/zoclhas/zoclhas.com"
                        target="_blank"
                        className="underline font-bold"
                    >
                        GitHub
                    </a>
                </p>
            </motion.footer>
        );
    }
}
