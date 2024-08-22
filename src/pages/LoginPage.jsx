import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordStateHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="container">
      <div className="mx-auto w-[35rem] shadow-xl px-11 py-5">
        <h1 className="mb-3 text-4xl font-semibold">Login</h1>
        <h2>
          Don't have an account?{" "}
          <Link className="text-blue-800 underline" to="/create-account">
            Signup
          </Link>
        </h2>
        <form noValidate>
          <div className="form-content">
            <input type="email" placeholder="Email" />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full"
              />
              <button
                type="button"
                className="password-btn"
                onClick={passwordStateHandler}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="mx-auto flex btn-black">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
