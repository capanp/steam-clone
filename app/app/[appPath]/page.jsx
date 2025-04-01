export const runtime = 'nodejs';

import React from "react";
import "./storeapp.css";
import { notFound } from 'next/navigation';

import Navbar from "../../components/navbar/navbar";
import ShopCart from "@/app/components/shop-cart/shop-cart";
import Header from "../../components/header/only-header";
import AppMedia from "../../components/app-media/app-media";
import WishList from "@/app/components/wish-list/wish-list";
import AppContent from "../../components/app-content/app-content";
import Footer from "../../components/footer/footer";


export async function generateMetadata({ params }) {
  const { appPath } = await params;
  console.log(appPath)
  const appName = appPath.replaceAll("_", " ");

  // API veya public dosyalar üzerinden kontrol
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/app/${appPath}/data.json`);

  if (!response.ok) {
    // Eğer veri bulunamazsa, 404 yönlendirmesi
    notFound();
  }

  const data = await response.json();

  return {
    title: `${appName} Steam'de | Next.js Steam Clone`,
    description: data.description,
    keywords: ["steam clone", "steam klon", "steam vercel", "steam klon vercel", "steam clone vercel", "steam clone vercel app", "steam copy", "next.js steam", "next.js steam clone", "github steam clone", "open source steam clone", "html steam clone", `${appName} steam clone vercel`, `${appName} steam clone vercel app`, `${appName} steam klon vercel`, `${appName} Steam page`, `${appName} Steam Clone`, `${appName} Steam Klon`, `${appName} Next.js Steam`, `${appName}`, `${appName} Klon`, `${appName} github steam clone`, `${appName} Page`, `${appName} Clone`, `${appName} Steam Clone Page`],
    openGraph: {
      siteName: "Steam Klon",
      title: `${appName} | Steam Klon`,
      description: data.description,
      images: [
        {
          url: `/app/${appPath}/thumbnail.jpg`,
          width: 920,
          height: 430,
          alt: `${appName} kapak resmi`,
        },
      ],
    },
  };
}

const StoreApp = () => {
  return (
    <>
      <Navbar />
      <div className="wrap">
        <ShopCart />
        <Header />
        <AppMedia />
        <WishList />
        <AppContent />
      </div>
      <Footer />
    </>
  );
};

export default StoreApp;
