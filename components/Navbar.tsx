"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/config/launch";

// ── Social icon SVGs ──────────────────────────────────────────
const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// ── Reusable social pill ──────────────────────────────────────
function SocialPill({
  href,
  icon,
  label,
  accentColor,
  accentBg,
  glowColor,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  accentColor: string;
  accentBg: string;
  glowColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center w-8 h-8 rounded-full text-[12px] font-medium transition-all duration-200"
      style={{
        color: hovered ? accentColor : "rgba(146,153,166,0.7)",
        border: hovered
          ? `1px solid ${accentColor}44`
          : "1px solid rgba(255,255,255,0.09)",
        background: hovered ? accentBg : "rgba(255,255,255,0.03)",
        boxShadow: hovered ? `0 0 16px ${glowColor}` : "none",
      }}
    >
      {icon}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="shrink-0 transition-all duration-500"
      style={
        scrolled
          ? {
              background: "rgba(8,10,12,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }
          : undefined
      }
    >
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">

        {/* ── Left: brand mark ── */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            aria-hidden="true"
            style={{ color: "#A3FF6F", fontSize: "8px", lineHeight: 1 }}
          >
            ◆
          </span>
          <span
            className="font-display font-semibold text-[15px] tracking-[-0.01em]"
            style={{ color: "#F5F7FA" }}
          >
            CodeMeck
          </span>
        </div>

        {/* ── Center: tagline (md+) ── */}
        <div className="hidden md:flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <div
            className="h-px w-4"
            style={{ background: "rgba(146,153,166,0.25)" }}
          />
          <span
            className="text-[9px] font-medium tracking-[0.26em] uppercase"
            style={{ color: "rgba(146,153,166,0.5)" }}
          >
            Building Something Incredible
          </span>
          <div
            className="h-px w-4"
            style={{ background: "rgba(146,153,166,0.25)" }}
          />
        </div>

        {/* ── Right: Contact + social pills ── */}
        <nav className="flex items-center gap-2.5 shrink-0">
          {/* Contact — subtle text link */}
          <a
            href={CONTACT_EMAIL}
            className="hidden sm:block text-[12px] font-medium mr-1.5 transition-colors duration-200"
            style={{ color: "rgba(146,153,166,0.55)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#F5F7FA")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(146,153,166,0.55)")
            }
          >
            Contact
          </a>

          {/* X / Twitter */}
          <SocialPill
            href="https://x.com/codemeck"
            icon={<XIcon />}
            label="Twitter"
            accentColor="#F5F7FA"
            accentBg="rgba(255,255,255,0.06)"
            glowColor="rgba(255,255,255,0.08)"
          />

          {/* Instagram */}
          <SocialPill
            href="https://www.instagram.com/code.meck/"
            icon={<InstagramIcon />}
            label="Instagram"
            accentColor="#E1306C"
            accentBg="rgba(225,48,108,0.07)"
            glowColor="rgba(225,48,108,0.15)"
          />
        </nav>
      </div>
    </motion.header>
  );
}
