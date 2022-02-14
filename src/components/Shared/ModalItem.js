import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
export default function ModalItem({ signIn, nearNum, btnVariant }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant={btnVariant} onClick={handleShow} className="p-2 mx-2">
        Donate with {nearNum} Near
      </Button>

      <Modal show={show} onHide={handleClose} className="font-link">
        <Modal.Header closeButton>
          <Modal.Title>Sign up reqired</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          In order to fund a project, please sign in first the come back again!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={signIn}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
