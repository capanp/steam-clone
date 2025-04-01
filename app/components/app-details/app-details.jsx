"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./app-details.css";

import { usePathname } from "next/navigation";

async function fetchapp(appPath, dataName) {
  const response = await fetch(`/app/${appPath}/${dataName}.json`);
  const data = await response.json();
  return data;
}

function AppDetails() {
  const appPath = usePathname().split("/").at(-1);
  const appName = appPath.replaceAll("_", " ");

  // State ile appData'yı yönet
  const [appData, setAppData] = useState(null);
  const [mainAppData, setMainAppData] = useState(null);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/app/${appPath}/background.jpg)`;

    async function getAppData() {
      const data = await fetchapp(appPath, "contentData");
      const mainData = await fetchapp(appPath, "data");

      setAppData(data);
      setMainAppData(mainData);
    }

    getAppData(); // Asenkron veri çekme işlemi
  }, [appPath]);

  return (
    <>
      <div className="app-page-details">
        {appData?.details?.map((tag, index) => (
          <div key={index} className="app-page-details-container">
            <div className="app-page-details-icon">
              <Image
                src={`/icon/${index + 1}.png`} // İkon ismi dinamik olarak oluşturuluyor
                width={26}
                height={16}
                alt={`Uygulama Destek İconu ${index + 1}`}
              />
              <div className="app-page-details-text">{tag}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="app-page-details">
        <div className="app-list-item">
          <span className="app-list-header">Başlık: </span>
          <span className="app-list-text">{appName}</span>
        </div>
        <div className="app-list-item">
          <span className="app-list-header">Tür: </span>
          <span className="app-list-text">
            {mainAppData ? mainAppData.tags.join(", ") : ""}
          </span>
        </div>
        <div className="app-list-item">
          <span className="app-list-header">Geliştirici: </span>
          <span className="app-list-text">
            {mainAppData ? mainAppData.developer : ""}
          </span>
        </div>
        <div className="app-list-item">
          <span className="app-list-header">Yayıncı: </span>
          <span className="app-list-text">
            {mainAppData ? mainAppData.publisher : ""}
          </span>
        </div>
        <div className="app-list-item">
          <span className="app-list-header">Çıkış Tarihi: </span>
          <span className="app-list-text">
            {mainAppData ? mainAppData.releaseDate : ""}
          </span>
        </div>
        <div className="app-list-link-container">
          <div className="app-list-link">Facebook</div>
          <div className="app-list-link">Twitch</div>
          <div className="app-list-link">X</div>
          <div className="app-list-link">YouTube</div>
          <div className="app-list-link">İlgili haberleri oku</div>
          <div className="app-list-link">Tartışmaları görüntüle</div>
          <div className="app-list-link">Topluluk gruplarını bul</div>
          <div className="app-list-link">İnternet sitesini ziyaret et </div>
        </div>
      </div>
      <div className="app-page-detail-button">
        <div className="app-page-button">Sitene Ekle</div>
        <div className="app-page-button">
          <img src="/flag.png" alt="Şikayet Et" />
        </div>
      </div>
      <div className="app-page-detail-button">
        <div className="app-puan">
          <div
            className={`app-score ${
              mainAppData?.metacritic === undefined
                ? ""
                : mainAppData.metacritic >= 0 && mainAppData.metacritic <= 50
                ? "low"
                : mainAppData.metacritic > 50 && mainAppData.metacritic <= 80
                ? "mid"
                : "high"
            }`}
          >
            {mainAppData?.metacritic !== undefined
              ? mainAppData.metacritic
              : "?"}
          </div>

          <div className="mc-logo"></div>
          <div className="mc-text">
            <div className="wordmark">metacritic</div>
            <div className="mc-link">
              <a href="https://www.metacritic.com/game/">İncelemeleri Oku</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppDetails;
