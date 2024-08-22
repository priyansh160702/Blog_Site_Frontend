export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 5;
};

export const validateForm = (email, password) => {
  let errors = {};

  const validEmail = isEmail(email);

  const validPassword = validatePassword(password);

  if (!validEmail) {
    errors.email = "Enter valid email!";
  }

  if (!validPassword) {
    errors.password = "Password must be atleast 5 characters!";
  }

  if (email.length === 0) {
    errors.email = "This is a required!";
  }

  if (password.length === 0) {
    errors.password = "This is a required!";
  }

  return errors;
};
