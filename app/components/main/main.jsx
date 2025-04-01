"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import "./main.css";

import VideoComponent from "../VideoComponent/VideoComponent";

import Action from "../../assets/action.webp";
import Rpg from "../../assets/rpg.webp";
import Strategy from "../../assets/strategy.webp";
import Horror from "../../assets/horror.webp";

import ds from "../../assets/games/dark-souls.jpg";
import got from "../../assets/games/ghost-of-tsushima.jpg";
import sekiro from "../../assets/games/sekiro.jpg";
import doom from "../../assets/games/doom-eternal.jpg";
import hades from "../../assets/games/hades.jpg";
import cult from "../../assets/games/cult.jpg";
import resident from "../../assets/games/resident.jpg";
import ff7 from "../../assets/games/ff7.jpg";
import gow from "../../assets/games/gow.jpg";
import ets from "../../assets/games/ets2.jpg";
import bg3 from "@/public/app/Baldurs_Gate_3/thumbnail.jpg";
import rust from "@/public/app/Rust/thumbnail.jpg"

function Main() {

    useEffect(() => {
      document.body.style.background = "url('/colored_body_top.png') center top no-repeat #1b2838";
    }, []);

  return (
    <main className="main-content">
      <div className="top-header-container">
        <h2>Özel Teklifler</h2>
        <div>Daha Fazlasına Göz Atın</div>
      </div>
      <div className="top-container">
        <a href="/app/Dark_Souls_Remastered">
          <div className="header-box">
            <Image
              src={ds}
              width={306}
              height={260}
              alt="Dark Souls Remastered"
            />
            <div className="header-info">
              <h2>Hafta Ortası Fırsatı</h2>
              <p>2030 13 Mar @ 20:00 Tarihinde sona erecek.</p>
              <div className="discount-header-container">
                <div className="discount-percentage">-50%</div>
                <div className="discount-header-price">
                  <div className="discount-original">$24.99</div>
                  <div className="discount-now">$12.49</div>
                </div>
              </div>
            </div>
          </div>
        </a>
        <a href="/app/Ghost_Of_Tsushima">
          <div className="header-box">
            <Image src={got} width={306} height={260} alt="God Of War" />
            <div className="header-info">
              <h2>Hafta Ortası Fırsatı</h2>
              <p>2030 13 Mar @ 20:00 Tarihinde sona erecek.</p>
              <div className="discount-header-container">
                <div className="discount-percentage">-33%</div>
                <div className="discount-header-price">
                  <div className="discount-original">$59.99</div>
                  <div className="discount-now">$40.19</div>
                </div>
              </div>
            </div>
          </div>
        </a>
        <div className="header-aside">
          <a href="/app/Sekiro">
            <div className="normal-box">
              <Image src={sekiro} width={306} height={143} alt="Sekiro" />
              <div className="normal-info">
                <h2>Günün Fırsatı</h2>
                <div className="discount-container">
                  <div className="discount-percentage">-50%</div>
                  <div className="discount-price">
                    <div className="discount-original">$59.99</div>
                    <div className="discount-now">$29.99</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/app/Doom_Eternal">
            <div className="normal-box normal-last">
              <Image src={doom} width={306} height={143} alt="Doom Eternal" />
              <div className="normal-info">
                <h2>Günün Fırsatı</h2>
                <div className="discount-container">
                  <div className="discount-percentage">-75%</div>
                  <div className="discount-price">
                    <div className="discount-original">$23.99</div>
                    <div className="discount-now">$5.99</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="category-container">
        <h2>Kategorilere Göre Göz Atın</h2>
        <div className="categorys">
          <div className="border">
            <Image src={Action} width={225} height={225} alt="Action" />
            <div className="border-text">
              <span>Aksiyon</span>
            </div>
          </div>
          <div className="border">
            <Image src={Rpg} width={225} height={225} alt="Rpg" />
            <div className="border-text">
              <span>Rpg</span>
            </div>
          </div>
          <div className="border">
            <Image src={Strategy} width={225} height={225} alt="Strategy" />
            <div className="border-text">
              <span>Strateji</span>
            </div>
          </div>
          <div className="border">
            <Image src={Horror} width={225} height={225} alt="Horror" />
            <div className="border-text">
              <span>Korku</span>
            </div>
          </div>
        </div>
      </div>

      <div className="line-container">
        <div className="game-header">
          <Image
            src="/decklogo.png"
            width={12}
            height={17}
            alt="Steam Deck Icon"
          />
          <h2>Steam Deck'te En Çok Oynanan</h2>
        </div>
        <div className="game-container">
          <a href="/app/Hades">
            <div className="game">
              <Image src={hades} width={229} height={105} alt="Hades" />
              <div>
                <span>$8.99</span>
              </div>
            </div>
          </a>
          <a href="/app/Cult_Of_The_Lamb">
            <div className="game">
              <Image
                src={cult}
                width={229}
                height={105}
                alt="Cult Of The Lamb"
              />
              <div>
                <span>$29.99</span>
              </div>
            </div>
          </a>
          <a href="/app/Resident_Evil_4">
            <div className="game">
              <Image
                src={resident}
                width={229}
                height={105}
                alt="Resident Evil 4"
              />
              <div>
                <span>$39.99</span>
              </div>
            </div>
          </a>
          <a href="/app/Final_Fantasy_VII_Rebirth">
            <div className="game">
              <Image
                src={ff7}
                width={229}
                height={105}
                alt="Final Fantasy VII Rebirth"
              />
              <div>
                <span>$39.99</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="video-container">
        <VideoComponent src="/video/deck_banner_animated_webm_turkish.webm" />
      </div>

      <div className="redirect-container">
        <p className="porti-text">
          Daha fazla kişiselleştirilmiş öneri görmek için giriş yapın.
        </p>
        <a className="login-button-main" href="/login">
          Giriş Yapın
        </a>
        <p className="porti-text">
          Ya da{" "}
          <a href="/join">
            kayıt olun
          </a>{" "}
          ve Steam'e ücretsiz katılın.
        </p>
      </div>
      <div className="recommed-container">
        <h2>Steam'e Göz Atın</h2>
        <div className="recommeds">
          <div className="new">
            <a href="">Yeni Çıkanlar</a>
          </div>
          <div className="discount">
            <a href="">Özel Fırsatlar</a>
          </div>
          <div className="free">
            <a href="">Ücretsiz Oyunlar</a>
          </div>
          <div className="user">
            <a href="">Kullanıcı Etiketleri</a>
          </div>
        </div>
      </div>
      <div className="line-container-bot">
        <h2>Sizin İçin Önerilenler</h2>
        <div className="game-container">
          <a href="/app/God_Of_War">
            <div className="game">
              <Image src={gow} width={229} height={105} alt="God Of War" />
              <div>
                <span>$19.99</span>
              </div>
            </div>
          </a>
          <a href="/app/Euro_Truck_Simulator_2">
            <div className="game">
              <Image
                src={ets}
                width={229}
                height={105}
                alt="Euro Truck Simulator 2"
              />
              <div>
                <span>$19.99</span>
              </div>
            </div>
          </a>
          <a href="/app/Baldurs_Gate_3">
            <div className="game">
              <Image src={bg3} width={229} height={105} alt="Baldurs Gate 3" />
              <div>
                <span>$34.99</span>
              </div>
            </div>
          </a>
          <a href="/app/Rust">
            <div className="game">
              <Image
                src={rust}
                width={229}
                height={105}
                alt="Rust"
              />
              <div>
                <span>$18.99</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}

export default Main;
