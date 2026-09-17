"use client";

import { useState, useId } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

type State = "idle" | "submitting" | "success" | "error";

export default function Waitlist() {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const inputId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setState("submitting");

    // Frontend-only — ready for real service integration
    // Replace this timeout with your actual API call:
    // e.g. await fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ email }) })
    await new Promise((r) => setTimeout(r, 900));
    setState("success");
  };

  return (
    <motion.section
      id="waitlist-section"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex flex-col items-center px-6 pb-16"
    >
      <AnimatePresence mode="wait">
        {state !== "success" ? (
          <motion.div
            key="form"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md flex flex-col items-center gap-4"
          >
            <p className="text-[13px] text-center" style={{ color: "#9299A6" }}>
              Be the first to know when CodeMeck launches.
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col sm:flex-row gap-3"
            >
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <input
                id={inputId}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-full text-[14px] outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F5F7FA",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(163,255,111,0.35)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(163,255,111,0.06)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                disabled={state === "submitting"}
              />
              <button
                type="submit"
                disabled={state === "submitting"}
                id="waitlist-submit-btn"
                className="px-6 py-3 rounded-full font-semibold text-[14px] transition-all duration-200 disabled:opacity-60 shrink-0"
                style={{
                  background: "#A3FF6F",
                  color: "#080A0C",
                  boxShadow: "0 0 20px rgba(163,255,111,0.2)",
                }}
                onMouseEnter={(e) => {
                  if (state !== "submitting")
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 35px rgba(163,255,111,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 20px rgba(163,255,111,0.2)";
                }}
              >
                {state === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Joining…
                  </span>
                ) : (
                  "Join →"
                )}
              </button>
            </form>

            <p className="text-[11px]" style={{ color: "rgba(146,153,166,0.5)" }}>
              No spam. Just one email when we launch.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(163,255,111,0.12)",
                border: "1px solid rgba(163,255,111,0.3)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A3FF6F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p
              className="font-display font-semibold text-[18px]"
              style={{ color: "#F5F7FA" }}
            >
              You&apos;re on the list.
            </p>
            <p className="text-[13px]" style={{ color: "#9299A6" }}>
              We&apos;ll reach out when CodeMeck launches.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
