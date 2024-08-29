import { useState, useRef, useEffect, Fragment } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const AuthForm = ({
  title,
  linkDesc,
  link,
  linkTitle,
  newAccount,
  btnTitle,
  passwordRecovery,
  resetPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState(null);
  const [
    incorrectCredentialsErrorMessage,
    setIncorrectCredentialsErrorMessage,
  ] = useState(null);

  const firstNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const errors = useActionData();

  useEffect(() => {
    if (newAccount) {
      firstNameInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!newAccount && !resetPassword) {
      emailInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (resetPassword) {
      passwordInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (errors) {
      if (errors.firstName) {
        setNameErrorMessage(errors.firstName);
      }
      if (errors.email) {
        setEmailErrorMessage(errors.email);
      }
      if (errors.password) {
        setPasswordErrorMessage(errors.password);
      }
      if (errors.confirmPassword) {
        setConfirmPasswordErrorMessage(errors.confirmPassword);
      }
      if (errors.incorrectCredentials) {
        setIncorrectCredentialsErrorMessage(errors.incorrectCredentials);
      }
    }
  }, [errors]);

  const passwordStateHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const confirmPasswordStateHandler = () => {
    setShowConfirmPassword((confirmPassword) => !confirmPassword);
  };

  const nameChangeHandler = () => {
    setNameErrorMessage(null);
  };

  const emailChangeHandler = () => {
    setEmailErrorMessage(null);
    setIncorrectCredentialsErrorMessage(null);
  };

  const passwordChangeHandler = () => {
    setPasswordErrorMessage(null);
    setIncorrectCredentialsErrorMessage(null);
  };

  const confirmPasswordChangeHandler = () => {
    setConfirmPasswordErrorMessage(null);
  };

  return (
    <div className="container">
      <div className="mx-auto w-[35rem] shadow-xl px-11 py-5">
        <h1 className="title">{title}</h1>
        {!passwordRecovery && !resetPassword && (
          <h2>
            {linkDesc}?{" "}
            <Link className="text-blue-800 underline" to={`/${link}`}>
              {linkTitle}
            </Link>
          </h2>
        )}
        <Form method="post" noValidate>
          <div className="form-content">
            {newAccount && (
              <div className="flex justify-between">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={nameChangeHandler}
                    className={
                      nameErrorMessage ? "error-input" : "no-error-input"
                    }
                    ref={firstNameInputRef}
                  />
                  {nameErrorMessage && (
                    <p className="mt-2 text-red-500">{nameErrorMessage}</p>
                  )}
                </div>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="no-error-input"
                />
              </div>
            )}
            {!resetPassword && (
              <div className="w-full flex flex-col">
                {incorrectCredentialsErrorMessage && (
                  <p className="text-red-500 -mt-5 mb-2">
                    {incorrectCredentialsErrorMessage}
                  </p>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder={
                    !passwordRecovery ? "Email" : "Enter Registered Email"
                  }
                  className={
                    emailErrorMessage || incorrectCredentialsErrorMessage
                      ? "error-input"
                      : "no-error-input"
                  }
                  ref={emailInputRef}
                  onChange={emailChangeHandler}
                />
                {emailErrorMessage && (
                  <p className="mt-2 text-red-500">{emailErrorMessage}</p>
                )}
              </div>
            )}
            {!passwordRecovery && (
              <Fragment>
                <div className="relative">
                  <div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={
                        !resetPassword
                          ? "Enter your password"
                          : "Enter Password"
                      }
                      ref={passwordInputRef}
                      onChange={passwordChangeHandler}
                      className={
                        passwordErrorMessage || incorrectCredentialsErrorMessage
                          ? "error-input w-full"
                          : "no-error-input w-full"
                      }
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
                  {!newAccount && !resetPassword && (
                    <div className="flex justify-end">
                      <Link
                        to="/password-recovery"
                        className="text-blue-800 underline mt-1"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  )}
                  {passwordErrorMessage && (
                    <p className="mt-2 text-red-500">{passwordErrorMessage}</p>
                  )}
                </div>

                {/* Confirm Password */}
                {resetPassword && (
                  <div className="relative">
                    <div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={confirmPasswordChangeHandler}
                        className={
                          confirmPasswordErrorMessage
                            ? "error-input w-full"
                            : "no-error-input w-full"
                        }
                      />

                      <button
                        type="button"
                        className="password-btn"
                        onClick={confirmPasswordStateHandler}
                      >
                        {showConfirmPassword ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </button>
                    </div>
                    {confirmPasswordErrorMessage && (
                      <p className="mt-2 text-red-500">
                        {confirmPasswordErrorMessage}
                      </p>
                    )}
                  </div>
                )}
              </Fragment>
            )}
          </div>

          <button type="submit" className="mx-auto flex btn-black">
            {btnTitle}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
