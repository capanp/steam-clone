import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "apikey",
  projectId: "apikey",
  storageBucket: "apikey",
  messagingSenderId: "apikey",
  appId: "apikey",
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
