"use client";

import React, { useState, useEffect } from "react";
import "./shop-cart.css";
import Image from "next/image";

const ShopCart = () => {
  const [cartItems, setCartItems] = useState([]); // Store the actual cart items

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("onCart")) || [];
    console.log("shopcart", items);
    setCartItems(items);
  }, []);

  return (
    <div className="shop-cart-container">
      {cartItems.length > 0 ? (
        <a className="shop-cart" href="/cart">
          <Image
            src="/shop-cart.svg"
            width={16}
            height={16}
            alt="Shopping Cart"
          />
          {`Sepet (${cartItems.length})`}
        </a>
      ) : (
        <div className="empty-space"></div>
      )}
    </div>
  );
};

export default ShopCart;
