import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { modalActions } from "../../redux/store";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updateAuthState = () => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  };

  // Auto Logout
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // exp is in seconds, convert to ms
      const currentTime = Date.now();
      const remainingTime = expirationTime - currentTime;

      if (remainingTime > 0) {
        const timeoutId = setTimeout(() => {
          navigate("/");
          dispatch(modalActions.showModal("sessionTimeout"));
          logout();
        }, remainingTime);

        return () => clearTimeout(timeoutId);
      } else {
        navigate("/");
        dispatch(modalActions.showModal("sessionTimeout"));
        logout();
      }
    }
  }, [isAuthenticated]);

  const logout = () => {
    localStorage.removeItem("token");
    updateAuthState();
  };

  return { isAuthenticated, updateAuthState, logout };
};

export default useAuthentication;
