// SERVER COMPONENT: wraps every page; must contain <html> and <body>
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

// Next.js reads this and injects <title> / <meta> into <head> automatically
export const metadata: Metadata = {
  title: "MJB's Handyman Service | Santa Rosa, CA",
  description:
    "Professional handyman services in Sonoma County. Carpentry, windows, painting, plaster finishes, custom kitchen and bathroom renovations. Call (707) 727-3258.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* flex-col + min-h-screen keeps Footer pinned to the bottom on short pages */}
      {/* suppressHydrationWarning: prevents false errors from browser extensions like Grammarly that inject attributes into <body> */}
      <body className="flex flex-col min-h-screen bg-brand-white" suppressHydrationWarning>
        <Navbar />
        {/* flex-1 stretches main to fill all space between Navbar and Footer */}
        <main className="flex-1">{children}</main>
        <Footer />
        {/* ChatWidget is a Client Component; fixed-position, renders on every page */}
        <ChatWidget />
      </body>
    </html>
  );
}
