"use client";

import {
  useState,
  useEffect,
  useRef,
  useId,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";
import { LAUNCH_DATE } from "@/config/launch";

// ─── Motion config ────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.25,
    } as Transition,
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease } as Transition,
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" } as Transition,
  },
};

// ─── Countdown helpers ────────────────────────────────────────
function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

// ── Single digit tile ─────────────────────────────────────────
function DigitTile({ value, label }: { value: string; label: string }) {
  const shouldReduceMotion = useReducedMotion();
  const prev = useRef(value);
  const [flipKey, setFlipKey] = useState(0);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setFlipKey((k) => k + 1);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* tile */}
      <div
        className="flex items-center justify-center rounded-lg overflow-hidden relative"
        style={{
          width: "clamp(50px, 5.5vw, 70px)",
          height: "clamp(50px, 5.5vw, 66px)",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`${flipKey}-${value}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: 7 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="font-display font-semibold tabular-nums leading-none"
            style={{
              color: "#F5F7FA",
              fontSize: "clamp(19px, 2.2vw, 28px)",
            }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      {/* label */}
      <span
        className="uppercase tracking-[0.18em] font-medium"
        style={{ fontSize: "8.5px", color: "rgba(146,153,166,0.6)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span
      className="font-light pb-5 select-none"
      style={{
        color: "rgba(163,255,111,0.28)",
        fontSize: "clamp(14px, 1.8vw, 22px)",
      }}
    >
      :
    </span>
  );
}

// ─── Waitlist types ───────────────────────────────────────────
type WlState = "idle" | "submitting" | "success";

// ─── Main Hero component ──────────────────────────────────────
export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const inputId = useId();

  // Countdown
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Waitlist
  const [email, setEmail] = useState("");
  const [wlState, setWlState] = useState<WlState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setWlState("submitting");
    // Replace the line below with a real API call when ready:
    // await fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ email }) });
    await new Promise((r) => setTimeout(r, 800));
    setWlState("success");
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-5 md:px-8 py-3">
      <motion.div
        variants={shouldReduceMotion ? undefined : container}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="show"
        className="flex flex-col items-center w-full max-w-2xl"
        style={{ gap: "clamp(12px, 1.8vh, 22px)" }}
      >

        {/* ── 1. Eyebrow ─────────────────────────────────── */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeIn}
          className="flex items-center gap-2"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{
              background: "#A3FF6F",
              boxShadow: "0 0 7px rgba(163,255,111,0.7)",
            }}
          />
          <span
            className="text-[9.5px] tracking-[0.24em] uppercase font-medium"
            style={{ color: "#9299A6" }}
          >
            Coming Soon
          </span>
        </motion.div>

        {/* ── 2. Headline ────────────────────────────────── */}
        <motion.h1
          variants={shouldReduceMotion ? undefined : fadeUp}
          className="font-display font-semibold leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(52px, 9.5vw, 106px)", color: "#F5F7FA" }}
        >
          Something
          <br />
          <span style={{ color: "#F5F7FA" }}>is </span>
          <span
            style={{
              color: "#A3FF6F",
              textShadow: "0 0 55px rgba(163,255,111,0.28)",
            }}
          >
            coming.
          </span>
        </motion.h1>

        {/* ── 3. Brand identity ──────────────────────────── */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeIn}
          className="flex items-center gap-2.5"
        >
          <div
            className="h-px w-5 shrink-0"
            style={{ background: "rgba(163,255,111,0.25)" }}
          />
          <span
            className="font-display font-medium tracking-[0.12em]"
            style={{
              fontSize: "clamp(13px, 1.5vw, 17px)",
              color: "rgba(245,247,250,0.65)",
              letterSpacing: "0.12em",
            }}
          >
            CODEMECK
          </span>
          <div
            className="h-px w-5 shrink-0"
            style={{ background: "rgba(163,255,111,0.25)" }}
          />
        </motion.div>

        {/* ── 4. Tagline ─────────────────────────────────── */}
        <motion.p
          variants={shouldReduceMotion ? undefined : fadeIn}
          className="max-w-xs"
          style={{
            fontSize: "clamp(12.5px, 1.3vw, 15px)",
            color: "rgba(146,153,166,0.75)",
            lineHeight: 1.5,
          }}
        >
          A new way to build your software career.
        </motion.p>

        {/* ── 5. Countdown ───────────────────────────────── */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeIn}
          className="flex flex-col items-center"
          style={{ gap: "clamp(6px, 0.8vh, 10px)" }}
        >
          <span
            className="text-[8.5px] tracking-[0.24em] uppercase font-medium"
            style={{ color: "rgba(146,153,166,0.4)" }}
          >
            Launching Soon
          </span>

          {/* Desktop: 4-in-a-row | Mobile: 2×2 grid */}
          <div className="hidden sm:flex items-center gap-2 md:gap-2.5">
            <DigitTile value={pad(time.days)} label="Days" />
            <Colon />
            <DigitTile value={pad(time.hours)} label="Hours" />
            <Colon />
            <DigitTile value={pad(time.minutes)} label="Mins" />
            <Colon />
            <DigitTile value={pad(time.seconds)} label="Secs" />
          </div>

          {/* Mobile 2×2 */}
          <div className="sm:hidden grid grid-cols-2 gap-x-4 gap-y-3">
            <DigitTile value={pad(time.days)} label="Days" />
            <DigitTile value={pad(time.hours)} label="Hours" />
            <DigitTile value={pad(time.minutes)} label="Mins" />
            <DigitTile value={pad(time.seconds)} label="Secs" />
          </div>
        </motion.div>

        {/* ── 6. Waitlist CTA ────────────────────────────── */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeIn}
          className="flex flex-col items-center w-full max-w-sm"
          style={{ gap: "clamp(5px, 0.6vh, 8px)" }}
        >
          <AnimatePresence mode="wait">
            {wlState !== "success" ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                onSubmit={handleSubmit}
                className="flex gap-2 w-full"
              >
                <label htmlFor={inputId} className="sr-only">
                  Email address
                </label>
                <input
                  id={inputId}
                  // also accessible by the navbar button via element focus
                  data-waitlist-input="true"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={wlState === "submitting"}
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-full text-[12.5px] outline-none transition-all duration-200 placeholder:text-[rgba(146,153,166,0.5)]"
                  style={{
                    background: "rgba(255,255,255,0.045)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "#F5F7FA",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(163,255,111,0.3)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(163,255,111,0.05)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,255,255,0.09)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="submit"
                  id="waitlist-submit-btn"
                  disabled={wlState === "submitting"}
                  className="shrink-0 px-4 py-2.5 rounded-full font-semibold text-[12.5px] transition-all duration-200 disabled:opacity-60"
                  style={{
                    background: "#A3FF6F",
                    color: "#080A0C",
                    boxShadow: "0 0 18px rgba(163,255,111,0.18)",
                  }}
                  onMouseEnter={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.boxShadow =
                      "0 0 28px rgba(163,255,111,0.38)")
                  }
                  onMouseLeave={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.boxShadow =
                      "0 0 18px rgba(163,255,111,0.18)")
                  }
                >
                  {wlState === "submitting" ? "…" : "Join →"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="flex items-center gap-2.5 py-2"
              >
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                  style={{
                    background: "rgba(163,255,111,0.12)",
                    border: "1px solid rgba(163,255,111,0.3)",
                  }}
                >
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A3FF6F"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span
                  className="font-medium text-[13px]"
                  style={{ color: "#F5F7FA" }}
                >
                  You&apos;re on the list.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <p style={{ fontSize: "10px", color: "rgba(146,153,166,0.4)" }}>
            No spam. Just one email when we launch.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
