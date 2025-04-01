"use client"

import React, { useState } from "react";
import "./login.css";

import { auth } from "../Account/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && password.length <= 24;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    // Real-time validation
    if (name === "email") {
      setErrors({
        ...errors,
        email: value.trim() === "" ? false : !validateEmail(value)
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: value.trim() === "" ? false : !validatePassword(value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);

    setErrors({
      email: !emailValid,
      password: !passwordValid
    });

    if (emailValid && passwordValid) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Login:", userCredential.user);
        localStorage.setItem("isLogin", "true");
        window.location.href = "/";
      } catch (error) {
        console.error("Error:", error.code, error.message);
      }
    }
  };

  return (
    <>
      <div className="login-header">Giriş</div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="name-container">
            <p className="login-text login-header-text">
              Hesap Adı İle Giriş Yap
            </p>
            <input
            type="text"
            className="login-input"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            />
            {errors.email && <p className="error">Geçersiz e-posta adresi.</p>}
          </div>
          <div className="password-container">
            <div className="login-text">Parola</div>
            <input
            type="text"
            className="login-input"
            name="password"
            id="password"
            placeholder="123456"
            value={formData.password}
            onChange={handleChange}
            />
            {errors.password && (
              <p className="error">Şifre 6-24 karakter arasında olmalı.</p>
            )}
          </div>
          <div className="remember-container">
            <input
              type="checkbox"
              id="remember_me"
              name="vehicle1"
              value="Bike"
            />
            <label htmlFor="remember_me">Beni Hatırla</label>
          </div>
          <button type="submit" className="login-button">Giriş Yap</button>
          <div className="login-space"></div>
        </form>
        <form className="qr-form">
          <p className="login-text login-header-text">
            Veya QR Kodu İle Giriş Yapın
          </p>
          <img
            src="/rickroll_qr.png"
            width={170}
            height={170}
            alt="Steam QR İle Giriş Kodu"
          />
          <p className="rick_roll">
            Ya da{" "}
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0">
              buraya tıkla
            </a>
          </p>
        </form>
      </div>

      <div className="login_bottom_row">
          <div className="login_btn_ctn login_bottom_row_item">
            <div className="login-headline">Steam'de yeni misiniz?</div>
            <a
                className="login-button rgstr"
                href="/join"
              >
                Hesap Oluştur
              </a>
          </div>
          <div className="login_bottom_row_item">
            <div className="login-subtext">
              Ücretsiz ve kolaydır. Milyonlarca yeni arkadaşla beraber
              oynayabileceğiniz binlerce oyunu keşfedin.{" "}
              <a
                className="login_join_desc about_link"
                href="/"
              >
                Steam hakkında daha fazla bilgi edinin.
              </a>
            </div>
          </div>
        </div>
    </>
  );
}

export default Login;
