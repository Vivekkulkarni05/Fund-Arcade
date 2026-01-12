import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0mB6j14Kbt69DXO-SNJSb4fvywSpQSL4",
  authDomain: "psf-26-cc938.firebaseapp.com",
  projectId: "psf-26-cc938",
  storageBucket: "psf-26-cc938.firebasestorage.app",
  messagingSenderId: "784252254013",
  appId: "1:784252254013:web:052dc8a4b3e4b7a62c7754",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
