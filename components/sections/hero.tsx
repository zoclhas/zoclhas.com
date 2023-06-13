import { motion } from "framer-motion";
import { WavyText } from "../wavy-text";

export const Hero = () => {
    const container = {
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.5, delayChildren: 0.2 },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            translateY: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            translateY: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <>
            <WavyText
                text="zoclhas"
                replay={true}
                className="text-[clamp(2rem,8vw,20rem)] uppercase"
                delay={1.5}
            />
        </>
    );
};
