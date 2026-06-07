import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentmesh.ai"),
  title: "AgentMesh — Orchestrate, govern, and replay your AI agents",
  description:
    "AgentMesh is the premium control plane for connecting, routing, replaying, and trusting your favorite AI agents.",
  openGraph: {
    title: "AgentMesh",
    description:
      "Premium orchestration, trust, routing, replay, and permissions for AI-native teams.",
    type: "website",
    images: [{ url: "/og-agentmesh.svg", width: 1600, height: 900, alt: "AgentMesh product preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentMesh",
    description:
      "Premium orchestration, trust, routing, replay, and permissions for AI-native teams.",
    images: ["/og-agentmesh.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#030712] antialiased`}
    >
      <body className="min-h-full bg-[#030712] font-sans text-white selection:bg-cyan-300/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
