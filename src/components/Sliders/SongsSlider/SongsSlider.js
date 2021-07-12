import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
//firebase
import firebase from "../../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
//styles
import { Icon } from "semantic-ui-react";
import "./SongsSlider.scss";
//database
const db = firebase.firestore(firebase);

function Song({ song, playerSoung }) {
  const [banner, setBanner] = useState(null);
  const [album, setAlbum] = useState(null);
  const [songUrl, setSongUrl] = useState(null);

  const onPlay = () => {
    playerSoung(banner, song.name, songUrl);
  };

  useEffect(() => {
    db.collection("albums")
      .doc(song.album)
      .get()
      .then((res) => {
        const albumTemp = res.data();
        albumTemp.id = res.id;
        setAlbum(albumTemp);
        getImage(albumTemp);
        getsong(song);
      });
  }, [song]);

  const getImage = (album) => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBanner(url);
      });
  };
  const getsong = (song) => {
    firebase
      .storage()
      .ref(`song/${song.filename}`)
      .getDownloadURL()
      .then((url) => {
        setSongUrl(url);
      });
  };

  return (
    <div className="o-songs-slider__list-song">
      <div
        className="o-avatar "
        style={{ backgroundImage: `url("${banner}")` }}
        onClick={onPlay}
      >
        <Icon name="play circle outline" />
      </div>
      <Link to={`/album/${album?.id}`}>
        <h3>{song.name} </h3>
      </Link>
    </div>
  );
}
export default function SongsSlider({ title, data, playerSoung }) {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    slidesToshow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: "o-songs-slider__list",
  };

  if (data.length < 1) {
    return null;
  } else if (data.length < 5) {
    return (
      <div className="o-songs-slider">
        <h2>{title}</h2>
        <div className="o-songs-slider__no-slide">
          {data.map((song) => (
            <Song key={song.id} song={song} playerSoung={playerSoung} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="o-songs-slider">
        <h2>{title}</h2>
        <Slider {...settings}>
          {data.map((song) => (
            <Song key={song.id} song={song} playerSoung={playerSoung} />
          ))}
        </Slider>
      </div>
    );
  }
}
