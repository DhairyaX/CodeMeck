<div align="center">
  <br />
  <h3><b>CodeMeck</b></h3>
  <p>A new way to build your software career. Something is coming.</p>
  <br />
</div>

## 🌌 Overview

**CodeMeck** is an upcoming AI-powered career product for aspiring software engineers.

This repository contains the **Launch Teaser & Waitlist** single-page application. Designed to be dark, minimal, cinematic, and technically sophisticated, the landing page serves a single purpose: to let the world know something incredible is being built.

The visual centerpiece is a highly optimized, interactive fluid LiquidChrome WebGL shader running in the background.

## ✨ Features

- **Immersive WebGL Background**: Custom `LiquidChrome` shader built with `ogl`, providing a fluid, metallic, iridescent aesthetic that reacts to mouse/touch movement.
- **Premium UI & Animations**: Smooth, staggered, and elegant element reveals powered by `framer-motion`.
- **Performance First**: Built on **Next.js 16** with Turbopack, fully statically generated.
- **Waitlist & Countdown**: Real-time launch countdown tile system with an integrated waitlist CTA.
- **Responsive Single-Screen Architecture**: Meticulously crafted with Tailwind CSS v4 to ensure the entire cinematic experience fits flawlessly within `100dvh` on any device without the need to scroll.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React, App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **WebGL Rendering**: [OGL](https://github.com/oframe/ogl)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Local Development

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Start the Turbopack development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the live fluid background and UI.

### Configuration

You can easily manage the launch parameters in `config/launch.ts`:
- **`LAUNCH_DATE`**: Update the target UTC date to automatically adjust the countdown across the site.
- **`SOCIAL_LINKS`**: Update Twitter, Instagram, and LinkedIn paths.

To tweak the LiquidChrome shader's behavior (speed, amplitude, color depth), edit the constants at the top of `components/LiveBackground.tsx`.

## 📱 Connect

- **X / Twitter**: [@codemeck](https://x.com/codemeck)
- **Instagram**: [@code.meck](https://www.instagram.com/code.meck/)

<br />
<div align="center">
  <p><i>Built by <a href="https://linkedin.com/in/dhairya-rohilla">Dhairya Rohilla</a></i></p>
</div>
