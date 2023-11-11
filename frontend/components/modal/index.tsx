"use client";
import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const overlay = useRef(null);
  const wrapper = useRef(null);
  const wrapper2 = useRef(null);

  const onDismiss = useCallback(() => {
    router.back();
    document.body.style.overflowY = "scroll";
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflowY = "hidden";
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    // <AnimatePresence>
    <motion.div
      key="project-intercepted-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[3999] flex h-full w-full justify-center bg-[rgb(var(--secondary-rgb),0.5)] max-sm:z-[99]"
      onClick={onClick}
      ref={overlay}
    >
      <motion.div
        key="project-intercepted-wrapper"
        initial={{ opacity: 0, translateY: 400 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 40 }}
        className="z-[4000] m-10 max-w-[60rem] overflow-scroll rounded-2xl bg-[rgb(var(--primary-rgb),0.9)] p-8 py-20 shadow-2xl backdrop-blur-2xl max-sm:z-[100] max-sm:m-0 max-sm:mx-0 max-sm:rounded-none"
      >
        {children}
      </motion.div>
    </motion.div>
    // </AnimatePresence>
  );
}
