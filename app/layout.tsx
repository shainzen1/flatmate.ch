import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserVibeProvider } from "@/components/mvp/user-vibe-context";
import { PersonaPicker } from "@/components/mvp/persona-picker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "flatmate.ch | Find your people, not just a room",
  description:
    "Chemistry-first WG matching for Switzerland. Discover flatmates by vibe, lifestyle, and group fit before room details.",
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
        <UserVibeProvider>
          {children}
          {process.env.NODE_ENV === "development" && <PersonaPicker />}
        </UserVibeProvider>
      </body>
    </html>
  );
}
