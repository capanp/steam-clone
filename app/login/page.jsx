import React from "react";
import "./loginPage.css";

import Navbar from "../components/navbar/navbar";
import Login from "../components/login/login";
import Footer from "../components/footer/footer";

export const metadata = {
  title: "Hesabınıza Giriş Yapın | Next.js Steam Clone",
  description: "Steam klon hesabı giriş ekranı.",
  keywords: ["steam clone", "steam klon", "steam copy", "next.js steam", "next.js steam clone", "github steam clone", "open source steam clone", "html steam clone", "steam clone login", "steam klon giriş yap", "steam clone github login", "steam vercel", "steam klon vercel", "steam clone vercel", "steam clone vercel app", "steam clone vercel login", "steam klon vercel kayıt"],
  openGraph: {
    title: "Steam Klon - Next.js ile Yapılmış Steam Benzeri Oyun Platformu",
    description: "Next.js (React) ile geliştirilmiş tam fonksiyonel Steam klonu giriş ekranı.",
    url: "https://steam-klon.vercel.app/login",
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
        <Login />
      </div>
      <Footer />
    </>
  );
};

export default StoreApp;
