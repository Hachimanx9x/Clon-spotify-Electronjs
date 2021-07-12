import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../utils/Api";
import alertError from "../../utils/alertErrors";
import firebase from "../../utils/firebase";
import "firebase/auth";

function ChangeDisplayPasswordForm({ setShow }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState({
    pass1: false,
    pass2: false,
    pass3: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const onsubmit = () => {
    setIsLoading(true);

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.repeatPassword
    ) {
      toast.warning("Campos vacio. ");
      setIsLoading(false);
    } else if (formData.currentPassword === formData.newPassword) {
      toast.warning("La contraseñas nueva es igual a la actual.");
      setIsLoading(false);
    } else if (formData.newPassword !== formData.repeatPassword) {
      toast.warning("La contraseñas nuevas no son iguales. ");
      setIsLoading(false);
    } else if (formData.newPassword.length < 6) {
      toast.warning("La contraseñas nueva tiene que tener minimo 6 caracteres");
      setIsLoading(false);
    } else {
      reauthenticate(formData.currentPassword)
        .then(() => {
          firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              toast.success("Contraseña actualizada");
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
          type={showPass.pass1 ? "text" : "password"}
          placeholder="Contraseña actual"
          onChange={(e) => {
            setFormData({ ...formData, currentPassword: e.target.value });
          }}
          icon={
            showPass.pass1 ? (
              <Icon
                name="eye slash outline"
                link
                onClick={() => {
                  setShowPass({ ...showPass, pass1: !showPass.pass1 });
                }}
              />
            ) : (
              <Icon
                name="eye"
                link
                onClick={() => {
                  setShowPass({ ...showPass, pass1: !showPass.pass1 });
                }}
              />
            )
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPass.pass2 ? "text" : "password"}
          placeholder="Contraseña nueva"
          onChange={(e) => {
            setFormData({ ...formData, newPassword: e.target.value });
          }}
          icon={
            showPass.pass2 ? (
              <Icon
                name="eye slash outline"
                link
                onClick={() => {
                  setShowPass({ ...showPass, pass2: !showPass.pass2 });
                }}
              />
            ) : (
              <Icon
                name="eye"
                link
                onClick={() => {
                  setShowPass({ ...showPass, pass2: !showPass.pass2 });
                }}
              />
            )
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPass.pass3 ? "text" : "password"}
          placeholder="Repetir contraseña nueva"
          onChange={(e) => {
            setFormData({ ...formData, repeatPassword: e.target.value });
          }}
          icon={
            showPass.pass3 ? (
              <Icon
                name="eye slash outline"
                link
                onClick={() => {
                  setShowPass({ ...showPass, pass3: !showPass.pass3 });
                }}
              />
            ) : (
              <Icon
                name="eye"
                link
                onClick={() => {
                  setShowPass({ ...showPass, pass3: !showPass.pass3 });
                }}
              />
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
export default function UserPassword({
  className,
  setShow,
  setTitleModal,
  setContentModal,
}) {
  const onEdit = () => {
    setTitleModal("Actualizar contraseña");
    setContentModal(<ChangeDisplayPasswordForm setShow={setShow} />);
    setShow(true);
  };
  return (
    <div className={className}>
      <h3>contraseña: *** *** *** </h3>
      <Button circular onClick={onEdit}>
        Actualizar{" "}
      </Button>
    </div>
  );
}
