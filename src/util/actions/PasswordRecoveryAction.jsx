import { FORGOT_PASSWORD_MUTATION } from "../Graphql";
import { isEmail } from "../Validation";

const passwordRecoveryAction = async ({ request, params }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const formData = await request.formData();

  const email = formData.get("email").trim();

  let errors = {};

  if (email.length === 0) {
    errors.email = "This is required field!";
  } else if (!isEmail(email)) {
    errors.email = "Enter a valid email!";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const response = await fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: FORGOT_PASSWORD_MUTATION,
      variables: { userMail: email },
    }),
  });

  const resData = await response.json();

  if (resData.hasOwnProperty("errors")) {
    const { message } = resData.errors[0];

    errors.email = message;

    return errors;
  }

  if (response.ok) {
    const { message } = resData.data.forgotPassword;

    return { success: true, message };
  }

  return null;
};

export default passwordRecoveryAction;
