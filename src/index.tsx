import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./components/routes/Routing";
import "./index.css";


import * as firebase from "firebase/app";
import { AuthProvider } from "./components/providers/AuthProvider";



firebase.initializeApp({
  apiKey: "AIzaSyBHOh8zvNC9VeUlwrqyNRCxEOzD70DYDYE",
  authDomain: "vksocial-3eac3.firebaseapp.com",
  projectId: "vksocial-3eac3",
  storageBucket: "vksocial-3eac3.appspot.com",
  messagingSenderId: "527714957747",
  appId: "1:527714957747:web:00e33b61fd5c1d6db233c6",
});



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Routing />
    </AuthProvider>
  </React.StrictMode>
);
