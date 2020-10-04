import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./nav.css";

function Nav() {
  const [showReset, setShowReset] = useState(false);

  const toggle = () => {
    setShowReset(!showReset);
  };

  const reset = () => {
    localStorage.setItem("players", []);
    localStorage.setItem("showForm", true);
    localStorage.setItem("totalScore", []);
    window.location = "/";
  };

  return (
    <div className="title">
      <button
        className="btn btn-primary col-2 w-100"
        onClick={() => {
          alert("cal");
        }}
      >
        calc
      </button>
      <button
        className="btn btn-danger col-2 w-100"
        onClick={() => {
          toggle();
        }}
      >
        Reset
      </button>
      <Modal isOpen={showReset} toggle={toggle}>
        <ModalBody>
          You are going to reset the calculator. You may lose your data. Do you
          want to reset?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={reset}>
            yes
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Nav;
