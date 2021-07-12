import React, { useCallback, useState } from "react";
import { Form, Input, Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import firebase from "../../../utils/firebase";
import alertErrors from "../../../utils/alertErrors";
import "firebase/storage";
import "firebase/firestore";
import defaultImage from "../../../assets/png/no-image.png";

import "./AddArtistsForm.scss";
export default function AddArtistsForm({ setShowModal }) {
  const [banner, setBanner] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState(null);
  const db = firebase.firestore(firebase);
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setBanner(URL.createObjectURL(acceptedFiles[0]));
  });
  const uploadImage = (filename) => {
    const ref = firebase.storage().ref().child(`artist/${filename}`);

    return ref.put(file);
  };

  const resetForm = () => {
    setFormData({ name: "" });
    setFile(null);
    setBanner(null);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg , image/png, image/svg, image/gif",
    noKeyboard: true,
    onDrop,
  });
  const onSubmit = () => {
    if (!formData.name) {
      toast.warning("Añade el nombre del artista");
    } else if (!file) {
      toast.warning("Añade la imagen del artista");
    } else {
      setIsLoading(true);
      const filename = uuidv4();
      uploadImage(filename)
        .then(() => {
          db.collection("artists")
            .add({ name: formData.name, banner: filename })
            .then(() => {
              toast.success("Artista agregado");
              resetForm();
              setShowModal(false);
              setIsLoading(false);
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
    // setShowModal(false);
  };
  return (
    <>
      <Form className="o-add-artist-form" onSubmit={onSubmit}>
        <Form.Field className="o-artist-banner">
          <div className="o-banner o-bg-img" {...getRootProps()} />
          <input {...getInputProps()} />
          {!banner && <Image src={defaultImage} />}
        </Form.Field>
        <Form.Field className="o-artist-avatar">
          <div className="o-avatar o-bg-img-avatar"></div>
        </Form.Field>
        <Form.Field className="o-artist-name">
          <Input
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            placeholder="Nombre del artista"
          />
        </Form.Field>
        <Button circular type="submit" loading={isLoading}>
          Crear artista
        </Button>
      </Form>
      <style jsx>{`
        .o-bg-img {
          background-image: url("${banner}");
        }
        .o-bg-img-avatar {
          background-image: url("${banner ? banner : defaultImage}");
        }
      `}</style>
    </>
  );
}
