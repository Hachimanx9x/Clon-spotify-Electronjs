import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../utils/Api";
import alertError from "../../utils/alertErrors";
import firebase from "../../utils/firebase";
import "firebase/auth";

function ChangeDisplayEmailForm({ email, setShow }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: email, password: "" });
  const handlerShowPass = () => {
    setShowPass(!showPass);
  };
  const onsubmit = () => {
    console.log(formData);
    if (!formData.email) {
      toast.warning("Campo de email basio");
    } else if (!formData.password) {
      toast.warning("Campo de contraseña basio");
    } else if (formData.email === email) {
      setShow(false);
    } else {
      setIsLoading(true);
      //  console.log(formData);
      reauthenticate(formData.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(formData.email)
            .then(() => {
              toast.success("Email actualizado");
              setIsLoading(false);
              setShow(false);
              firebase
                .auth()
                .currentUser.sendEmailVerification()
                .then(() => {
                  firebase.auth().signOut();
                });
            })
            .catch((err) => {
              alertError(err?.code);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          alertError(err?.code);
          setIsLoading(false);
        });
    }
  };
  return (
    <Form onSubmit={onsubmit}>
      <Form.Field>
        <Input
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          defaultValue={email}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Contraseña"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          icon={
            showPass ? (
              <Icon name="eye slash outline" link onClick={handlerShowPass} />
            ) : (
              <Icon name="eye" link onClick={handlerShowPass} />
            )
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar email
      </Button>
    </Form>
  );
}

export default function Useremail({
  user,
  className,
  setShow,
  setTitleModal,
  setContentModal,
}) {
  const onEdit = () => {
    setTitleModal("Actualizar email");
    setContentModal(
      <ChangeDisplayEmailForm email={user.email} setShow={setShow} />
    );
    setShow(true);
  };
  return (
    <div className={className}>
      <h3>Email : {user.email}</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}
