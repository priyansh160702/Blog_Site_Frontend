import { useDispatch } from "react-redux";

import Modal from "../util/Modal";
import { modalActions } from "../redux/store";

const SessionTimeOutPopup = () => {
  const dispatch = useDispatch();

  const okHandler = () => {
    dispatch(modalActions.hideModal("sessionTimeout"));
  };

  return (
    <Modal backdrop={true} className="left-[30%] md:left-[40%] w-[15rem]">
      <div className="flex flex-col items-center">
        <h1 className="mb-3 text-xl">Session Timed Out!</h1>
        <button className="btn-black mx-auto" onClick={okHandler}>
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default SessionTimeOutPopup;
