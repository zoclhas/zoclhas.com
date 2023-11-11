"use client";

import { AnimatePresence } from "framer-motion";

export const Wrapper = ({ modal }: { modal: React.ReactNode }) => {
  return <AnimatePresence>{modal}</AnimatePresence>;
};
