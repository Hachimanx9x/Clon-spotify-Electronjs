import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import alertErrors from "../../../utils/alertErrors";
//firebase
import firebase from "../../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
//
import { Form, Input, Button, Icon, Dropdown } from "semantic-ui-react";
import { toast } from "react-toastify";
import "./AddSongForm.scss";

//data base

const db = firebase.firestore(firebase);
export default function AddSongForm({ setShowModal }) {
  const [albums, setAlbums] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ name: "", album: "" });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    db.collection("albums")
      .get()
      .then((res) => {
        let arrtempAlbums = [];
        res?.docs.map((album) => {
          const data = album.data();

          arrtempAlbums.push({
            key: album.id,
            value: album.id,
            text: data.name,
          });
        });
        setAlbums(arrtempAlbums);
      });
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    try {
    } catch (err) {}
    setFile(acceptedFiles[0]);

    //  setAlbumimage(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".mp3",
    noKeyboard: true,
    onDrop: onDrop,
  });

  const uploadSong = (filename) =>
    firebase.storage().ref().child(`song/${filename}`).put(file);

  const onSubmit = () => {
    if (!formData.name || !formData.album) {
      toast.warning(
        "El nombre de la cancio o el album al que pertenecen son obligatorios"
      );
    } else if (!file) {
      toast.warning("La canción es obligatoria");
    } else {
      setIsLoading(true);
      const filename = uuid();
      uploadSong(filename)
        .then(() => {
          db.collection("songs")
            .add({
              name: formData.name,
              album: formData.album,
              filename: filename,
            })
            .then(() => {
              toast.success("Canción guardada");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })
            .catch((err) => {
              alertErrors(err?.code);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          alertErrors(err?.code);
          setIsLoading(false);
        });
    }
  };
  const resetForm = () => {
    setFormData({ name: "", album: "" });
    setFile(null);
    setAlbums([]);
  };
  return (
    <Form className="o-add-song-form" onSubmit={onSubmit}>
      <Form.Field>
        <input
          placeholder="nombre de la canción"
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="Asigna la canción a un album"
          search
          selection
          lazyLoad
          options={albums}
          onChange={(e, data) => {
            setFormData({ ...formData, album: data.value });
          }}
        />
      </Form.Field>
      <Form.Field>
        <div className="o-song-upload" {...getRootProps()}>
          <input {...getInputProps()} />
          <Icon name="cloud upload" className={file && "o-load"} />
          <div>
            <p>
              {" "}
              Arratra la canción o haz click <span>aquí</span>
            </p>
            {file && (
              <p>
                Canción subida: <span>{file.name}</span>
              </p>
            )}
          </div>
        </div>
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        {" "}
        Subir Canción
      </Button>
    </Form>
  );
}
