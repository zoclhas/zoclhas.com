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
  const buttonProps = {
    className: `px-6 py-2 ${
      fill ? "bg-[rgb(var(--secondary-rgb),0.2)]" : ""
    } rounded-xl cursor-pointer block text-center ${className}`,
    ...props,
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };

  return (
    <Link href={href}>
      <motion.button {...buttonProps}>{children}</motion.button>
    </Link>
  );
};
