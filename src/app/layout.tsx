import type { Metadata } from "next";
import { Merriweather, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mckbyte | Portfolio",
  description: "Portfolio of Mark Estella, a Software Engineer specializing in AI integration, full-stack development, and automation.",
  manifest: "/manifest.json",
  keywords: ["Software Engineer", "Full-Stack Developer", "AI Integration", "React", "Next.js", "TypeScript", ".NET"],
  authors: [{ name: "Mark Estella" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "mckbyte Portfolio",
  },
  icons: {
    apple: "/shortcut-icon.png",
  },
  openGraph: {
    title: "mckbyte | Software Engineer",
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
        className={`${merriweather.variable} ${lora.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
