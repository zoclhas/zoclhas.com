"use client";

import { FC } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"a"> {
  fill?: boolean;
  href: string;
}

export const InpageScroll: FC<ButtonProps> = ({
  children,
  fill,
  href,
  ...props
}: ButtonProps) => {
  const buttonProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    className: `px-6 py-2 ${
      fill ? "bg-[rgb(var(--secondary-rgb),0.2)]" : ""
    } rounded-xl cursor-pointer block text-center`,
    ...props,
  };

  return (
    <motion.a
      href={href}
      {...buttonProps}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)!.scrollIntoView();
      }}
    >
      {children}
    </motion.a>
  );
};
