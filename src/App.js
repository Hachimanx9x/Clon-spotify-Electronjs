import React, { useState } from "react";
import firebase from "./utils/firebase";
import Auth from "./pages/Auth/Index";
import "firebase/auth";

function UserLogged() {
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>Usuario logueado</h1>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default function App() {
  const [user, serUser] = useState(null);
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged((currentUSer) => {
    if (currentUSer) {
      serUser(currentUSer);
    }
    setLoading(false);
  });
  if (loading) return null;
  return !user ? <Auth /> : <h1>Usuario logueado</h1>;
}
