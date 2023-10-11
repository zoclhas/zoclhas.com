"use client";

import { FC } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";

interface ButtonProps extends HTMLMotionProps<"button"> {
  fill?: boolean;
  href: string;
  className?: string;
}

export const LinkButton: FC<ButtonProps> = ({
  children,
  className = "",
  fill,
  href,
  ...props
}: ButtonProps) => {
  return (
    <Link href={href} className="flex">
      <motion.button
        {...props}
        className={`flex items-center justify-center gap-2 px-6 py-2 ${
          fill ? "bg-[rgb(var(--secondary-rgb),0.2)]" : ""
        } cursor-pointer rounded-xl text-center ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.button>
    </Link>
  );
};
