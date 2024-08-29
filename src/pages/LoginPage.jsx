import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <AuthForm
      title="Login"
      linkDesc="Don't have an account"
      link="create-account"
      linkTitle="Signup"
      newAccount={false}
      btnTitle="Login"
    />
  );
};

export default LoginPage;
