import { useDispatch } from "react-redux";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";

import Modal from "../util/Modal";
import useAuthentication from "../util/hooks/use-authentication";
import { modalActions } from "../redux/store";

const UserModal = () => {
  const { logout } = useAuthentication();

  const { user } = useRouteLoaderData("root");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    closeModalHandler();
    navigate("/");
  };

  const closeModalHandler = () => {
    dispatch(modalActions.hideModal("user"));
  };

  return (
    <Modal
      className="shadow-2xl rounded-md right-[0.5rem] md:right-[2rem] w-[13rem]"
      hideModal="user"
    >
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col items-center space-y-1 border-b border-gray-400 pb-3 w-full">
          <h1>{user?.name}</h1>
          <h1>{user?.email}</h1>
        </div>
        <div className="flex flex-col space-y-5 pt-3">
          <Link to="/me" onClick={closeModalHandler}>
            My Profile
          </Link>
          <Link to="/my-blogs" onClick={closeModalHandler}>
            My Blogs
          </Link>
          <button className="w-full" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
