import AuthForm from "../components/AuthForm";

const SignupPage = () => {
  return (
    <AuthForm
      title="Create an Account"
      linkDesc="Already have an account"
      link="login"
      linkTitle="Login"
      newAccount={true}
      btnTitle="Create Account"
    />
  );
};

export default SignupPage;
