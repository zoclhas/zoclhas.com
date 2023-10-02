"use client";

import { FC } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  fill?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  fill,
  ...props
}: ButtonProps) => {
  const buttonProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    className: `px-6 py-x font-bold ${
      fill ? "bg-[rgb(var(--secondary-rgb),0.2)]" : ""
    } rounded-2xl cursor-pointer block text-center`,
    ...props,
  };

  return <motion.button {...buttonProps}>{children}</motion.button>;
};
