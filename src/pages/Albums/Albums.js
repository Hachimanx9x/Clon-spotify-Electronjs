import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//utils
import alertErrors from "../../utils/alertErrors";
import firebase from "../../utils/firebase";
import "firebase/firestore";
//css
import { Grid } from "semantic-ui-react";
import "./Albums.scss";
//data base
const db = firebase.firestore(firebase);

function Album({ album }) {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [album]);
  return (
    <Link to={`/album/${album.id}`}>
      <div className="o-albums__item">
        <div
          className="o-avatar"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <h3>{album.name}</h3>
      </div>
    </Link>
  );
}

export default function Albums() {
  const [albums, setAlbums] = useState([]);
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
  return (
    <div className="o-albums">
      <h1>Álbumes</h1>
      <Grid>
        {albums.map((album) => (
          <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
            <Album album={album} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}
