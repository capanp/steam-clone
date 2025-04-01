"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./navbar.css";

import { auth } from "../Account/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLogin");
      // İsteğe bağlı yönlendirme:
      // router.push('/');
    } catch (error) {
      console.error("Çıkış yaparken hata:", error);
    }
  };

  const handleClick = () => {
    window.location.href = "https://github.com/capanp/steam-klon";
  };

  return (
    <nav className="banner">
      <div className="content">
        <div className="nav">
          <div className="logo">
            <a href="/">
              <Image
                src="/logo.svg"
                width={176}
                height={44}
                alt="Steam Ana Sayfa Bağlantısı"
                priority
              />
            </a>
          </div>
          <ul className="navigation">
            <li className="menu-item">
              <a className="selected-menu" href="/">
                Mağaza
              </a>
              <div className="popup-menu">
                <div className="popup-item">Ana Sayfa</div>
                <div className="popup-item">Keşif Kuyruğu</div>
                <div className="popup-item">İstek Listesi</div>
                <div className="popup-item">Puan Dükkanı</div>
                <div className="popup-item">İstatislikler</div>
              </div>
            </li>
            <li className="menu-item">
              <a href="/login">Topluluk</a>
              <div className="popup-menu">
                <div className="popup-item">Ana Sayfa</div>
                <div className="popup-item">Tartışmalar</div>
                <div className="popup-item">Atölye</div>
                <div className="popup-item">Pazar</div>
                <div className="popup-item">Yayınlar</div>
              </div>
            </li>
            <li className="menu-item">
              <a href="#footer">Hakkında</a>
            </li>
            <li className="menu-item">
              <a href="https://github.com/capanp">Destek</a>
            </li>
          </ul>
        </div>
        <div className="action-menu">
          <button className="install-button" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 30 30"
              fill="white"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>
            Github
          </button>
          {user ? (
            // Kullanıcı giriş yapmışsa gösterilecek kısım
            <div className="user-profile">
              <span>Hoş geldin, {user.email}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
                fill="currentcolor"
                onClick={handleLogout}
              >
                <path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 29.5 42 C 32.519774 42 35 39.519774 35 36.5 A 1.50015 1.50015 0 1 0 32 36.5 C 32 37.898226 30.898226 39 29.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 L 29.5 9 C 30.898226 9 32 10.101774 32 11.5 A 1.50015 1.50015 0 1 0 35 11.5 C 35 8.4802259 32.519774 6 29.5 6 L 11.5 6 z M 33.484375 15.484375 A 1.50015 1.50015 0 0 0 32.439453 18.060547 L 36.878906 22.5 L 15.5 22.5 A 1.50015 1.50015 0 1 0 15.5 25.5 L 36.878906 25.5 L 32.439453 29.939453 A 1.50015 1.50015 0 1 0 34.560547 32.060547 L 41.560547 25.060547 A 1.50015 1.50015 0 0 0 41.560547 22.939453 L 34.560547 15.939453 A 1.50015 1.50015 0 0 0 33.484375 15.484375 z"></path>
              </svg>
            </div>
          ) : (
            // Kullanıcı giriş yapmamışsa gösterilecek kısım
            <p className="get-account-container">
              <a href="/login">Giriş</a> | <a href="/join">Kayıt</a>
            </p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
