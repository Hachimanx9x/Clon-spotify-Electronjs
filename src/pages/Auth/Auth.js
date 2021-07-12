import React, { useState } from "react";
import AuthOptions from "../../components/Auth/AuthOptions";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";

import BackgroundApp from "../../assets/jpg/background-auth.jpg";
import LogoNAmeWhite from "../../assets/png/logo-name-white.png";

import "./Auth.scss";
export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(null);

  const handlerForm = () => {
    // console.log(selectedForm);
    switch (selectedForm) {
      case "login":
        return <LoginForm setSelectedForm={setSelectedForm} />;

      case "register":
        return <RegisterForm setSelectedForm={setSelectedForm} />;
      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />;
    }
  };
  return (
    <>
      <div className="o-auth o-bg-auth">
        <div className="o-auth__dark" />
        <div className="o-auth__box">
          <div className="o-auth__box-logo">
            <img src={LogoNAmeWhite} alt="Clon-logo" />
          </div>
          {handlerForm()}
        </div>
      </div>
      <style jsx>{`
        .o-bg-auth {
          background-image: url(${BackgroundApp});
        }
      `}</style>
    </>
  );
}
