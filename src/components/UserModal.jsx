import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Modal from "../util/Modal";
import useAuthentication from "../util/hooks/use-authentication";
import { modalActions } from "../redux/store";

const UserModal = () => {
  const { logout } = useAuthentication();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    dispatch(modalActions.hideModal("user"));
    navigate("/");
  };

  return (
    <Modal className="shadow-2xl rounded-md top-[4rem] right-[2rem] w-[13rem]">
      <div className="flex flex-col justify-between items-center space-y-5">
        <Link>Settings</Link>
        <button className="w-full" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </Modal>
  );
};

export default UserModal;
