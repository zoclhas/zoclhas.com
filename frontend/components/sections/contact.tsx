"use client";

import { motion } from "framer-motion";

import { Discord, Twitter, Mail } from "@/components/icons";
import { IconButton } from "@/components/icon-button";

export const Contact = () => {
  return (
    <>
      <div>
        <motion.h1
          initial={{ opacity: 0, translateY: 100 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring" }}
          viewport={{ once: true }}
          className="text-center text-7xl max-sm:text-5xl"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, translateY: 100 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring" }}
          viewport={{ once: true }}
          className="text-center text-lg max-sm:text-base"
        >
          Contact me? Hire me? or just wanna say Hi?!
        </motion.p>
      </div>
      <div className="mt-4 flex gap-4">
        <div className="flex gap-4 max-xs:gap-2">
          <motion.div
            initial={{ opacity: 0, translateX: -40, rotate: 45 }}
            whileInView={{ opacity: 1, translateX: 0, rotate: 0 }}
            transition={{ type: "spring" }}
            viewport={{ once: true }}
          >
            <IconButton
              fill
              href="mailto:hi@zoclhas.com"
              title="Mail"
              target="_blank"
              rel="noreferrer"
            >
              <Mail height={2} />
            </IconButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateY: 40 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring" }}
            viewport={{ once: true }}
          >
            <IconButton
              fill
              href="https://twitter.com/zoclhas"
              title="Twitter"
              target="_blank"
              rel="noreferrer"
            >
              <Twitter height={2} />
            </IconButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateX: 40, rotate: -45 }}
            whileInView={{ opacity: 1, translateX: 0, rotate: 0 }}
            transition={{ type: "spring" }}
            viewport={{ once: true }}
          >
            <IconButton
              fill
              href="https://discord.com/users/301347642682900481"
              title="Discord"
              target="_blank"
              rel="noreferrer"
            >
              <Discord height={2} />
            </IconButton>
          </motion.div>
        </div>
      </div>
    </>
  );
};
