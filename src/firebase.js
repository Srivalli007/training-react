// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9ociI-VAES2e9Xiw08Jngugze28PW6QQ",
  authDomain: "my-login-app-5a4a1.firebaseapp.com",
  projectId: "my-login-app-5a4a1",
  storageBucket: "my-login-app-5a4a1.appspot.com",  // ✅ FIXED
  messagingSenderId: "715210637515",
  appId: "1:715210637515:web:bfb8bdae638b60a7029b4e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
