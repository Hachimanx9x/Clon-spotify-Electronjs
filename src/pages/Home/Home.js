import React, { useEffect, useState } from "react";
import { map } from "lodash";
import Bannerhome from "../../components/Bannerhome/Bannerhome";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";
import SongsSlider from "../../components/Sliders/SongsSlider";
import firebase from "../../utils/firebase";
import alertErrors from "../../utils/alertErrors";
import "firebase/firestore";

import "./Home.scss";
const db = firebase.firestore(firebase);
export default function Home({ playerSoung }) {
  //console.log(playerSoung);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  //artists
  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const arrArtists = [];
        map(response?.docs, (artist) => {
          let data = artist.data();
          data.id = artist.id;
          arrArtists.push(data);
        });
        setArtists(arrArtists);
      });
  }, []);
  //albums
  useEffect(() => {
    db.collection("albums")
      .get()
      .then((response) => {
        const arrAlbums = [];
        response?.docs.map((ele) => {
          const data = ele.data();
          data.id = ele.id;
          arrAlbums.push(data);
        });

        setAlbums(arrAlbums);
      })
      .catch((err) => {
        alertErrors(err?.code);
      });
  }, []);
  //songs
  useEffect(() => {
    db.collection("songs")
      .limit(10)
      .get()
      .then((response) => {
        const arrSongs = [];
        response?.docs.map((song) => {
          const data = song.data();
          data.id = song.id;
          arrSongs.push(data);
        });
        setSongs(arrSongs);
      });
  }, []);

  return (
    <>
      <Bannerhome />
      <div className="o-home">
        <BasicSliderItems
          title="Ultimos artistas"
          data={artists}
          folderImage="artist"
          urlName="artist"
        />
        <BasicSliderItems
          title="Ultimos álbumes"
          data={albums}
          folderImage="album"
          urlName="album"
        />
        <SongsSlider
          title="Ultimas canciónes"
          data={songs}
          playerSoung={playerSoung}
        />
      </div>
    </>
  );
}
