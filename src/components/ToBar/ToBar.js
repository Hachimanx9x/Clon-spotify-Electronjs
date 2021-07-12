import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../utils/firebase";
import "firebase/auth";

import UserImage from "../../assets/png/user.png";
import "./ToBar.scss";
function ToBar({ user, history }) {
  const goBack = () => {
    history.goBack();
  };
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <div className="o-top-bar">
      <div className="o-top-bar__left">
        <Icon name="angle left" onClick={goBack} />
      </div>
      <div className="o-top-bar__right">
        <Link to="/settings">
          <Image src={user.photoURL ? user.photoURL : UserImage} />{" "}
          {user.displayName}
        </Link>
        <Icon name="power off" onClick={logout} />
      </div>
    </div>
  );
}
export default withRouter(ToBar);
