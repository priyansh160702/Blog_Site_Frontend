import { Fragment } from "react";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { modalActions } from "../redux/store";

const ModalOverlay = ({ children, className }) => {
  return (
    <motion.div
      variants={{
        visible: { opacity: 1, y: 60, transition: { type: "spring" } },
        hidden: { opacity: 0, y: -1, transition: { type: "tween" } },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`modal ${className}`}
    >
      <div>{children}</div>
    </motion.div>
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
