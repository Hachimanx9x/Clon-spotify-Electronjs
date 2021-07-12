import React, { useState, useEffect } from "react";
//
//firebase
import firebase from "../../../utils/firebase";
import "firebase/storage";
//
import { Table, Icon } from "semantic-ui-react";
import "./ListSongs.scss";

const Song = ({ song, albumImg, playerSoung }) => {
  const [songUrl, setSongUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`song/${song.filename}`)
      .getDownloadURL()
      .then((url) => {
        setSongUrl(url);
      });
  }, [song]);
  const onplay = () => {
    playerSoung(albumImg, song.name, songUrl);
  };
  return (
    <Table.Row onClick={onplay}>
      <Table.Cell collapsing>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell>{song.name}</Table.Cell>
    </Table.Row>
  );
};
export default function ListSongs({ songs, albumImg, playerSoung }) {
  return (
    <Table inverted className="o-list-songs">
      {/*header*/}
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Titulo</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {/*body*/}
      <Table.Body>
        {songs.map((song) => (
          <Song
            key={song.id}
            song={song}
            albumImg={albumImg}
            playerSoung={playerSoung}
          />
        ))}
      </Table.Body>
    </Table>
  );
}
