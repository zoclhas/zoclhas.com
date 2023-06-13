import { motion } from "framer-motion";

import { WavyText } from "@/components/wavy-text";
import { GitHub } from "@/components/icons";
import { IconButton } from "@/components/icon-button";

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
                    replay={true}
                    className="text-[clamp(4.5rem,8vw,20rem)] uppercase leading-[clamp(4.5rem,8vw,20rem)]"
                    delay={1.5}
                    onLoad={(e) => console.log("hi")}
                />
            </div>
            <div className="flex gap-4">
                <motion.div
                    initial={{ opacity: 0, translateX: -40 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: "spring", delay: 1.8 }}
                >
                    <IconButton
                        fill
                        href="https://github.com/zoclhas"
                        title="GitHub"
                        target="_blank"
                    >
                        <GitHub height={1.2} />
                    </IconButton>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, translateY: 40 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: "spring", delay: 1.8 }}
                >
                    <IconButton fill>
                        <GitHub height={1.2} />
                    </IconButton>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, translateX: 40 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: "spring", delay: 1.8 }}
                >
                    <IconButton fill>
                        <GitHub height={1.2} />
                    </IconButton>
                </motion.div>
            </div>
        </>
    );
};
