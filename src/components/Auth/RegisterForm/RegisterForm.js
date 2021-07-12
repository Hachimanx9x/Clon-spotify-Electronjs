import React, { useState } from "react";
import "./RegisterForm.scss";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../../utils/firebase";
import { validateEmail } from "../../../utils/Validations";
import "firebase/auth"; //firebase authentication

export default function RegisterForm({ setSelectedForm }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  //displays the password
  const [showPass, setShowPass] = useState(false);
  const [formerror, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handlerShowPass = () => {
    setShowPass(!showPass);
  };

  const onChange = (event) => {
    setFormData({
      ...formData, // we take the current value
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;
    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 5) {
      errors.password = true;
      formOk = false;
    }
    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }
    setFormError(errors);
    if (formOk) {
      setIsLoading(true);

      await firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          toast.success("Registro completado");
          changeUserName();
          sendVerificationEmail();
          //console.log("registro completado");
        })
        .catch((error) => {
          toast.error("Error al crear la cuenta");
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
          setSelectedForm(null);
        });
    }
  };

  const changeUserName = async () => {
    await firebase
      .auth()
      .currentUser.updateProfile({
        displayName: formData.username,
      })
      .catch((err) => {
        toast.error("Error al asignar el nomde de usuario");
        console.log(err);
      });
  };

  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado un email de verificacion.");
      })
      .catch((err) => {
        toast.error("Error al enviar el email de verificacion");
      });
  };
  return (
    <>
      <div className="o-register-form">
        <h1>Empieza a excuchar con una cuenta de Musicfy gratis.</h1>
        <Form onChange={onChange} onSubmit={onSubmit}>
          <Form.Field>
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              icon="mail outline"
              error={formerror.email}
            />
            {formerror.email && (
              <span className="error-text">
                Por favor, introdusca un correo valido.
              </span>
            )}
          </Form.Field>
          <Form.Field>
            <Input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              icon={
                showPass ? (
                  <Icon
                    name="eye slash outline"
                    link
                    onClick={handlerShowPass}
                  />
                ) : (
                  <Icon name="eye" link onClick={handlerShowPass} />
                )
              }
              error={formerror.password}
            />
            {formerror.password && (
              <span className="error-text">
                Por favor, elige una contraseña superior a 5 caracteres
              </span>
            )}
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              name="username"
              placeholder="¿Como te llamas?"
              icon="user circle outline"
              error={formerror.username}
            />
            {formerror.username && (
              <span className="error-text">
                Por favor, introdusca un nombre
              </span>
            )}
          </Form.Field>
          <Button type="submit" loading={isLoading}>
            Continuar
          </Button>
        </Form>
        <div className="o-register-form__options">
          <p
            onClick={() => {
              setSelectedForm(null);
            }}
          >
            Volver
          </p>
          <p>
            ¿Ya tienes Musify?
            <span
              onClick={() => {
                setSelectedForm("login");
              }}
            >
              Iniciar sesión
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
