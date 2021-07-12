import { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import firebase from "../../utils/firebase";
import "firebase/storage";
import "firebase/auth";

import NoAvatar from "../../assets/png/user.png";
export default function UploadAvatar({ user, className, setReloadApp }) {
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImage(file).then(() => {
      updateUserAvatar();
    });
  });
  const uploadImage = (file) =>
    firebase.storage().ref().child(`avatar/${user.uid}`).put(file);
  const updateUserAvatar = () => {
    firebase
      .storage()
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then(async (response) => {
        await firebase.auth().currentUser.updateProfile({ photoURL: response });
        setReloadApp((prevState) => !prevState);
      })
      .catch((err) => {
        toast.error("Error al actualizar el avatar.");
        console.log(err);
      });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg , image/png, image/svg, image/gif",
    noKeyboard: true,
    onDrop,
  });
  return (
    <div className={className} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}
