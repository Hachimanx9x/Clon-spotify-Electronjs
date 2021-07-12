import React from "react";
import { Button } from "semantic-ui-react";
import "./AutOptions.scss";
export default function AutOptions({ setSelectedForm }) {
  return (
    <>
      {" "}
      <div className="o-auth-options">
        <h2>Millones de canciones, gratis aqui</h2>
        <Button
          className="o-register"
          onClick={() => {
            setSelectedForm("register");
          }}
        >
          Registrate Gratis
        </Button>
        <Button
          className="o-login"
          onClick={() => {
            setSelectedForm("login");
          }}
        >
          Iniciar sesión
        </Button>
      </div>
    </>
  );
}
