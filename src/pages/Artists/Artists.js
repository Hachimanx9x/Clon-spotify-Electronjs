import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import "./Artists.scss";

const db = firebase.firestore(firebase);

function Artist({ artist }) {
  const [banner, setBanner] = useState(null);
  useEffect(() => {
    firebase
      .storage()
      .ref(`artist/${artist.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBanner(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [artist]);
  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="o-artists__item">
        <div
          className="o-avatar"
          style={{ backgroundImage: `url('${banner}')` }}
        />
        <h3>{artist.name}</h3>
      </div>
    </Link>
  );
}

export default function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        let arr = [];

        map(response?.docs, (artist) => {
          const data = artist.data();
          data.id = artist.id;
          arr.push(data);
        });

        setArtists(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="o-artists">
      <h1>ARTISTAS</h1>
      <Grid>
        {map(artists, (artist) => (
          <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
            <Artist artist={artist} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}
