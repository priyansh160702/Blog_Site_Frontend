import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import useLogout from "../util/hooks/use-logout";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const location = useLocation();

  const updateAuthState = () => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    updateAuthState();
  }, [location]);

  const logout = useLogout(updateAuthState);

  const path = location.pathname;

  const showAuth =
    path !== "/login" && path !== "/create-account" && !isAuthenticated;

  const showLogout =
    path !== "/login" && path !== "/create-account" && isAuthenticated;

  return (
    <nav className="py-4 mb-7">
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

        {showLogout && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
