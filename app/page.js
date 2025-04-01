import Head from 'next/head';

import Navbar from "./components/navbar/navbar";
import ShopCart from './components/shop-cart/shop-cart';
import Header from "./components/header/header";
import Carousel from "./components/carousel/carousel";
import Main from './components/main/main'
import Footer from './components/footer/footer'

export const metadata = {
  title: "Steam'e Hoş Geldiniz | Next.js Steam Clone",
  description: "Fonksiyonel Next.js ile geliştirilmiş steam klon projesi. Steam clone, capan steam clone, github steam clone.",
  keywords: ["steam clone", "steam klon", "steam copy", "next.js steam", "next.js steam clone", "github steam clone", "open source steam clone", "html steam clone", "steam vercel", "steam klon vercel", "steam clone vercel", "steam clone vercel app"],
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

export default function Home() {
  return (
    <>
      <Head>
        <title>Steam'e Hoş Geldiniz</title>
      </Head>
      <Navbar />
      <div className="wrap">
        <ShopCart />
        <Header />
        <Carousel />
        <Main />
      </div>
      <Footer />
    </>
  );
}