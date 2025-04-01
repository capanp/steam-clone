// client-side component
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import "./carousel.css";

import first from "../../assets/games/cs2-main.jpg";
import first1 from "../../assets/games/cs2-1.jpg";
import first2 from "../../assets/games/cs2-2.jpg";
import first3 from "../../assets/games/cs2-3.jpg";
import first4 from "../../assets/games/cs2-4.jpg";

import second from "../../assets/games/rust-main.jpg";
import second1 from "../../assets/games/rust-1.jpg";
import second2 from "../../assets/games/rust-2.jpg";
import second3 from "../../assets/games/rust-3.jpg";
import second4 from "../../assets/games/rust-4.jpg";

import third from "../../assets/games/bg3-main.jpg";
import third1 from "../../assets/games/bg3-1.jpg";
import third2 from "../../assets/games/bg3-2.jpg";
import third3 from "../../assets/games/bg3-3.jpg";
import third4 from "../../assets/games/bg3-4.jpg";

import fourth from "../../assets/games/hello-main.jpg";
import fourth1 from "../../assets/games/hello-1.jpg";
import fourth2 from "../../assets/games/hello-2.jpg";
import fourth3 from "../../assets/games/hello-3.jpg";
import fourth4 from "../../assets/games/hello-4.jpg";

import fifth from "../../assets/games/kingdom-main.jpg";
import fifth1 from "../../assets/games/kingdom-1.jpg";
import fifth2 from "../../assets/games/kingdom-2.jpg";
import fifth3 from "../../assets/games/kingdom-3.jpg";
import fifth4 from "../../assets/games/kingdom-4.jpg";

import sixth from "../../assets/games/r6-main.jpg";
import sixth1 from "../../assets/games/r6-1.jpg";
import sixth2 from "../../assets/games/r6-2.jpg";
import sixth3 from "../../assets/games/r6-3.jpg";
import sixth4 from "../../assets/games/r6-4.jpg";

function Carousel() {
  const [mainFirstImage, setFirstMainImage] = useState(first);
  const [mainSecondImage, setSecondMainImage] = useState(second);
  const [mainThirdImage, setThirdMainImage] = useState(third);
  const [mainFourthImage, setFourthMainImage] = useState(fourth);
  const [mainFifthImage, setFifthMainImage] = useState(fifth);
  const [mainSixthImage, setSixthMainImage] = useState(sixth);

  const [currentIndex, setCurrentIndex] = useState(0);
  const previousIndexRef = useRef(0);

  useEffect(() => {
    const divs = Array.from(document.querySelectorAll(".carousel-items > a"));
    const thumbs = document.querySelectorAll(".carousel-thumbs > .thumb");
  
    const previousIndex = previousIndexRef.current; // Önceki index'i al
    previousIndexRef.current = currentIndex; // Yeni geçerli index'i sakla
  
    const updateVisibility = () => {
      divs.forEach((div, index) => {
        if (index === currentIndex) {
          div.classList.remove("hided", "fadeOut");
          thumbs[index]?.classList.add("selected-thumb");
        } 
        else if (index === previousIndex) {
          div.classList.remove("hided");
          
          // Eski event listener'ı temizle
          const handleAnimationEnd = () => {
            div.classList.add("hided");
            div.classList.remove("fadeOut");
            div.removeEventListener("animationend", handleAnimationEnd);
          };
          
          div.addEventListener("animationend", handleAnimationEnd);
          div.classList.add("fadeOut");
          
          thumbs[index]?.classList.remove("selected-thumb");
        } 
        else {
          div.classList.add("hided");
          div.classList.remove("fadeOut");
          thumbs[index]?.classList.remove("selected-thumb");
        }
      });
    };
    
    updateVisibility();

    //carouseli güncelle
    updateVisibility();

    // 5 saniyelik değişim
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % divs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]); //değiştiğinde tekrarlanacak

  // Sağ ve sol butonlarına tıklayınca manuel değişim
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % 6);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? 5 : prev - 1));

  const goSlide = (array) => setCurrentIndex(array);

  const carouselStyle = {
    display: "flex",
    position: "absolute",
    width: "100%",
  };

  return (
    <div className="carousel-wrap">
      <div className="home-carousel">
        <h2>Öne Çıkanlar ve Tavsiye Edilenler</h2>
        <div className="carousel-content">
          <div className="carousel-items">
            <a style={carouselStyle} href="/app/Counter_Strike_2/">
              <div className="carousel-image">
                <Image
                  src={mainFirstImage}
                  width={616}
                  height={353}
                  alt="Steam Ana Sayfa Uygulaması"
                  priority
                />
              </div>
              <div className="carousel-info">
                <div className="carousel-top">
                  <h1>Counter Strike 2</h1>
                  <div className="app-images"></div>
                  <div>
                    <div className="carousel-images">
                      <Image
                        src={first1}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFirstMainImage(first1)}
                        onMouseLeave={() => setFirstMainImage(first)}
                        alt="1. Resim"
                      />
                      <Image
                        src={first2}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFirstMainImage(first2)}
                        onMouseLeave={() => setFirstMainImage(first)}
                        alt="2. Resim"
                      />
                    </div>
                    <div className="carousel-images">
                      <Image
                        src={first3}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFirstMainImage(first3)}
                        onMouseLeave={() => setFirstMainImage(first)}
                        alt="3. Resim"
                      />
                      <Image
                        src={first4}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFirstMainImage(first4)}
                        onMouseLeave={() => setFirstMainImage(first)}
                        alt="4. Resim"
                      />
                    </div>
                  </div>
                  <div className="top-reason">Yayınlandı</div>
                  <div className="sold-tag">En Çok Satan</div>
                </div>
                <div className="carousel-bottom">
                  <div className="carousel-price">$14.99</div>
                  <div className="platform-logo">
                    <Image
                      src="/icon_platform_win.png"
                      width={20}
                      height={20}
                      alt="Windows Icon"
                    />
                  </div>
                </div>
              </div>
            </a>
            <a className="hided" style={carouselStyle} href="/app/Rust/">
              <div className="carousel-image">
                <Image
                  src={mainSecondImage}
                  width={616}
                  height={353}
                  alt="Steam Ana Sayfa Uygulaması"
                  priority
                />
              </div>
              <div className="carousel-info">
                <div className="carousel-top">
                  <h1>Rust</h1>
                  <div className="app-images"></div>
                  <div>
                    <div className="carousel-images">
                      <Image
                        src={second1}
                        width={128}
                        height={70}
                        onMouseEnter={() => setSecondMainImage(second1)}
                        onMouseLeave={() => setSecondMainImage(second)}
                        alt="1. Resim"
                      />
                      <Image
                        src={second2}
                        width={128}
                        height={70}
                        onMouseEnter={() => setSecondMainImage(second2)}
                        onMouseLeave={() => setSecondMainImage(second)}
                        alt="2. Resim"
                      />
                    </div>
                    <div className="carousel-images">
                      <Image
                        src={second3}
                        width={128}
                        height={70}
                        onMouseEnter={() => setSecondMainImage(second3)}
                        onMouseLeave={() => setSecondMainImage(second)}
                        alt="3. Resim"
                      />
                      <Image
                        src={second4}
                        width={128}
                        height={70}
                        onMouseEnter={() => setSecondMainImage(second4)}
                        onMouseLeave={() => setSecondMainImage(second)}
                        alt="4. Resim"
                      />
                    </div>
                  </div>
                  <div className="top-reason">Yayınlandı</div>
                  <div className="sold-tag">En Çok Satan</div>
                </div>
                <div className="carousel-bottom">
                  <div className="carousel-price">$18.99</div>
                  <div className="platform-logo">
                    <Image
                      src="/icon_platform_win.png"
                      width={20}
                      height={20}
                      alt="Windows Icon"
                    />
                  </div>
                </div>
              </div>
            </a>
            <a
              className="hided"
              style={carouselStyle}
              href="/app/Baldurs_Gate_3/"
            >
              <div className="carousel-image">
                <Image
                  src={mainThirdImage}
                  width={616}
                  height={353}
                  alt="Steam Ana Sayfa Uygulaması"
                  priority
                />
              </div>
              <div className="carousel-info">
                <div className="carousel-top">
                  <h1>Baldur's Gate 3</h1>
                  <div className="app-images"></div>
                  <div>
                    <div className="carousel-images">
                      <Image
                        src={third1}
                        width={128}
                        height={70}
                        onMouseEnter={() => setThirdMainImage(third1)}
                        onMouseLeave={() => setThirdMainImage(third)}
                        alt="1. Resim"
                      />
                      <Image
                        src={third2}
                        width={128}
                        height={70}
                        onMouseEnter={() => setThirdMainImage(third2)}
                        onMouseLeave={() => setThirdMainImage(third)}
                        alt="2. Resim"
                      />
                    </div>
                    <div className="carousel-images">
                      <Image
                        src={third3}
                        width={128}
                        height={70}
                        onMouseEnter={() => setThirdMainImage(third3)}
                        onMouseLeave={() => setThirdMainImage(third)}
                        alt="3. Resim"
                      />
                      <Image
                        src={third4}
                        width={128}
                        height={70}
                        onMouseEnter={() => setThirdMainImage(third4)}
                        onMouseLeave={() => setThirdMainImage(third)}
                        alt="4. Resim"
                      />
                    </div>
                  </div>
                  <div className="top-reason">Yayınlandı</div>
                  <div className="sold-tag">En Çok Satan</div>
                </div>
                <div className="carousel-bottom">
                  <div className="carousel-price">$34.99</div>
                  <div className="platform-logo">
                    <Image
                      src="/icon_platform_win.png"
                      width={20}
                      height={20}
                      alt="Windows Icon"
                    />
                  </div>
                </div>
              </div>
            </a>
            <a
              className="hided"
              style={carouselStyle}
              href="/app/Hello_Kitty_Island_Adventure/"
            >
              <div className="carousel-image">
                <Image
                  src={mainFourthImage}
                  width={616}
                  height={353}
                  alt="Steam Ana Sayfa Uygulaması"
                  priority
                />
              </div>
              <div className="carousel-info">
                <div className="carousel-top">
                  <h1>Hello Kitty Island Adventure</h1>
                  <div className="app-images"></div>
                  <div>
                    <div className="carousel-images">
                      <Image
                        src={fourth1}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFourthMainImage(fourth1)}
                        onMouseLeave={() => setFourthMainImage(fourth)}
                        alt="1. Resim"
                      />
                      <Image
                        src={fourth2}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFourthMainImage(fourth2)}
                        onMouseLeave={() => setFourthMainImage(fourth)}
                        alt="2. Resim"
                      />
                    </div>
                    <div className="carousel-images">
                      <Image
                        src={fourth3}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFourthMainImage(fourth3)}
                        onMouseLeave={() => setFourthMainImage(fourth)}
                        alt="3. Resim"
                      />
                      <Image
                        src={fourth4}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFourthMainImage(fourth4)}
                        onMouseLeave={() => setFourthMainImage(fourth)}
                        alt="4. Resim"
                      />
                    </div>
                  </div>
                  <div className="top-reason">Yayınlandı</div>
                  <div className="sold-tag">En Çok Satan</div>
                </div>
                <div className="carousel-bottom">
                  <div className="carousel-price">$18.99</div>
                  <div className="platform-logo">
                    <Image
                      src="/icon_platform_win.png"
                      width={20}
                      height={20}
                      alt="Windows Icon"
                    />
                  </div>
                </div>
              </div>
            </a>
            <a
              className="hided"
              style={carouselStyle}
              href="/app/Kingdom_Come_Deliverance_II/"
            >
              <div className="carousel-image">
                <Image
                  src={mainFifthImage}
                  width={616}
                  height={353}
                  alt="Steam Ana Sayfa Uygulaması"
                  priority
                />
              </div>
              <div className="carousel-info">
                <div className="carousel-top">
                  <h1>Kingdom Come: Deliverance II</h1>
                  <div className="app-images"></div>
                  <div>
                    <div className="carousel-images">
                      <Image
                        src={fifth1}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFifthMainImage(fifth1)}
                        onMouseLeave={() => setFifthMainImage(fifth)}
                        alt="1. Resim"
                      />
                      <Image
                        src={fifth2}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFifthMainImage(fifth2)}
                        onMouseLeave={() => setFifthMainImage(fifth)}
                        alt="2. Resim"
                      />
                    </div>
                    <div className="carousel-images">
                      <Image
                        src={fifth3}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFifthMainImage(fifth3)}
                        onMouseLeave={() => setFifthMainImage(fifth)}
                        alt="3. Resim"
                      />
                      <Image
                        src={fifth4}
                        width={128}
                        height={70}
                        onMouseEnter={() => setFifthMainImage(fifth4)}
                        onMouseLeave={() => setFifthMainImage(fifth)}
                        alt="4. Resim"
                      />
                    </div>
                  </div>
                  <div className="top-reason">Yayınlandı</div>
                  <div className="sold-tag">En Çok Satan</div>
                </div>
                <div className="carousel-bottom">
                  <div className="carousel-price">$44.99</div>
                  <div className="platform-logo">
                    <Image
                      src="/icon_platform_win.png"
                      width={20}
                      height={20}
                      alt="Windows Icon"
                    />
                  </div>
                </div>
              </div>
            </a>
            <a
              className="hided"
              style={carouselStyle}
              href="/app/Tom_Clancys_Rainbow_Six_Siege"
            >
              <div className="carousel-image">
                <Image
                  src={mainSixthImage}
                  width={616}
                  height={353}
                  alt="Steam Ana Sayfa Uygulaması"
                  priority
                />
              </div>
              <div className="carousel-info">
                <div className="carousel-top">
                  <h1>Tom Clancy's Rainbow Six® Siege</h1>
                  <div className="app-images"></div>
                  <div>
                    <div className="carousel-images">
                      <Image
                        src={sixth1}
                        width={128}
                        height={70}
                        onMouseEnter={() => setSixthMainImage(sixth1)}
                        onMouseLeave={() => setSixthMainImage(sixth)}
                        alt="1. Resim"
                      />
                      <Image
                        src={sixth2}
                        width={128}
                        height={70}
                        onMouseEnter={() => setSixthMainImage(sixth2)}
                        onMouseLeave={() => setSixthMainImage(sixth)}
                        alt="2. Resim"
                      />
                    </div>
                    <div className="carousel-images">
                      <Image
                        src={sixth3}
                        width={128}
                        height={70}
                        onMouseEnter={() => setSixthMainImage(sixth3)}
                        onMouseLeave={() => setSixthMainImage(sixth)}
                        alt="3. Resim"
                      />
                      <Image
                        src={sixth4}
                        width={128}
                        height={70}
                        onMouseEnter={() => setSixthMainImage(sixth4)}
                        onMouseLeave={() => setSixthMainImage(sixth)}
                        alt="4. Resim"
                      />
                    </div>
                  </div>
                  <div className="top-reason">Yayınlandı</div>
                  <div className="sold-tag">En Çok Satan</div>
                </div>
                <div className="carousel-bottom">
                  <div className="carousel-price">$15.99</div>
                  <div className="platform-logo">
                    <Image
                      src="/icon_platform_win.png"
                      width={20}
                      height={20}
                      alt="Windows Icon"
                    />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="arrow left" onClick={prevSlide}>
          <div></div>
        </div>
        <div className="arrow right" onClick={nextSlide}>
          <div></div>
        </div>
        <div className="carousel-thumbs">
          <div
            className="thumb selected-thumb"
            onClick={() => goSlide(0)}
          ></div>
          <div className="thumb" onClick={() => goSlide(1)}></div>
          <div className="thumb" onClick={() => goSlide(2)}></div>
          <div className="thumb" onClick={() => goSlide(3)}></div>
          <div className="thumb" onClick={() => goSlide(4)}></div>
          <div className="thumb" onClick={() => goSlide(5)}></div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
