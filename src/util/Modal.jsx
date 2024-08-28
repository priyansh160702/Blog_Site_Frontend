import { Fragment } from "react";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";

import { modalActions } from "../redux/store";

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div>{props.children}</div>
    </div>
  );
};

const Backdrop = () => {
  const dispatch = useDispatch();

  const backdropClickHandler = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <div
      id="backdrop"
      className="backdrop"
      onClick={backdropClickHandler}
    ></div>
  );
};

const port = document.getElementById("modal");

const Modal = (props) => {
  return (
    <Fragment>
      {props.backdrop && ReactDom.createPortal(<Backdrop />, port)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        port
      )}
    </Fragment>
  );
};

export default Modal;
