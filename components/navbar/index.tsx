import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";

export const NavBar = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    useEffect(() => {
        if (!isLoaded) {
            setTimeout(() => setIsLoaded(true), 1500);
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return null;
    }

    return (
        <>
            <nav className="h-[80px] fixed w-full p-4 flex gap-4 justify-between items-center px-12 bg-[rgb(var(--primary-rgb),0.7)] backdrop-blur-lg max-xs:px-4 z-[1000]">
                <motion.div
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ type: "spring", opacity: 1, translateY: 0 }}
                    whileHover={{ scale: 1.1, opacity: 0.7 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link href="/" className="font-bold text-2xl">
                        zoclhas.com
                    </Link>
                </motion.div>

                <ThemeSwitch />
            </nav>
        </>
    );
};
