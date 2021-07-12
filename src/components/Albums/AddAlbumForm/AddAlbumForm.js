import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import alertErrors from "../../../utils/alertErrors";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
//firebase
import firebase from "../../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";

//scss
import "./AddAlbumForm.scss";
import defaultImage from "../../../assets/png/no-image.png";

const db = firebase.firestore(firebase);
export default function AddAlbumForm({ setShowModal }) {
  const [albumimage, setAlbumimage] = useState(null);
  const [formData, setFormData] = useState({ name: "", artist: "" });
  const [file, setFile] = useState(null);
  const [artists, setArtists] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const tempArtists = [];
        response.docs.map((artist) => {
          const data = artist.data();
          tempArtists.push({
            key: artist.id,
            value: artist.id,
            text: data.name,
          });
        });
        setArtists(tempArtists);
      })
      .catch((err) => {
        alertErrors(err?.code);
      });
  }, []);
  const onDrop = useCallback((acceptedFiles) => {
    try {
    } catch (err) {}
    setFile(acceptedFiles[0]);

    setAlbumimage(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg , image/png, image/svg, image/gif",
    noKeyboard: true,
    onDrop: onDrop,
  });

  const uploadImage = (filename) =>
    firebase.storage().ref().child(`album/${filename}`).put(file);

  const onSubmit = () => {
    if (!formData.name || !formData.artist) {
      toast.warning("El nombre del album y el artista son obligatorios.");
    } else if (!file) {
      toast.warning("Laimagen del album es obligatoria.");
    } else {
      setIsLoading(true);
      const filename = uuid();
      uploadImage(filename)
        .then(() => {
          db.collection("albums")
            .add({
              name: formData.name,
              artist: formData.artist,
              banner: filename,
            })
            .then(() => {
              toast.success("Album guardado");
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
    setFormData({ name: "", artist: "" });
    setFile(null);
    setAlbumimage(null);
  };
  return (
    <Form className="o-add-album-from" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Field className="o-album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="o-avatar"
            style={{ backgroundImage: `url('${albumimage}')` }}
          />
          <input {...getInputProps()} />
          {!albumimage && <Image src={defaultImage} />}
        </Form.Field>
        <Form.Field className="o-album-inputs" width={11}>
          <Input
            placeholder="Nombre del album"
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <Dropdown
            placeholder="El album pertence ..."
            fluid
            search
            selection
            options={artists}
            lazyLoad
            onChange={(e, data) => {
              setFormData({ ...formData, artist: data.value });
            }}
          />
        </Form.Field>
      </Form.Group>
      <Button type="submit" loading={isLoading}>
        Crear Album
      </Button>
    </Form>
  );
}
