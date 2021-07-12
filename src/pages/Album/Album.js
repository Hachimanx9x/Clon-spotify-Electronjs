import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
//
import ListSongs from "../../components/Songs/ListSongs";
//firebase
import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";

//scss
import { Loader } from "semantic-ui-react";
import "./Album.scss";
//data base
const db = firebase.firestore(firebase);
//
function HeaderAlbum({ album, artist, albumImg }) {
  return (
    <>
      <div
        className="o-image"
        style={{
          backgroundImage: `url("${albumImg}")`,
        }}
      />
      <div className="o-info">
        <h1>{album.name}</h1>
        <p>
          De{" "}
          <span>
            <Link to={`/artist/${album.artist}`}>{artist.name}</Link>
          </span>
        </p>
      </div>
    </>
  );
}

function Album({ match, playerSoung }) {
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState(null);
  const [albumImg, setAlbumImg] = useState(null);
  const [songs, setSongs] = useState([]);

  //album
  useEffect(() => {
    db.collection("albums")
      .doc(match?.params?.id)
      .get()
      .then((res) => {
        const data = res.data();
        data.id = res.id;
        setAlbum(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match]);
  //album banner
  useEffect(() => {
    if (album) {
      firebase
        .storage()
        .ref(`album/${album?.banner}`)
        .getDownloadURL()
        .then((url) => {
          setAlbumImg(url);
        });
    }
  }, [album]);
  //album artist
  useEffect(() => {
    if (album) {
      db.collection("artists")
        .doc(album.artist)
        .get()
        .then((res) => {
          const data = res.data();
          data.id = res.id;
          setArtist(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [album]);
  //songs
  useEffect(() => {
    if (album) {
      db.collection("songs")
        .where("album", "==", album.id)
        .get()
        .then((res) => {
          const arrSongs = [];
          res?.docs.map((song) => {
            const data = song.data();
            data.id = song.id;
            arrSongs.push(data);
          });
          setSongs(arrSongs);
        });
    }
  }, [album]);

  if (!album || !artist || !albumImg) {
    return <Loader active>Cargando ...</Loader>;
  } else {
    return (
      <div className="o-album">
        <div className="o-album__header">
          <HeaderAlbum album={album} artist={artist} albumImg={albumImg} />
        </div>
        <div className="o-album__songs">
          <ListSongs
            songs={songs}
            albumImg={albumImg}
            playerSoung={playerSoung}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(Album);
