import { redirect } from "react-router-dom";

import { RESET_PASSWORD_MUTATION } from "../Graphql";
import { validatePassword } from "../Validation";

const resetPasswordAction = async ({ request, params }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const formData = await request.formData();

  const password = formData.get("password").trim();
  const confirmPassword = formData.get("confirmPassword").trim();

  const isPassword = validatePassword(password);

  let errors = {};

  if (!isPassword) {
    errors.password = "Password must be 5 characters long!";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Confirm password must match with Password!";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const resetPasswordData = {
    newPassword: password,
    confirmPassword,
  };

  const token = params.resetToken;

  const response = await fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: RESET_PASSWORD_MUTATION,
      variables: { resetPasswordData },
    }),
  });

  if (response.ok) {
    return redirect("/login");
  }
};

export default resetPasswordAction;
