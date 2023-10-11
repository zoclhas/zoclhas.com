"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  as = "div",
  ...props
}) => {
  const Component = motion(as);

  return (
    <Component initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...props}>
      {children}
    </Component>
  );
};
