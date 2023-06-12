"use client";

import { useEffect, useState } from "react";
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
        return null;
    }

    const variants = {
        open: { scale: 1 },
        close: { scale: 0 },
    };

    return (
        <motion.div
            initial={{ scale: 1 }}
            animate={isOpen ? "open" : "close"}
            variants={variants}
            className="bg-primary fixed w-full h-full grid place-items-center"
        >
            <div>
                <div className="select-none flex gap-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <h1 className="text-7xl">zoclhas.com</h1>
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
                                duration: 1,
                                type: "spring",
                                times: [0, 0.2, 0.5, 0.8, 1],
                                repeat: Infinity,
                                repeatDelay: 0.2,
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-full border-8 border-solid border-secondary border-t-transparent mt-4 mx-auto opacity-50 rotate-45"
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
                    <h2 className="text-lg font-normal text-center">hi :)</h2>
                </motion.div>
            </div>
        </motion.div>
    );
};
