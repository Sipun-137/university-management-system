import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giet University",
  description:
    "GIET University, Gunupur -A tranquil paradise, away from the noise and bustle of an urban area, surrounded by lush greenery and nestled in the beautiful foothills of eastern India. This is one of the most prestigious universities of Odisha. It has come out as one of the toppest in eastern India because of many reasons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalState>{children}</GlobalState>
      </body>
    </html>
  );
}
