import React from "react";
import "./review.css";

function review() {
  return (
    <>
      <div className="review-top-container">
        <div className="total-text">Toplam İnceleme:</div>
        <div className="count-text">
          N/A <span>{"(0 inceleme)"}</span>
        </div>
      </div>
      <div className="review-filter-container">
        <div className="review-filter-menu">
          <div className="review-filter-title">İnceleme Türü</div>
        </div>
        <div className="review-filter-menu">
          <div className="review-filter-title">Satın Alma Türü</div>
        </div>
        <div className="review-filter-menu">
          <div className="review-filter-title">Dil</div>
        </div>
        <div className="review-filter-menu">
          <div className="review-filter-title">Tarih Aralığı</div>
        </div>
        <div className="review-filter-menu">
          <div className="review-filter-title">Oynama Süresi</div>
        </div>
        <div className="review-filter-menu">
          <div className="review-filter-title">Görüntüleme</div>
        </div>
      </div>
      <div className="review-filter-text">
        Yukarıdaki filtrelere uyan <span>0</span> inceleme gösteriliyor
      </div>
      <div className="black-line"></div>
      <span className="total-review-text">Henüz İnceleme Yok</span>
    </>
  );
}

export default review;
