"use client";

import React, { useState, useEffect } from "react";
import "./cart.css";
import Image from "next/image";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [prices, setPrices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("onCart")) || [];
    setCartItems(items);
    fetchPrices(items);
  }, []);

  const fetchPrices = async (items) => {
    const priceData = {};
    let total = 0;

    for (const item of items) {
      try {
        const response = await fetch(
          `https://steam-klon-rest-api.capan.workers.dev/v1/apps/${item}`
        );
        const data = await response.json();
        console.log(item, data);

        // API yanıt yapısına göre fiyatı al
        const priceInfo = data[item] || "N/A";
        priceData[item] = priceInfo;

        // Fiyatı sayıya çevir (eğer $ işareti varsa kaldır)
        if (typeof priceInfo === "string") {
          const priceValue = parseFloat(priceInfo.replace(/[^0-9.]/g, ""));
          if (!isNaN(priceValue)) {
            total += priceValue;
          }
        } else if (typeof priceInfo === "number") {
          total += priceInfo;
        }
      } catch (error) {
        console.error(`Error fetching price for ${item}:`, error);
        priceData[item] = "N/A";
      }
    }

    setPrices(priceData);
    setTotalPrice(total.toFixed(2));
    setIsLoading(false);
  };

  const removeItem = (itemToRemove) => {
    const updatedItems = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(updatedItems);
    localStorage.setItem("onCart", JSON.stringify(updatedItems));

    // Fiyatı güncelle
    const priceToRemove = prices[itemToRemove];
    let priceValue = 0;

    if (typeof priceToRemove === "string") {
      priceValue = parseFloat(priceToRemove.replace(/[^0-9.]/g, "")) || 0;
    } else if (typeof priceToRemove === "number") {
      priceValue = priceToRemove;
    }

    setTotalPrice((prevTotal) =>
      (parseFloat(prevTotal) - priceValue).toFixed(2)
    );
  };

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`;
    }
    if (typeof price === "string" && !price.startsWith("$")) {
      return `$${price}`;
    }
    return price;
  };

  return (
    <div className="cart-wrap">
      <div className="cart-path">
        <a href="/">Ana Sayfa</a> {"> Alışveriş Sepetiniz"}
      </div>
      <h1 className="cart-header">Alışveriş Sepetiniz</h1>
      <div className="cart-content">
        <div className="cart-left-container">
          {isLoading ? (
            ""
          ) : cartItems.length === 0 ? (
            <p>Sepetiniz boş</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item}>
                <Image
                  width={200}
                  height={95}
                  src={`/app/${item}/thumbnail.jpg`}
                  alt="Game Thumbnail"
                />
                <div className="cart-item-content">
                  <h2 className="cart-item-header">
                    {item.replace(/_/g, " ")}
                  </h2>
                  <Image
                    width={20}
                    height={20}
                    src="/icon_platform_win.png"
                    alt="Platform Icon"
                  />
                  <p className="cart-item-price">
                    {formatPrice(prices[item]) || "Fiyat bilgisi yok"}
                  </p>
                  <div className="cart-button-container">
                    <button
                      className="remove-item-button"
                      onClick={() => removeItem(item)}
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="go-back">
            <a href="/">Alışverişe Devam Et</a>
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="cart-right-container">
            <div className="cart-buy-container">
              <div className="total-price-container">
                <span>Hesaplanan Tutar</span>
                <span>${totalPrice}</span>
              </div>
              <div className="buy-description">
                Satış vergisi eğer varsa ödeme anında hesaplanır.
              </div>
              <a href="/cart">Ödemeye Devam Et</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
