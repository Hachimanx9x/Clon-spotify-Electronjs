import React from "react";
import firebase from "./utils/firebase";
import "firebase/auth";

export default function App() {
  firebase.auth().onAuthStateChanged((currentUSer) => {
    console.log(currentUSer ? "log" : "NoLog");
  });

  return (
    <div>
      <h1>react + electron </h1>
    </div>
  );
}
