"use client";

import React, { useState, useEffect } from "react";
import "../app-content/app-content.css";
import "./system-req.css";

import { usePathname } from "next/navigation";

async function fetchapp(appPath, dataName) {
  const response = await fetch(`/app/${appPath}/${dataName}.json`);
  const data = await response.json();
  return data;
}

function SystemReq() {
  const appPath = usePathname().split("/").at(-1);
  const appName = appPath.replaceAll("_", " ");

  // State ile appData'yı yönet
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/app/${appPath}/background.jpg)`;

    async function getAppData() {
      const data = await fetchapp(appPath, "systemReq");

      setAppData(data);
    }

    getAppData(); // Asenkron veri çekme işlemi
  }, [appPath]);

  return (
    <>
      <h2>Sistem Gereksinimleri</h2>
      <div className="blue-line"></div>
      <div className="system-req-container">
        <div className="system-req">
          <span className="header">minimum:</span>
          <ul>
            <li><span className="system-req-header-text">İşletim Sistemi:</span> {appData ? appData.os : ""}</li>
            <li><span className="system-req-header-text">İşlemci:</span> {appData ? appData.cpu : ""}</li>
            <li><span className="system-req-header-text">Bellek:</span> {appData ? appData.ram : ""}</li>
            <li><span className="system-req-header-text">Ekran Kartı:</span> {appData ? appData.gpu : ""}</li>
            <li><span className="system-req-header-text">DirectX:</span> {appData ? appData.directx : ""}</li>
            <li><span className="system-req-header-text">Depolama:</span> {appData ? appData.storge : ""}</li>
          </ul>
        </div>
        <div className="recommed-system-req">
          <span className="header">önerilen:</span>
          <ul>
            <li><span className="system-req-header-text">İşletim Sistemi:</span> {appData ? appData.recOs : ""}</li>
            <li><span className="system-req-header-text">İşlemci:</span> {appData ? appData.recCpu : ""}</li>
            <li><span className="system-req-header-text">Bellek:</span> {appData ? appData.recRam : ""}</li>
            <li><span className="system-req-header-text">Ekran Kartı:</span> {appData ? appData.recGpu : ""}</li>
            <li><span className="system-req-header-text">DirectX:</span> {appData ? appData.recDirectx : ""}</li>
            <li><span className="system-req-header-text">Depolama:</span> {appData ? appData.recStorge : ""}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SystemReq;
