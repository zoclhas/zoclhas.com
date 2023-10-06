"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { ReactNode, useState, useEffect } from "react";
import { Cross } from "@/components/icons";

export const ImageLightbox = ({ node }: { node: Root }) => {
  const rootUrl = process.env.NEXT_PUBLIC_API;

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>("");

  const handleOpen = (id: string) => {
    setOpen(true);
    setId(id);
    document.body.style.overflowY = "hidden";
  };
  const handleClose = () => {
    setOpen(false);
    setId("");
    document.body.style.overflowY = "scroll";
  };

  useEffect(() => {
    if (open && document.getElementById(id)) {
      document.getElementById(id)!.focus();
    }

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && open) {
        handleClose();
      }
    });

    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, [open]);

  return (
    <LayoutGroup>
      <motion.img
        width={node.value.sizes.feature.width}
        height={node.value.sizes.feature.height}
        src={rootUrl + node.value.sizes.feature.url}
        alt={node.value.alt}
        onClick={() => handleOpen(node.value.id)}
        layoutId={node.value.id}
        className="aspect-video rounded-xl object-cover object-center cursor-pointer"
      />

      <AnimatePresenceWrapper isOpen={open && id.length > 5}>
        <motion.div
          className="fixed inset-0 h-full w-full z-[3000] bg-[rgb(var(--primary-rgb),0.7)] flex flex-col justify-center items-center backdrop-blur-sm p-4 isolate gap-2"
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              handleClose();
            }
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key="modal-bg"
        >
          <motion.img
            width={node.value.width}
            height={node.value.height}
            src={rootUrl + node.value.url}
            alt={node.value.alt}
            layoutId={id}
            className="max-w-[1200px] w-full rounded-xl object-cover object-center shadow-[0px_16px_32px_8px_rgb(0,0,0,0.1)] z-[1]"
          />
          <motion.h3
            initial={{ opacity: 0, translateY: 200 }}
            exit={{ opacity: 0, translateY: 200 }}
            animate={{ opacity: 1, translateY: 0 }}
            key="alt-text"
            className="-z-[1] !font-normal"
          >
            {node.value.alt}
          </motion.h3>

          <motion.button
            id={id}
            className="absolute right-4 top-4 grid items-center rounded-full bg-[rgb(var(--secondary-rgb),0.2)] p-2 backdrop-blur-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            initial={{ opacity: 0, translateY: -200 }}
            exit={{ opacity: 0, translateY: -200 }}
            animate={{ opacity: 1, translateY: 0 }}
          >
            <Cross fill="#fff" height={0.9} />
          </motion.button>
        </motion.div>
      </AnimatePresenceWrapper>
    </LayoutGroup>
  );
};

const AnimatePresenceWrapper = ({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) =>
  createPortal(
    <AnimatePresence>{isOpen && children}</AnimatePresence>,
    document.body,
  );

interface Root {
  children: Children[];
  type: string;
  value: Value;
  relationTo: string;
}

interface Children {
  text: string;
}

interface Value {
  id: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: Sizes;
  createdAt: string;
  updatedAt: string;
  url: string;
}

interface Sizes {
  card: Card;
  feature: Feature;
}

interface Card {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
  url: string;
}

interface Feature {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
  url: string;
}
