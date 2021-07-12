import React from "react";

import { Modal, Icon } from "semantic-ui-react";
import "./BasicModal.scss";
export default function BasicModal({ show, setShow, title, children }) {
  const onClose = () => {
    setShow(false);
  };
  return (
    <Modal open={show} onClose={onClose} className="o-basic-modal" size="tiny">
      <Modal.Header>
        <h3>{title}</h3>
        <Icon name="close" onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
