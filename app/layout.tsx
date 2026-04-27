import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css"; // Global styles

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "OmniBus | Premium Bus Rentals made easy",
  description: "Find, book, and rent a bus in easy steps. Get a bus wherever and whenever you need it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body
        className="font-sans antialiased bg-black text-white selection:bg-white/20 selection:text-white overflow-x-hidden relative"
        suppressHydrationWarning
      >
        {/* Subtle SVG Noise Texture for Premium Feel */}
        <div
          className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          }}
        ></div>

        {/* Global Glowing Orbs */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0044ff]/15 blur-[150px] rounded-full mix-blend-screen overflow-hidden"></div>
          <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-[#5e00ff]/10 blur-[150px] rounded-full mix-blend-screen overflow-hidden"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-[#00e1ff]/10 blur-[120px] rounded-full mix-blend-screen overflow-hidden"></div>
        </div>

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
