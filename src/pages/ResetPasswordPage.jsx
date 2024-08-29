import AuthForm from "../util/AuthForm";

const ResetPasswordPage = () => {
  return (
    <AuthForm
      title="Password Recovery"
      resetPassword={true}
      btnTitle="Send Reset Link"
    />
  );
};

export default ResetPasswordPage;
