import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4">
      <div className="container flex justify-between items-center">
        <Link to="/">
          <h1 className="font-semibold text-2xl">Nest-Level Blogs</h1>
        </Link>
        <div>
          <div className="flex space-x-2 items-center">
            <Link to="login" className="auth-btn">
              Log in
            </Link>
            <Link to="signup" className="auth-btn bg-black text-white ">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
