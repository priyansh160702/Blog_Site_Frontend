import { redirect } from "react-router-dom";

import { LOGIN_MUTATION } from "../Graphql";
import { validateForm } from "../Validation";

const loginAction = async ({ request, params }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const formData = await request.formData();

  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  const errors = validateForm(email, password);

  if (Object.keys(errors).length > 0) {
    console.log(errors);

    return errors;
  }

  const loginData = {
    email,
    password,
  };

  const response = await fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: LOGIN_MUTATION,
      variables: { loginData },
    }),
  });

  const resData = await response.json();

  if (resData.hasOwnProperty("errors")) {
    const { statusCode, message } = resData.errors[0].extensions.originalError;

    if (statusCode === 403) {
      errors.incorrectCredentials = message;
    }

    return errors;
  }

  const { token } = resData.data.login;

  localStorage.setItem("token", token);

  return redirect("/");
};

export default loginAction;
