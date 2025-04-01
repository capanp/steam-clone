import Navbar from "../components/navbar/navbar";
import ShopCart from "../components/shop-cart/shop-cart";
import Header from "../components/header/only-header";
import Cart from "../components/cart/cart";
import Footer from "../components/footer/footer";
import './cartScreen.css'

export const metadata = {
  title: "Alışveriş Sepeti | Next.js Steam Clone",
  description: "Fonksiyonel Next.js ile geliştirilmiş steam klon projesi. Steam clone, capan steam clone, github steam clone.",
  keywords: ["steam clone", "steam klon", "steam copy", "next.js steam", "next.js steam clone", "github steam clone", "open source steam clone", "html steam clone", "steam vercel", "steam klon vercel", "steam clone vercel", "steam clone vercel app"],
  openGraph: {
    title: "Steam Klon - Next.js ile Yapılmış Steam Benzeri Oyun Platformu",
    description: "Next.js (React) ile geliştirilmiş tam fonksiyonel Steam klonu uygulama satın alma ekranı.",
    url: "https://steam-klon.vercel.app/cart",
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

const CartScreen = () => {
  return (
    <>
      <Navbar />
      <div className="wrap">
        <ShopCart />
        <Header />
        <Cart />
      </div>
      <Footer />
    </>
  );
};

export default CartScreen;
