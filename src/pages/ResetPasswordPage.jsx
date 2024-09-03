import { useEffect } from "react";
import { json, useParams } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import useAuthentication from "../util/hooks/use-authentication";

const ResetPasswordPage = () => {
  const { isAuthenticated } = useAuthentication();

  const { resetToken } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      throw json({ message: "Forbidden" }, { status: 400 });
    }
  }, [isAuthenticated]);

  return (
    <AuthForm title="Reset Password" btnTitle="Reset" resetPassword={true} />
  );
};

export default ResetPasswordPage;
