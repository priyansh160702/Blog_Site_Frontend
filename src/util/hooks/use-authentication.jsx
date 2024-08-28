import { useState } from "react";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const updateAuthState = () => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    updateAuthState();
  };

  return { isAuthenticated, updateAuthState, logout };
};

export default useAuthentication;
