import { FC } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    fill?: boolean;
}

interface LinkProps extends HTMLMotionProps<"a"> {
    href: string;
}

export const IconButton: FC<ButtonProps & LinkProps> = ({
    children,
    fill,
    href,
    className,
    ...props
}: ButtonProps & LinkProps) => {
    const buttonProps = {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
        className: `p-3 ${
            fill ? "bg-[rgb(var(--secondary-rgb),0.2)]" : ""
        } rounded-2xl cursor-pointer block w-max`,
        ...props,
    };

    if (href) {
        return (
            <motion.a href={href} {...buttonProps}>
                {children}
            </motion.a>
        );
    }

    return <motion.button {...buttonProps}>{children}</motion.button>;
};
