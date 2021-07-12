import { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import AddArtistsForm from "../Artists/AddArtistsForm";
import AddAlbumForm from "../Albums/AddAlbumForm";
import AddSongForm from "../Songs/AddSongForm/AddSongForm";
import BasicModal from "../Modal/BasicModal";
import { isUserAdmin } from "../../utils/Api";

import "./MenuLeft.scss";

function MenuLeft({ user, location, history }) {
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  const handelrModal = (type) => {
    switch (type) {
      case "artist":
        setTitleModal("Nuevo artista");
        setContentModal(<AddArtistsForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "song":
        setTitleModal("Nueva canción");
        setContentModal(<AddSongForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "album":
        setTitleModal("Nueva album");
        setContentModal(<AddAlbumForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      default:
        setTitleModal(null);
        setContentModal(null);
        setShowModal(false);
        break;
    }
  };

  useEffect(() => {
    isUserAdmin(user.uid).then((response) => {
      setUserAdmin(response.exists);
    });
  }, [user]);

  return (
    <>
      <Menu className="o-menu-left" vertical>
        <div className="o-top">
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeMenu === "/"}
            onClick={handlerMenu}
          >
            <Icon name="home" /> Inicio
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/artists"
            name="artists"
            active={activeMenu === "/artists"}
            onClick={handlerMenu}
          >
            <Icon name="user" /> Artistas
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/albums"
            name="albums"
            active={activeMenu === "/albums"}
            onClick={handlerMenu}
          >
            <Icon name="window maximize outline" /> Álbumes
          </Menu.Item>
        </div>{" "}
        {userAdmin && (
          <div className="o-footer">
            <Menu.Item
              onClick={() => {
                handelrModal("artist");
              }}
            >
              <Icon name="plus square outline" /> Nuevo artista
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                handelrModal("album");
              }}
            >
              <Icon name="plus square outline" /> Nuevo album
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                handelrModal("song");
              }}
            >
              <Icon name="plus square outline" /> Nueva canción
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal title={titleModal} show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

export default withRouter(MenuLeft);
