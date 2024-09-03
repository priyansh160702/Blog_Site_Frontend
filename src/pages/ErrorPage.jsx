import { Fragment } from "react";
import { useRouteError } from "react-router-dom";

import Navbar from "../components/Navbar";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error.status || 500;
  let message = error.message || "Internal Server Error";

  if (status === 404) {
    message = "Page not found";
  }

  return (
    <Fragment>
      <Navbar isErrorPage={true} />
      <div className="flex flex-col justify-center items-center h-[50vh] text-center">
        <div className="text-center">
          <h1 className="text-3xl font-medium">{status} Error</h1>
          <p className="text-2xl">{message} :(</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ErrorPage;
