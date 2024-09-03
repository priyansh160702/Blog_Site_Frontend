import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

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
        setTimeout(() => {
          logout();
          navigate("/");
          window.alert("Your session timed out!");
        }, remainingTime);
      } else {
        logout();
        navigate("/");
        window.alert("Your session timed out!");
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
