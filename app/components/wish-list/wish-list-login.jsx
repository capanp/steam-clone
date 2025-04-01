"use client";

import React, { useState, useEffect } from "react";
import "./wish-list.css";

import Image from "next/image";
import { usePathname } from "next/navigation";

const WishListLogin = () => {
  const [onWS, setWS] = useState([]);
  const appName = usePathname().split("/").at(-1);

  useEffect(() => {
    const wsStatus = JSON.parse(localStorage.getItem("onWS")) || [];
    setWS(wsStatus);
  }, []);

  const toggleWishList = () => {
    let updatedWS = [...onWS];

    if (updatedWS.includes(appName)) {
      updatedWS = updatedWS.filter((item) => item !== appName); // Listeden çıkar
    } else {
      updatedWS.push(appName); // Listeye ekle
    }

    setWS(updatedWS);
    localStorage.setItem("onWS", JSON.stringify(updatedWS));
    console.log(localStorage);
  };

  return (
    <div className="game-sign-up">
      <div
        className={`ws-item ${onWS.includes(appName) ? "ws-selected" : ""}`}
        onClick={toggleWishList}
      >
        {onWS.includes(appName) && (
          <Image src="/ico_selected.png" width={16} height={16} alt="ws icon" />
        )}
        İstek Listene Ekle
      </div>
      <div className="ws-item">Takip Et</div>
      <div className="ws-item">Yok Say</div>
    </div>
  );
};

export default WishListLogin;
