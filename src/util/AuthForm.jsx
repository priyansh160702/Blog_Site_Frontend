import { useState, useRef, useEffect } from "react";
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
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  const firstNameInputRef = useRef();
  const emailInputRef = useRef();

  const errors = useActionData();

  if (newAccount) {
    useEffect(() => {
      firstNameInputRef.current.focus();
    }, []);
  }
  if (!newAccount) {
    useEffect(() => {
      emailInputRef.current.focus();
    }, []);
  }

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
    }
  }, [errors]);

  const passwordStateHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const nameChangeHandler = () => {
    setNameErrorMessage(null);
  };

  const emailChangeHandler = () => {
    setEmailErrorMessage(null);
  };

  const passwordChangeHandler = () => {
    setPasswordErrorMessage(null);
  };

  return (
    <div className="container">
      <div className="mx-auto w-[35rem] shadow-xl px-11 py-5">
        <h1 className="mb-3 text-4xl font-semibold">{title}</h1>
        <h2>
          {linkDesc}?{" "}
          <Link className="text-blue-800 underline" to={`/${link}`}>
            {linkTitle}
          </Link>
        </h2>
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
            <div className="w-full flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={emailErrorMessage ? "error-input" : "no-error-input"}
                ref={emailInputRef}
                onChange={emailChangeHandler}
              />
              {emailErrorMessage && (
                <p className="mt-2 text-red-500">{emailErrorMessage}</p>
              )}
            </div>
            <div className="relative">
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={passwordChangeHandler}
                  className={
                    passwordErrorMessage
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
              {passwordErrorMessage && (
                <p className="mt-2 text-red-500">{passwordErrorMessage}</p>
              )}
            </div>
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
