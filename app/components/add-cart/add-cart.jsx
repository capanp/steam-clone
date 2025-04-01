"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./add-cart.css";

const AddCart = () => {
  const [onCart, setCart] = useState([]); // Initialize as empty array instead of null
  const appName = usePathname().split("/").at(-1);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("onCart")) || [];
    setCart(cartItems);
  }, []);

  const toggleWishList = () => {
    let updatedCart = [...onCart];

    if (updatedCart.includes(appName)) {
      updatedCart = updatedCart.filter((item) => item !== appName);
    } else {
      updatedCart.push(appName);
    }

    setCart(updatedCart); // Fixed typo: was updatedWS
    localStorage.setItem("onCart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <button className="purchase-button" onClick={toggleWishList}>
        {onCart.includes(appName) ? "Sepette" : "Sepete Ekle"}
      </button>
    </>
  );
};

export default AddCart;