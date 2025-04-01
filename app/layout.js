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

export const metadata = {
  title: "Steam'e Hoş Geldiniz | Next.js Steam Clone",
  description: "Next.js (React) ile geliştirilmiş Steam klonu.",
  keywords: ["steam clone", "steam klon", "steam vercel", "steam klon vercel", "steam clone vercel", "steam clone vercel app", "steam copy", "next.js steam", "next.js steam clone", "github steam clone", "open source steam clone", "html steam clone"],
  openGraph: {
    title: "Steam Klon - Next.js ile Yapılmış Steam Benzeri Oyun Platformu",
    description: "Next.js (React) ile geliştirilmiş tam fonksiyonel Steam klonu.",
    url: "https://steam-klon.vercel.app/",
    siteName: "Steam Klon",
    images: [
      {
        url: "/steam-clone-logo.png",
        width: 1280,
        height: 720,
      },
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
