import type { Metadata } from "next";
import "./globals-terminal.css";

export const metadata: Metadata = {
  title: "mckbyte | Developer Portfolio",
  description: "Terminal-style developer portfolio. Developer · Craftsman · Problem Solver.",
  keywords: [
    "Developer",
    "Software Engineer",
    "Full-Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "mckbyte",
  ],
  authors: [{ name: "mckbyte" }],
  openGraph: {
    title: "mckbyte | Developer Portfolio",
    description: "Terminal-style developer portfolio. Developer · Craftsman · Problem Solver.",
    type: "website",
    url: "https://mckbyte.com",
    siteName: "mckbyte",
  },
  twitter: {
    card: "summary_large_image",
    title: "mckbyte | Developer Portfolio",
    description: "Terminal-style developer portfolio",
  },
  icons: {
    icon: "/shortcut-icon.png",
    apple: "/shortcut-icon.png",
  },
  manifest: "/manifest.json",
};

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="leather-texture antialiased min-h-screen w-full fixed inset-0 overflow-auto z-50"
      style={{
        backgroundColor: "#1a1311",
        color: "#f5f0e6",
      }}
    >
      {/* Google Fonts are loaded via CSS @import in globals-terminal.css */}
      {children}
    </div>
  );
}
