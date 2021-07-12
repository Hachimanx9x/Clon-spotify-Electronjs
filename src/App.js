import React, { useState } from "react";
import firebase from "./utils/firebase";
import Auth from "./pages/Auth/Index";
import { ToastContainer } from "react-toastify";
import LoggedLayout from "./layouts/LoggedLayout";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reloadApp, setReloadApp] = useState(false);

  console.log(reloadApp);
  firebase.auth().onAuthStateChanged((currentUSer) => {
    if (!currentUSer?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUSer);
    }

    setLoading(false);
  });
  if (loading) return null;

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <LoggedLayout setReloadApp={setReloadApp} user={user} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
}
