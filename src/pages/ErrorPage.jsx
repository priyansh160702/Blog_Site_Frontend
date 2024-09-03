import { Fragment, useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";

import Navbar from "../components/Navbar";
import extractDataFromStream from "../util/exractDataFromStream";

const ErrorPage = () => {
  const error = useRouteError();
  const [message, setMessage] = useState("");
  const status = error.status || 500;

  console.log(error);

  useEffect(() => {
    // Extract error message from the stream if available
    const fetchErrorMessage = async () => {
      if (error.body) {
        const extractedMessage = await extractDataFromStream(error.body);
        setMessage(extractedMessage.message);
      } else {
        setMessage("An unknown error occurred.");
      }
    };

    fetchErrorMessage();
  }, [error]);

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
