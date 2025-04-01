"use client";

import React, { useState, useEffect } from "react";
import "./app-media.css";

import AppVideoComponent from "../VideoComponent/AppVideoComponent";
import { usePathname } from "next/navigation";
import Image from "next/image";

async function fetchapp(appPath) {
  const response = await fetch(`/app/${appPath}/data.json`);
  const data = await response.json();
  return data;
}

const AppMediaLogin = () => {
  const appPath = usePathname().split("/").at(-1);
  const appName = appPath.replaceAll("_", " ");

  // State ile appData'yı yönet
  const [appData, setAppData] = useState(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const firstMainImage = `/app/${appPath}/images/1.jpg`;
  const [mainImage, setMainImage] = useState(firstMainImage);

  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/app/${appPath}/background.jpg)`;

    async function getAppData() {
      const data = await fetchapp(appPath);
      setAppData(data); // Veriyi state'e kaydet
    }
    getAppData(); // Asenkron veri çekme işlemi
  }, [appPath]);

  const images = Array.from(
    { length: appData?.imageCount || 6 },
    (_, i) => i + 1
  );

  console.log(appName);
  console.log(appData); // Verileri kontrol etmek için
  console.log(images);

  const handleScroll = () => {
    document.body.style.overflow = "hidden";

    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    setScrollPosition(currentScroll);
    setIsImageVisible(true);
  };

  const handleBreakScroll = () => {
    document.body.style.overflow = "auto";
    setIsImageVisible(false);
  };

  const handleCartClick = (e) => {
    e.stopPropagation(); // Bu, menü içine tıklandığında kapanmasını engeller
  };

  return (
    <>
      {isImageVisible ? (
        <div
          className="black-container"
          onClick={handleBreakScroll}
          style={{
            top: `${scrollPosition}px`,
          }}
        >
          <div className="app-image-container" onClick={handleCartClick}>
            <Image
              src={mainImage}
              alt={`${appPath}-image`}
              width="600"
              height="337"
            />
            <button className="close" onClick={handleBreakScroll}>
              Kapat
            </button>
          </div>
        </div>
      ) : null}
      <div className="app-media-content">
        <div className="app-media">
          <div className="game-title">
            <p className="game-path-text">
              <a href="/">Tüm Oyunlar</a> &gt; <a href="">{appName}</a>
            </p>
            <div className="game-name-container">
              <h1>{appName}</h1>
              <span>Topluluk Merkezi</span>
            </div>
          </div>
          <div className="game-media">
            <div className="game-medias">
              <div className="game-top-media">
                <AppVideoComponent
                  src={`/app/${appPath}/video/video.webm`}
                  width={600}
                  height={335}
                ></AppVideoComponent>
              </div>
              <div className="game-bot-media-container">
                <div className="game-bot-media">
                  {images.map((imgNum) => (
                    <Image
                      id={imgNum}
                      key={imgNum}
                      src={`/app/${appPath}/images/${imgNum}.jpg`}
                      width={115}
                      height={65}
                      alt={`Image ${imgNum}`}
                      onClick={() => {
                        setMainImage(`/app/${appPath}/images/${imgNum}.jpg`);
                        handleScroll();
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="game-media-description">
              <img
                src={`/app/${appPath}/thumbnail.jpg`}
                alt={`${appPath}-thumbnail`}
                width="325"
                height="150"
              />
              <p>{appData ? appData.description : "Veri yükleniyor..."}</p>
              <div className="game-review-together-container">
                <div className="together-header">
                  <div className="game-review-header">En Son İncelemer:</div>
                  <span className="game-review-text">Çok Olumlu</span>
                </div>
                <div className="together-header">
                  <div className="game-review-header">Bütün İncelemer:</div>
                  <span className="game-review-text">Çok Olumlu</span>
                </div>
              </div>
              <div className="game-review-container">
                <div className="game-review-header">Çıkış Tarihi:</div>
                <span className="game-review-text">
                  {appData ? appData.releaseDate : "Yükleniyor..."}
                </span>
              </div>
              <div className="game-review-together-container">
                <div className="together-header">
                  <div className="game-review-header">Geliştirici:</div>
                  <span className="game-review-text">
                    {appData ? appData.developer : "Yükleniyor..."}
                  </span>
                </div>
                <div className="together-header">
                  <div className="game-review-header">Yayıncı:</div>
                  <span className="game-review-text">
                    {appData ? appData.publisher : "Yükleniyor..."}
                  </span>
                </div>
              </div>
              <div className="game-review-tag-container">
                <div className="game-review-header">
                  Bu ürün için popüler kullanıcı tanımlı etiketler:
                </div>
                <div className="game-tag-div">
                  {appData?.tags?.map((tag, index) => (
                    <div key={index}>{tag}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="game-shadow"></div>
      </div>
    </>
  );
};

export default AppMediaLogin;
