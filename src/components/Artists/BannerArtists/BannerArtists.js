import React, { useState, useEffect } from "react";
import firebase from "../../../utils/firebase";
import "firebase/storage";
import "./BannerArtists.scss";
export default function BannerArtists({ artist }) {
  const [bannerUrl, setBannerUrl] = useState(null);
  useEffect(() => {
    firebase
      .storage()
      .ref(`artist/${artist?.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBannerUrl(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [artist]);
  return (
    <div
      className="o-banner-artist"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div className="o-banner-artist__gradient" />
      <div className="o-banner-artist__info">
        <h4>ARTISTA</h4>
        <h2>{artist.name}</h2>
      </div>
    </div>
  );
}
