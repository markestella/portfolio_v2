import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mckbyte Portfolio",
  description: "Portfolio of Mark Estella, a Software Engineer specializing in AI integration, full-stack development, and automation.",
  manifest: "/manifest.json",
  keywords: ["Software Engineer", "Full-Stack Developer", "AI Integration", "React", "Next.js", "TypeScript", ".NET"],
  authors: [{ name: "Mark Estella" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mckbyte Portfolio",
  },
  icons: {
    apple: "/assets/shortcut-icon.png",
  },
  openGraph: {
    title: "Mark Estella | Software Engineer",
    description: "Versatile software engineer specializing in automation, backend development, and full-stack application delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[var(--bg-primary)] min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
