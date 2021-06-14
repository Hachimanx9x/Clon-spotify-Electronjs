import React, { useState } from "react";
import AuthOptions from "../../components/Auth/AuthOptions";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";

import BackgroundApp from "../../assets/jpg/background-auth.jpg";
import LogoNAmeWhite from "../../assets/png/logo-white.png";
export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(null);

  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      default:
        return <AuthOptions />;
    }
  };
  return (
    <>
      <div className="o-auth o-bg-auth">
        <div className="o-auth__dark" />
        <div className="o-auth__box">
          <div className="o-auth__box-logo">
            <img src={LogoNAmeWhite} alt="" />
          </div>
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
