import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import BannerArtists from "../../components/Artists/BannerArtists";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";
import SongsSlider from "../../components/Sliders/SongsSlider";
import firebase from "../../utils/firebase";
import "firebase/firestore";

import "./Artist.scss";
const db = firebase.firestore(firebase);
function Artist({ match, playerSoung }) {
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songs, setsongs] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .doc(match?.params?.id)
      .get()
      .then((res) => {
        let data = res.data();
        data.id = res.id;
        setArtist(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match]);

  useEffect(() => {
    if (artist) {
      db.collection("albums")
        .where("artist", "==", artist.id)
        .get()
        .then((res) => {
          const arrayAlbum = [];
          res?.docs.map((album) => {
            const data = album.data();
            data.id = album.id;
            arrayAlbum.push(data);
          });

          setAlbums(arrayAlbum);
        });
    }
  }, [artist]);

  useEffect(() => {
    const arraySongs = [];
    (async () => {
      await Promise.all(
        albums.map(async (album) => {
          await db
            .collection("songs")
            .where("album", "==", album.id)
            .get()
            .then((res) => {
              res?.docs.map((song) => {
                const data = song.data();
                data.id = song.id;
                arraySongs.push(data);
              });
            });
        })
      );
      setsongs(arraySongs);
      // console.log(arraySongs);
    })();
  }, [albums]);

  return (
    <div className="o-artist">
      {artist && <BannerArtists artist={artist} />}
      <div className="o-artist__container">
        <BasicSliderItems
          title="Álbumes"
          data={albums}
          folderImage="album"
          urlName="album"
        />
        <SongsSlider title="Canciónes" data={songs} playerSoung={playerSoung} />
      </div>
    </div>
  );
}

export default withRouter(Artist);
