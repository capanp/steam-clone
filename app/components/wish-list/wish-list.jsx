"use client";

import React, { useState, useEffect } from "react";
import "./wish-list.css";

import WishListGuest from "./wish-list-guest";
import WishListLogin from "./wish-list-login";

const WishList = () => {
  const [isLogin, setIsLogin] = useState(null); // İlk değer "null"
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin") === "true";
    setIsLogin(loginStatus);
    setIsLoading(false); // Yükleme tamamlandı
  }, []);

  if (isLoading) {
    return; // İlk birkaç saniye bir yükleme mesajı göster
  }

  return (
    <>
      {isLogin ? <WishListLogin /> : <WishListGuest />}
    </>
  );
};

export default WishList;
