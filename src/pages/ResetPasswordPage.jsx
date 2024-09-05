import { Fragment, useEffect } from "react";
import { json, useNavigation } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import useAuthentication from "../util/hooks/use-authentication";
import LoadingSpinner from "../components/LoadingSpinner";

const ResetPasswordPage = () => {
  const { isAuthenticated } = useAuthentication();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (isAuthenticated) {
      throw json({ message: "Forbidden" }, { status: 400 });
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      {isSubmitting ? (
        <LoadingSpinner />
      ) : (
        <AuthForm
          title="Reset Password"
          btnTitle="Reset"
          resetPassword={true}
        />
      )}
    </Fragment>
  );
};

export default ResetPasswordPage;
