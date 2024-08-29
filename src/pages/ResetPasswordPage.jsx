import AuthForm from "../components/AuthForm";

const ResetPasswordPage = () => {
  return (
    <AuthForm title="Reset Password" btnTitle="Reset" resetPassword={true} />
  );
};

export default ResetPasswordPage;
