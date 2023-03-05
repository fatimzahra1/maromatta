import { Preloader } from "./components/common";
import "normalize.css/normalize.css";
import React from "react";
import { render } from "react-dom";
import "react-phone-input-2/lib/style.css";
import { onAuthStateFail, onAuthStateSuccess } from "./redux/actions/authActions";
import configureStore from "./redux/store/store";
import "./styles/style.scss";
import WebFont from "webfontloader";
import App from "./App";
import firebase from "./services/firebase";

WebFont.load({
  google: {
    families: ["Tajawal"]
  }
});

const { store, persistor } = configureStore();
const root = document.getElementById("app");

// Render the preloader on initial load
render(<Preloader />, root);

firebase.auth.onAuthStateChanged((user) => {
console.log("preloader")
  if (user) {
    store.dispatch(onAuthStateSuccess(user));
console.log("there is a user")
  } else {
    store.dispatch(onAuthStateFail("Failed to authenticate"));
console.log("no user")
  }
  // then render the app after checking the auth state
  render(<App store={store} persistor={persistor} />, root);
console.log("now the app")
});

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
console.log("production")
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((registration) => {
      console.log("SW registered: ", registration);
    }).catch((registrationError) => {
      console.log("SW registration failed: ", registrationError);
    });
  });
} else {
console.log("not production")}