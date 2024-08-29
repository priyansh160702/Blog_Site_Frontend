import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import useAuthentication from "../util/hooks/use-authentication";
import { modalActions } from "../redux/store";

const Navbar = () => {
  const { isAuthenticated, updateAuthState, logout } = useAuthentication();

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    updateAuthState();
  }, [location]);

  const logoutHandler = () => {
    logout();
  };

  const path = location.pathname;

  const showAuth =
    path !== "/login" && path !== "/create-account" && !isAuthenticated;

  const writeBlogHandler = () => {
    dispatch(modalActions.showModal("blog"));
  };

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <Link to="/">
          <h1 className="font-semibold text-2xl">Nest-Level Blogs</h1>
        </Link>
        {showAuth && (
          <div>
            <div className="flex space-x-2 items-center">
              <Link to="login" className="btn-white">
                Log in
              </Link>
              <Link to="create-account" className="btn-black">
                Create Account
              </Link>
            </div>
          </div>
        )}

        {isAuthenticated && (
          <div className="flex space-x-3">
            <button
              onClick={writeBlogHandler}
              className="flex items-center space-x-1"
            >
              <FontAwesomeIcon icon={faPen} />
              <span>Write</span>
            </button>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
