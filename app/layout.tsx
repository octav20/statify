import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SessionProviderWrapper from "@/providers/session-provider-wrapper";
import Navbar2 from "@/components/navbar2";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Statify",
  description: "Unlock the Numbers Behind Your Music!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={font.className}>
          <Navbar />
          {/* <Navbar2 /> */}
          {children}
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
