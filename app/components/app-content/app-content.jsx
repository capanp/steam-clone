"use client";

import React, { useState, useEffect } from "react";
import "./app-content.css";

import AddCart from "../add-cart/add-cart";
import AppDetails from "../app-details/app-details";
import SystemReq from "../system-req/system-req";
import Review from "../review/review";
import { usePathname } from "next/navigation";
import Image from "next/image";

async function fetchapp(appPath, dataName) {
  const response = await fetch(`/app/${appPath}/${dataName}.json`);
  const data = await response.json();
  return data;
}

async function fetchPrice(appPath) {
  const response = await fetch(
    `https://steam-klon-rest-api.capan.workers.dev/v1/apps/${appPath}`
  );
  const data = await response.json();
  return data[appPath] ? data[appPath] : null;
}

const AppContent = () => {
  const appPath = usePathname().split("/").at(-1);
  const appName = appPath.replaceAll("_", " ");

  // State ile appData'yı yönet
  const [appData, setAppData] = useState(null);
  const [contentData, setcontentData] = useState(null);
  const [price, setPrice] = useState(null);

  const [showReadMore, setShowReadMore] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    async function getPrice() {
      const fetchedPrice = await fetchPrice(appPath);
      console.log("rest-api:", fetchedPrice);
      fetchedPrice ? setPrice(fetchedPrice) : setPrice(null);
    }
    getPrice();
  }, [appPath]);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/app/${appPath}/background.jpg)`;

    async function getAppData() {
      const data = await fetchapp(appPath, "data");
      const contentData = await fetchapp(appPath, "contentData");

      setAppData(data);
      setcontentData(contentData);
    }

    getAppData(); // Asenkron veri çekme işlemi
  }, [appPath]);

  useEffect(() => {
    const checkHeightAfterImagesLoad = () => {
      const mainDiv = document.querySelector(".page-game-description");
      if (!mainDiv) return;
  
      // Tüm resimleri seç
      const images = mainDiv.querySelectorAll("img");
      let loadedImages = 0;
  
      if (images.length === 0) {
        // Resim yoksa direkt ölçüm yap
        setShowReadMore(mainDiv.scrollHeight > 850);
        return;
      }
  
      // Her resim yüklendiğinde kontrlo et
      const handleImageLoad = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          setShowReadMore(mainDiv.scrollHeight > 850);
        }
      };
  
      images.forEach((img) => {
        if (img.complete) {
          handleImageLoad();
        } else {
          img.addEventListener("load", handleImageLoad);
          img.addEventListener("error", handleImageLoad); // Hata durumunda da devam et
        }
      });
    };
  
    checkHeightAfterImagesLoad();
  }, [contentData]);

  const handleClick = () => {
    const mainDiv = document.querySelector(".page-game-description");
    const hideDiv = document.querySelector(".page-description-scale-container");
    if (mainDiv && hideDiv) {
      mainDiv.style.maxHeight = mainDiv.scrollHeight + "px";
      setTimeout(() => {
        mainDiv.style.maxHeight = "none";
      }, 500);
      hideDiv.style.display = "none";
    }
  };

  const handleCartClick = (e) => {
    e.stopPropagation(); // Bu, menü içine tıklandığında kapanmasını engeller
  };

  const handleScroll = () => {
    document.body.style.overflow = 'hidden';

    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    setScrollPosition(currentScroll);
    setIsCartVisible(true);
  }

  const handleBreakScroll = () => {
    document.body.style.overflow = 'auto';
    setIsCartVisible(false)
  }

  return (
    <>
      {isCartVisible ? (
        <div 
          className="black-container" 
          onClick={handleBreakScroll}
          style={{
            top: `${scrollPosition}px`
          }}
        >
          <div className="app-cart-container" onClick={handleCartClick}>
            <div className="blue-top-line"></div>
            <h1>Sepetinize Eklendi!</h1>
            <div className="app-details-container">
              <Image
                src={`/app/${appPath}/thumbnail.jpg`}
                alt={`${appPath}-thumbnail`}
                width="200"
                height="95"
              />
              <div className="app-description">
                <h2>{appName}</h2>
                <Image
                  width={20}
                  height={20}
                  src="/icon_platform_win.png"
                  alt="Platform Icon"
                />
                <span>{price !== null ? `$${price} USD` : ""}</span>
              </div>
            </div>
            <div className="buy-button-container">
              <button className="close" onClick={handleBreakScroll}>
                Alışverişe Devam Et
              </button>
              <a className="go-cart" href="/cart">
                Sepet Git
              </a>
            </div>
          </div>
        </div>
      ): (null)}
      <div className="page-content">
        <div className="left-content">
          <div className="blue-line"></div>
          <div className="purchase-game-container">
            <div className="purchase-game-name-container">
              <div className="purchase-game-name">{`${appName} Satın Alın`}</div>
            </div>
            <div className="purchase-button-container">
              <div className="purchase-price">
                <span>{price !== null ? `$${price} USD` : ""}</span>
                <div onClick={handleScroll}>
                <AddCart />
                </div>
              </div>
            </div>
          </div>
          <h2>Bu Oyun Hakkında</h2>
          <div className="blue-line"></div>
          <div className="page-game-description">
            {contentData
              ? contentData.description.split("\n").map((line, index) => {
                  // Bağlantıyı [] içinde kontrol et
                  if (line.startsWith("[") && line.endsWith("]")) {
                    const imgSrc = line.slice(1, -1); // Köşeli parantezleri kaldır
                    return (
                      <React.Fragment key={index}>
                        <img
                          src={imgSrc}
                          className="page-description-img"
                          alt="description"
                        />
                      </React.Fragment>
                    );
                  }
                  // Aksi halde metni render et
                  return (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  );
                })
              : ""}
          </div>

          {showReadMore && ( // Eğer yükseklik 850px'i geçmiyorsa butonu gizle
            <div
              className="page-description-scale-container"
              onClick={handleClick}
            >
              <div className="page-description-scale"></div>
              <div className="page-description-scale-text">Devamını Oku</div>
            </div>
          )}

          <SystemReq />
        </div>
        <aside className="right-content">
          <AppDetails></AppDetails>
        </aside>
      </div>
      <div className="page-review">
        <h2>{`${appName} Müşteri İncelemeleri`}</h2>
        <div className="blue-line"></div>
        <Review></Review>
      </div>
    </>
  );
};

export default AppContent;
