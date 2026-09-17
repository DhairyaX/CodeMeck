import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeMeck — Something is coming.",
  description:
    "CodeMeck is a new way to build your software career. Coming soon.",
  keywords: ["CodeMeck", "software engineering", "career", "AI", "developer"],
  openGraph: {
    title: "CodeMeck — Something is coming.",
    description: "A new way to build your software career.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeMeck — Something is coming.",
    description: "A new way to build your software career.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
