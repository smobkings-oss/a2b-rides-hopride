import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A2B Rides | HopRide - Premium Local Rides",
  description: "Premium rides in NW Ohio. Instant and scheduled Tesla rides with better pay for drivers. Toledo, Perrysburg, Findlay and surrounding areas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b border-gold/20 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold holographic">A2B</span>
              <span className="text-gold font-semibold text-lg">Rides</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-gold transition-colors">Book Ride</Link>
              <Link href="/rides" className="hover:text-gold transition-colors">My Rides</Link>
              <Link href="/profile" className="hover:text-gold transition-colors">Profile</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gold/10 py-6 text-center text-xs text-zinc-500">
          <p>Premium rides. Better pay for drivers. Local to NW Ohio &amp; Michigan.</p>
          <p className="mt-1 text-gold/60">Service areas: Toledo • Perrysburg • Findlay • Fremont • Tiffin</p>
        </footer>
      </body>
    </html>
  );
}
