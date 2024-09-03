import { useEffect } from "react";
import AuthForm from "../components/AuthForm";
import useAuthentication from "../util/hooks/use-authentication";
import { json } from "react-router-dom";

const PasswordRecoveryPage = () => {
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (isAuthenticated) {
      throw json({ message: "Forbidden" }, { status: 400 });
    }
  }, [isAuthenticated]);

  return (
    <AuthForm
      title="Password Recovery"
      passwordRecovery={true}
      btnTitle="Send Reset Link"
    />
  );
};

export default PasswordRecoveryPage;
