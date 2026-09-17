"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FOUNDER } from "@/config/launch";

export default function FounderBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.7, ease: "easeOut" }}
      className="shrink-0 flex items-center justify-center px-5 py-3"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <span style={{ fontSize: "10.5px", color: "rgba(146,153,166,0.45)" }}>
        Built by{" "}
        <span style={{ color: "rgba(245,247,250,0.55)" }}>{FOUNDER.name}</span>
      </span>
    </motion.footer>
  );
}
