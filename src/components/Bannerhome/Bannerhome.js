import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import alertErrors from "../../utils/alertErrors";
import "firebase/storage";
import "./Bannerhome.scss";
export default function Bannerhome() {
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref("other/banner-home.jpg")
      .getDownloadURL()
      .then((banner) => {
        setBannerUrl(banner);
      })
      .catch((err) => {
        alertErrors(err?.code);
      });
  }, [bannerUrl]);
  return (
    <>
      <div className="o-banner-home o-bg-img" />
      <style jsx>{`
        .o-bg-img {
          background-image: url("${bannerUrl}");
        }
      `}</style>
    </>
  );
}
