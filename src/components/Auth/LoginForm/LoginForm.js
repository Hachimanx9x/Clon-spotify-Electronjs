import React, { useState } from "react";

import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/firebase";
import alertError from "../../../utils/alertErrors";
import "firebase/auth";
import "./LoginForm.scss";

function handlerErrors(code) {
  alertError(code);
}

function ButtonResetSendEmailVerification({
  user,
  setIsLoading,
  setUserActive,
}) {
  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado el email de verificacion");
      })
      .catch((err) => {
        // console.log(err);
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        setUserActive(true);
      });
  };

  return (
    <div className="o-rensed-verification-email">
      <p>
        {" "}
        Si no has recibido el email de verificacion puede volver a enviarlo
        haciendo click <span onClick={resendVerificationEmail}> aqui.</span>
      </p>
    </div>
  );
}
export default function LoginForm({ setSelectedForm }) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);
  const handlerShowPass = () => {
    setShowPass(!showPass);
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = () => {
    //  setFormError({});
    let errors = {};
    let formOk = {};

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 5) {
      errors.password = true;
      formOk = false;
    }
    //   setFormError(errors);
    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          // console.log(response.user.emailVerified);
          setUser(response.user);
          setUserActive(response.user.emailVerified);
          if (!response.user.emailVerified) {
            toast.warning(
              "Para poder entrar antes tienes que verificar el correo."
            );
          }
        })
        .catch((err) => {
          // console.log(err);
          handlerErrors(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="o-login-form">
      <h1>Musica para todos</h1>
      <Form onChange={onChange} onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electrónico"
            icon="mail outline"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
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
          Iniciar sesión
        </Button>
      </Form>
      {!userActive && (
        <ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}
      <div className="o-login-form__options">
        <p
          onClick={() => {
            setSelectedForm(null);
          }}
        >
          Volver
        </p>
        <p>
          ¿No tienes cuenta?{" "}
          <span
            onClick={() => {
              setSelectedForm("register");
            }}
          >
            Registrarse
          </span>
        </p>
      </div>
    </div>
  );
}
