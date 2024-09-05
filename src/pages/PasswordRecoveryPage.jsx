import { Fragment, useEffect, useState } from "react";
import { useNavigation, useActionData } from "react-router-dom";
import { json } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AuthForm from "../components/AuthForm";
import useAuthentication from "../util/hooks/use-authentication";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../util/Modal";

const PasswordRecoveryPage = () => {
  const { isAuthenticated } = useAuthentication();

  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [message, setMessage] = useState();

  const actionData = useActionData();

  useEffect(() => {
    if (actionData && actionData.success) {
      setShowMessagePopup(true);
      setMessage(actionData.message);

      const timer = setTimeout(() => {
        setShowMessagePopup(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [actionData]);

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
        <Fragment>
          <AnimatePresence>
            {showMessagePopup && (
              <Modal className="left-[30%] md:left-[40%] border border-black">
                <div>
                  <h1>{message}</h1>
                </div>
              </Modal>
            )}
          </AnimatePresence>
          <AuthForm
            title="Password Recovery"
            passwordRecovery={true}
            btnTitle="Send Reset Link"
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default PasswordRecoveryPage;
