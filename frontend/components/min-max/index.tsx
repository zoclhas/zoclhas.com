"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Maximize, Minimize } from "lucide-react";

export const MotionDivWrapper = ({
  children,
  id,
  className = "flex flex-col",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) => {
  return (
    <motion.div layoutId={id} className={className}>
      {children}
    </motion.div>
  );
};

export const LayoutSwitch = ({}) => {
  const [layout, setLayout] = useState<"min" | "max">("max");
  const [prevLayout, setPrevLayout] = useState<"min" | "max">("max");
  const [mounted, setMounted] = useState(false);

  const handleSetLayout = (layout: "min" | "max") => {
    setLayout(layout);
    localStorage.setItem("layout", layout);

    const customEvent = new CustomEvent("layoutUpdate", {
      detail: {
        layout: layout,
      },
    });
    document.dispatchEvent(customEvent);
  };

  useEffect(() => {
    const layoutFromStorage = localStorage.getItem("layout");
    if (layoutFromStorage) {
      if (
        String(layoutFromStorage) === "min" ||
        String(layoutFromStorage) === "max"
      ) {
        setLayout(layoutFromStorage as unknown as "min" | "max");
      }
    }

    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <div className="flex gap-1 rounded-xl bg-[rgb(var(--secondary-rgb),0.1)] p-1">
        <button
          className="relative aspect-square rounded-lg p-2"
          aria-label="Switch to maximum size post show"
          onClick={() => {
            handleSetLayout("max");
            setPrevLayout(layout);
          }}
          onPointerOver={() => setLayout("max")}
          onPointerOut={() => setLayout(prevLayout)}
        >
          <Maximize />

          {layout === "max" && (
            <motion.div
              layoutId="min-max-bg"
              className="absolute inset-0 h-full w-full rounded-lg bg-[rgb(var(--secondary-rgb),0.2)]"
            />
          )}
        </button>
        <button
          className="relative aspect-square rounded-lg p-2"
          aria-label="Switch to minimum size post show"
          onClick={() => {
            handleSetLayout("min");
            setPrevLayout(layout);
          }}
          onPointerOver={() => setLayout("min")}
          onPointerOut={() => setLayout(prevLayout)}
        >
          <Minimize />

          {layout === "min" && (
            <motion.div
              layoutId="min-max-bg"
              className="absolute inset-0 h-full w-full rounded-lg bg-[rgb(var(--secondary-rgb),0.2)]"
            />
          )}
        </button>
      </div>
    );
  }
};
