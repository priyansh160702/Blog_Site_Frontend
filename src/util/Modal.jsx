import { Fragment } from "react";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";

import { modalActions } from "../redux/store";

const ModalOverlay = (props) => {
  return (
    <div className={`modal ${props.className}`}>
      <div>{props.children}</div>
    </div>
  );
};

const Backdrop = (props) => {
  const dispatch = useDispatch();

  const backdropClickHandler = () => {
    dispatch(modalActions.hideModal(props.hideModal));
  };

  return (
    <div
      id="backdrop"
      className={props.backdrop ? "bg-[rgba(0,0,0,0.75)]" : ""}
      onClick={backdropClickHandler}
    ></div>
  );
};

const port = document.getElementById("modal");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop backdrop={props.backdrop} hideModal={props.hideModal} />,
        port
      )}
      {ReactDom.createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        port
      )}
    </Fragment>
  );
};

export default Modal;
