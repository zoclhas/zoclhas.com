"use client";

import { Media } from "@/payload-types";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const ImageModal = ({
  image,
  text,
  imageClassName,
  buttonClassName,
}: {
  image: Media;
  text?: string;
  imageClassName?: string;
  buttonClassName?: string;
}) => {
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
  }, [open, id]);

  const MotionImage = motion(Image);

  return (
    <LayoutGroup>
      <button
        onClick={() => handleOpen(image.id)}
        aria-label="Maximise image"
        className={`block ${buttonClassName}`}
      >
        <MotionImage
          src={`${process.env.NEXT_PUBLIC_API}${image.sizes?.feature?.url || image.url}`}
          alt={image.alt}
          width={image.sizes?.feature?.width || image.width || 1920}
          height={image.sizes?.feature?.height || image.height || 1080}
          className={`object-cover object-center ${imageClassName}`}
          loading="lazy"
          quality={100}
          layoutId={image.id}
        />
      </button>

      <AnimatePresenceWrapper isOpen={open && id.length > 5}>
        <motion.div
          className="fixed inset-0 isolate z-[3000] flex h-full w-full flex-col items-center justify-center gap-2 bg-black/40 p-4 backdrop-blur-2xl"
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
          <MotionImage
            width={image.width}
            height={image.height}
            src={process.env.NEXT_PUBLIC_API + image.url!}
            alt={image.alt}
            layoutId={id}
            className="z-[1] max-h-[calc(0.75*100vh)] w-max max-w-[calc(0.9*100vw)] object-contain object-center sm:max-w-[576px]"
            quality={100}
          />
          {text && (
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              exit={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              key="alt-text"
              className="flex items-center justify-between bg-neutral-950/80 p-1"
            >
              <h3 className="text-lg">
                Screenshot by <span className="font-medium">{text}</span>
              </h3>
            </motion.div>
          )}

          <button onClick={handleClose} className="!absolute right-4 top-4">
            <X />
          </button>
        </motion.div>
      </AnimatePresenceWrapper>
    </LayoutGroup>
  );
};

const AnimatePresenceWrapper = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
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
