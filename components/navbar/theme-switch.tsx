"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const themes = [
        { color: "green", hex: "#8eabab", prim: "#2c4141" },
        { color: "maroon", hex: "#ab8e96", prim: "#412c31" },
        { color: "pink", hex: "#ab8ea6", prim: "#412c40" },
        { color: "blue", hex: "#8e94ab", prim: "#2c2f41" },
        { color: "yellow", hex: "#aaab8e", prim: "#413f2c" },
    ];

    const variants = {
        open: { translateY: 0, opacity: 1 },
        close: { translateY: 30, opacity: 0 },
    };

    const changeTheme = (color: string) => {
        setTheme(color);
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "scroll";
        }
    }, [isOpen]);

    return (
        <>
            <div className="relative z-[1002]">
                <motion.button
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ type: "spring", opacity: 1, translateY: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer w-12 h-12 border-4 border-secondary border-opacity-30 rounded-full"
                    style={{
                        background: themes.filter((e) => e.color === theme)[0]
                            .prim,
                        borderColor: themes.filter((e) => e.color === theme)[0]
                            .hex,
                    }}
                    aria-labelledby="theme-switch-dropdown"
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                ></motion.button>

                <motion.ul
                    className={`w-[200px] p-2 absolute right-1 mt-4 bg-white/10 rounded-2xl backdrop-blur-lg flex flex-col gap-2 z-[1002] ${
                        isOpen ? "visible" : "invisible"
                    }`}
                    variants={variants}
                    initial={{
                        translateY: 30,
                        opacity: 0,
                    }}
                    animate={isOpen ? "open" : "close"}
                >
                    {themes.map((th, i) => (
                        <motion.li
                            className={`cursor-pointer flex items-center gap-2 p-2 rounded-xl transition-colors hover:bg-white/5 ${
                                theme === th.color ? "bg-white/10" : null
                            }`}
                            variants={variants}
                            key={th.hex}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                translateY: { delay: i * 0.05 },
                                opacity: { delay: i * 0.05 },
                            }}
                            onClick={() => changeTheme(th.color)}
                        >
                            <div
                                className="w-8 h-8 border-2 border-secondary border-opacity-30 rounded-full"
                                style={{
                                    background: th.prim,
                                    borderColor: th.hex,
                                }}
                            ></div>
                            <span>{th.color}</span>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>

            {isOpen &&
                createPortal(
                    <div
                        className="z-[100] w-full h-full fixed"
                        onClick={() => setIsOpen(false)}
                    ></div>,
                    document.body
                )}
        </>
    );
};
