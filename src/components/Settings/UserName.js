import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/firebase";
import "firebase/auth";

function ChangeDisplayNameForm({ displayName, setShow, setReloadApp }) {
  const [formData, setFormData] = useState({ displayName: displayName });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    if (!formData.displayName) {
      toast.error("Campo de nombre basio");
    } else if (formData.displayName === displayName) {
      setShow(false);
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: formData.displayName })
        .then(() => {
          setReloadApp((prev) => !prev);
          toast.success("Nombre Actualizado");
          setShow(false);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error("Error al actualizar el nomre");
          console.log(err);
        });
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          onChange={(e) => setFormData({ displayName: e.target.value })}
          defaultValue={displayName}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar nombre
      </Button>
    </Form>
  );
}

export default function UserName({
  user,
  className,
  setShow,
  setTitleModal,
  setContentModal,
  setReloadApp,
}) {
  const onEdit = () => {
    setTitleModal("Actualizar nombre");
    setContentModal(
      <ChangeDisplayNameForm
        setShow={setShow}
        displayName={user.displayName}
        setReloadApp={setReloadApp}
      />
    );
    setShow(true);
  };
  return (
    <div className={className}>
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}
