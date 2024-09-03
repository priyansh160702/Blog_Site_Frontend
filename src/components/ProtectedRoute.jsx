import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuthentication from "../util/hooks/use-authentication";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthentication();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;
