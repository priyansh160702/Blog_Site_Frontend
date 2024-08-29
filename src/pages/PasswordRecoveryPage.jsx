import AuthForm from "../util/AuthForm";

const PasswordRecoveryPage = () => {
  return (
    <AuthForm
      title="Password Recovery"
      passwordRecovery={true}
      btnTitle="Send Reset Link"
    />
  );
};

export default PasswordRecoveryPage;
