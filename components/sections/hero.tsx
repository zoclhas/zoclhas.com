import { motion } from "framer-motion";

import { WavyText } from "@/components/wavy-text";
import { Discord, GitHub, Twitter } from "@/components/icons";
import { IconButton } from "@/components/icon-button";
import { InpageScroll } from "@/components/button/InpageScroll";

export const Hero = () => {
    return (
        <>
            <div>
                <motion.p
                    initial={{ opacity: 0, translateY: 40 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: "spring", delay: 1.5 }}
                >
                    Hi, I&apos;m
                </motion.p>
                <WavyText
                    text="zoclhas"
                    replay
                    className="text-[clamp(4rem,8vw,20rem)] uppercase leading-[clamp(4rem,8vw,20rem)]"
                    delay={1.5}
                    float
                />
            </div>
            <WavyText
                text="Web Dev | Material Artist"
                replay
                className="text-lg font-normal max-sm:text-base"
                delay={1.6}
                duration={0.005}
            />
            <div className="flex gap-4 max-xs:gap-2">
                <motion.div
                    initial={{ opacity: 0, translateX: -40, rotate: 45 }}
                    animate={{ opacity: 1, translateX: 0, rotate: 0 }}
                    transition={{ type: "spring", delay: 1.8 }}
                >
                    <IconButton
                        fill
                        href="https://github.com/zoclhas"
                        title="GitHub"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GitHub height={1.2} />
                    </IconButton>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, translateY: 40 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: "spring", delay: 1.8 }}
                >
                    <IconButton
                        fill
                        href="https://twitter.com/zoclhas"
                        title="GitHub"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Twitter height={1.2} />
                    </IconButton>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, translateX: 40, rotate: -45 }}
                    animate={{ opacity: 1, translateX: 0, rotate: 0 }}
                    transition={{ type: "spring", delay: 1.8 }}
                >
                    <IconButton
                        fill
                        href="https://discord.com/users/301347642682900481"
                        title="GitHub"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Discord height={1.2} />
                    </IconButton>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "spring", delay: 2 }}
                className="flex gap-4 absolute bottom-8 w-full justify-center flex-wrap max-xs:gap-2"
            >
                <InpageScroll href="#about" fill>
                    About
                </InpageScroll>
                <InpageScroll href="#projects" fill>
                    Projects
                </InpageScroll>
                <InpageScroll href="#contact" fill>
                    Contact
                </InpageScroll>
            </motion.div>
        </>
    );
};
