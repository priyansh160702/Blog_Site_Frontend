import { useEffect } from "react";
import { Link, useLocation, useRouteLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Avatar } from "flowbite-react";

import useAuthentication from "../util/hooks/use-authentication";
import { modalActions } from "../redux/store";

const Navbar = ({ isErrorPage }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const { isAuthenticated, updateAuthState } = useAuthentication();

  const user = useRouteLoaderData("root")?.user;

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    updateAuthState();
  }, [location]);

  const path = location.pathname;

  const showAuth =
    path !== "/login" && path !== "/create-account" && !isAuthenticated;

  const writeBlogHandler = () => {
    dispatch(modalActions.showModal("createBlog"));
  };

  const userModalHandler = () => {
    dispatch(modalActions.showModal("user"));
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
        {!isErrorPage && isAuthenticated && (
          <div className="flex justify-center items-center space-x-5">
            <button
              onClick={writeBlogHandler}
              className="flex items-center space-x-1"
            >
              <FontAwesomeIcon icon={faPen} />
              <span>Write</span>
            </button>
            {/* <button onClick={logoutHandler}>Logout</button> */}
            <button onClick={userModalHandler}>
              <Avatar
                img={
                  user.profilePhoto ? `${api_url}/${user.profilePhoto}` : null
                }
                rounded
                className="hover:cursor-pointer"
              />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
