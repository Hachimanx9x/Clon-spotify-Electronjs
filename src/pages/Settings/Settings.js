import { useState } from "react";
import UploadAvatar from "../../components/Settings/UploadAvatar";
import UserName from "../../components/Settings/UserName";
import BasicModal from "../../components/Modal/BasicModal";
import Useremail from "../../components/Settings/Useremail";
import UserPassword from "../../components/Settings/UserPassword";
import "./Settings.scss";

export default function Settings({ user, setReloadApp }) {
  const [show, setShow] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);
  return (
    <div className="o-settings">
      <h1>hola soy los settings</h1>
      <div className="o-avatar-name">
        <UploadAvatar
          setReloadApp={setReloadApp}
          user={user}
          className="o-user-avatar"
        />
        <UserName
          user={user}
          setShow={setShow}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          className="o-user-name"
          setReloadApp={setReloadApp}
        />
      </div>
      <Useremail
        user={user}
        setShow={setShow}
        setTitleModal={setTitleModal}
        setContentModal={setContentModal}
        className="o-user-email"
        setReloadApp={setReloadApp}
      />
      <UserPassword
        user={user}
        setShow={setShow}
        setTitleModal={setTitleModal}
        setContentModal={setContentModal}
        className="o-user-password"
      />
      <BasicModal show={show} setShow={setShow} title={titleModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
}
