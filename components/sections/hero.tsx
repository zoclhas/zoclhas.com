import { motion } from "framer-motion";

import { WavyText } from "@/components/wavy-text";

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
                />
            </div>
        </>
    );
};
