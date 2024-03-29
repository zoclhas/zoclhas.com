"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { ReactNode, useState, useEffect } from "react";
import { Cross } from "@/components/icons";
import { Media } from "@/payload-types";

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
      <button
        className="my-8 h-max rounded-xl focus:shadow-[0px_0px_0px_4px_rgb(var(--secondary-rgb),1)] focus:outline-none"
        onClick={() => handleOpen(node.value.id)}
        aria-label="Maximise image"
      >
        <motion.img
          width={node.value.width}
          height={node.value.height}
          src={rootUrl + node.value.url}
          alt={node.value.alt}
          onClick={() => handleOpen(node.value.id)}
          layoutId={node.value.id}
          className="!my-0 w-full cursor-pointer rounded-xl object-cover object-center"
          loading="lazy"
        />
      </button>

      <AnimatePresenceWrapper isOpen={open && id.length > 5}>
        <motion.div
          className="fixed inset-0 isolate z-[3000] flex h-full w-full flex-col items-center justify-center gap-2 bg-[rgb(var(--primary-rgb),0.7)] p-4 backdrop-blur-sm"
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
            className="z-[1] w-full max-w-[1200px] rounded-xl object-cover object-center shadow-[0px_16px_32px_8px_rgb(0,0,0,0.1)]"
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
}) => {
  if (typeof window !== "undefined" && document.body) {
    return createPortal(
      <AnimatePresence>{isOpen && children}</AnimatePresence>,
      document.body,
    );
  } else {
    return null;
  }
};

interface Root {
  children: Children[];
  type: string;
  value: Media;
  relationTo: string;
}

interface Children {
  text: string;
}
