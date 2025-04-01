"use client"

import React, { useState } from "react";
import "./join.css";
import Country from "./country.jsx";

import { useRouter } from "next/navigation";
import { auth } from "../Account/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Join() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    country: "",
    age: false // ageChecked yerine age yapıldı
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    age: false // ageChecked yerine age yapıldı
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
    } else if (name === "age") {
      setErrors({
        ...errors,
        age: !checked
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);
    const ageValid = formData.age; // ageChecked yerine age

    setErrors({
      email: !emailValid,
      password: !passwordValid,
      age: !ageValid
    });

    if (emailValid && passwordValid && ageValid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("User Created:", userCredential.user);
        router.push("/login"); // useRouter'ı burada da kullanabilirsiniz
      } catch (error) {
        console.error("Error:", error.code, error.message);
      }
    }
  };

  return (
    <div className="create-account-form">
      <p className="title">Hesabınızı Oluşturun</p>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="login-text">E-posta</div>
          <input
            type="text"
            className={`login-input ${errors.email ? "input-error" : ""}`}
            name="email"
            id="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">Geçersiz e-posta adresi.</p>}
        </div>
        <div className="form-container">
          <div className="login-text">Parola</div>
          <input
            type="password"
            className={`login-input ${errors.password ? "input-error" : ""}`}
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
        <div className="form-container">
          <div className="login-text">İkamet Edilen Ülke</div>
          <select
            name="country"
            id="country"
            className="select-country"
            value={formData.country}
            onChange={handleChange}
          >
            <Country />
          </select>
        </div>
        <div className="form-container">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="age"
              name="age"
              checked={formData.age}
              onChange={handleChange}
            />
            <label htmlFor="age">
              13 yaşındayım veya 13 yaşından büyüğüm, Steam Abonelik Sözleşmesi
              ve Valve Gizlilik Politikası koşullarını kabul ediyorum.
            </label>
          </div>
          {errors.age && ( // ageChecked yerine age
            <p className="error">Bu kutuyu işaretlemeniz gerekmektedir.</p>
          )}
          <button type="submit" className="create-account-button">
            <span>Hesap Oluştur</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Join;