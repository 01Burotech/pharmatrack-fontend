"use client";

import { motion } from "framer-motion";

export function BackgroundBlobs() {
  return (
    <>
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-300 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
