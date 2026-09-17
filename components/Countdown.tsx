"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { LAUNCH_DATE } from "@/config/launch";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getTimeLeft(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

// Animated digit block
function DigitBlock({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const prevValue = useRef(value);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      setKey((k) => k + 1);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-[72px] h-[80px] md:w-[92px] md:h-[100px] flex items-center justify-center rounded-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(163,255,111,0.1)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Subtle top highlight */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(163,255,111,0.2), transparent)",
          }}
        />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={`${key}-${value}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="font-display font-semibold text-[clamp(28px,5vw,40px)] tracking-tight tabular-nums"
            style={{ color: "#F5F7FA" }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "#9299A6" }}>
        {label}
      </span>
    </div>
  );
}

// Separator
function Separator() {
  return (
    <div className="flex items-center pb-7">
      <span
        className="text-[clamp(20px,3vw,30px)] font-light"
        style={{ color: "rgba(163,255,111,0.4)" }}
      >
        :
      </span>
    </div>
  );
}

export default function Countdown() {
  const shouldReduceMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft());
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const launched = Object.values(timeLeft).every((v) => v === 0);

  return (
    <motion.section
      id="countdown-section"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex flex-col items-center py-20 md:py-28 px-6"
    >
      {/* Label */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className="h-px w-8 md:w-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(163,255,111,0.4))",
          }}
        />
        <span
          className="text-[11px] tracking-[0.22em] uppercase font-medium"
          style={{ color: "#A3FF6F" }}
        >
          {launched ? "We're Live" : "Launching Soon"}
        </span>
        <div
          className="h-px w-8 md:w-12"
          style={{
            background:
              "linear-gradient(90deg, rgba(163,255,111,0.4), transparent)",
          }}
        />
      </div>

      {/* Countdown grid */}
      {!launched ? (
        <div className="flex items-start gap-2 md:gap-4">
          <DigitBlock value={pad(timeLeft.days)} label="Days" />
          <Separator />
          <DigitBlock value={pad(timeLeft.hours)} label="Hours" />
          <Separator />
          <DigitBlock value={pad(timeLeft.minutes)} label="Minutes" />
          <Separator />
          <DigitBlock value={pad(timeLeft.seconds)} label="Seconds" />
        </div>
      ) : (
        <p
          className="font-display font-semibold text-[clamp(28px,5vw,48px)]"
          style={{ color: "#A3FF6F" }}
        >
          We're here.
        </p>
      )}
    </motion.section>
  );
}
