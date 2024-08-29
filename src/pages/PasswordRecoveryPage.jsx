import AuthForm from "../util/AuthForm";

const PasswordRecoveryPage = () => {
  return (
    <AuthForm
      title="Password Recovery"
      resetPassword={true}
      btnTitle="Send Reset Link"
    />
  );
};

export default PasswordRecoveryPage;
