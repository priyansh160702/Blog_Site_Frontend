import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const path = location.pathname;

  const showAuth = path !== "/login" && path !== "/create-account";

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
      </div>
    </nav>
  );
};

export default Navbar;
