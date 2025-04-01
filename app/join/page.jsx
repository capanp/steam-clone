import React from "react";
import "./joinPage.css";

import Navbar from "../components/navbar/navbar";
import Join from "../components/join/join";
import Footer from "../components/footer/footer";

export const metadata = {
  title: "Hesabınıza Giriş Yapın | Next.js Steam Clone",
  description: "Steam klon hesabı kayıt ekranı.",
  keywords: ["steam clone", "steam klon", "steam copy", "next.js steam", "next.js steam clone", "github steam clone", "open source steam clone", "html steam clone", "steam clone register", "steam klon kayıt ol", "steam clone github register", "steam clone join", "steam klon katıl", "steam vercel", "steam klon vercel", "steam clone vercel", "steam clone vercel app", "steam clone vercel register", "steam clone vercel join"],
  openGraph: {
    title: "Steam Klon - Next.js ile Yapılmış Steam Benzeri Oyun Platformu",
    description: "Next.js (React) ile geliştirilmiş tam fonksiyonel Steam klonu kayıt olma ekranı.",
    url: "https://steam-klon.vercel.app/join",
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

const StoreApp = () => {
  return (
    <>
      <Navbar />
      <div className="wrap">
        <Join />
      </div>
      <Footer />
    </>
  );
};

export default StoreApp;
