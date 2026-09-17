"use client";

import dynamic from "next/dynamic";

// Dynamically import the canvas background — client-only, no SSR
const LiveBackground = dynamic(() => import("@/components/LiveBackground"), {
  ssr: false,
  loading: () => null,
});

export default function LiveBackgroundWrapper() {
  return <LiveBackground />;
}
