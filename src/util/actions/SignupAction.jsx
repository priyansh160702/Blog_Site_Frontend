import { redirect } from "react-router-dom";

import { validateForm } from "../Validation";
import { SIGNUP_MUTATION } from "../Graphql";

const signupAction = async ({ request, params }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const formData = await request.formData();

  const firstName = formData.get("firstName").trim();
  const lastName = formData.get("lastName").trim();
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  const errors = validateForm(email, password);

  if (firstName.length === 0) {
    errors.firstName = "This is a required field!";
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors);

    return errors;
  }

  // If no errors, send data to backend.
  const signupData = {
    name: firstName + " " + lastName,
    email,
    password,
  };

  const response = await fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: SIGNUP_MUTATION,
      variables: { signupData },
    }),
  });

  const resData = await response.json();

  if (resData.hasOwnProperty("errors")) {
    const { statusCode, message } = resData.errors[0].extensions.originalError;

    if (statusCode === 409) {
      errors.email = message;
    }

    return errors;
  }

  return redirect("/login");
};

export default signupAction;
