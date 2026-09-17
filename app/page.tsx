import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FounderBar from "@/components/FounderLinks";
import LiveBackgroundWrapper from "@/components/LiveBackgroundWrapper";

export default function Home() {
  return (
    <main
      className="relative"
      style={{ background: "#080A0C" }}
    >
      {/* ── Live background — fixed, full viewport ── */}
      <LiveBackgroundWrapper />

      {/* ── Atmospheric overlay — preserves background visibility ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(8,10,12,0.08) 0%, rgba(8,10,12,0.52) 55%, rgba(8,10,12,0.82) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ── Single-screen content shell ── */}
      {/*
          Desktop: fixed 100dvh, no scroll — everything fits in one viewport.
          Mobile:  min-h-[100dvh] with overflow-auto, allowing scroll if needed.
      */}
      <div
        className="relative flex flex-col min-h-[100dvh] md:h-[100dvh] md:overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <Navbar />
        <Hero />
        <FounderBar />
      </div>
    </main>
  );
}
