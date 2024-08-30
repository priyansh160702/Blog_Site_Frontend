import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/Rootlayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import BlogPage from "./pages/BlogPage";
import signupAction from "./util/actions/SignupAction";
import loginAction from "./util/actions/LoginAction";
import getData from "./util/loaders/getData";
import getBlogByIdLoader from "./util/loaders/getBlogByIdLoader";
import createBlogAction from "./util/actions/CreateBlogAction";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import passwordRecoveryAction from "./util/actions/PasswordRecoveryAction";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import resetPasswordAcion from "./util/actions/ResetPasswordAction";
import UserProfilePage from "./pages/UserProfilePage";
import profilePhotoAction from "./util/actions/ProfilePhotoAction";
import MyBlogsPage from "./pages/MyBlogsPage";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: getData,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
        action: createBlogAction,
      },
      {
        path: "/create-account",
        element: <SignupPage />,
        action: signupAction,
      },
      { path: "/login", element: <LoginPage />, action: loginAction },
      {
        path: "blog/:blogId",
        element: <BlogPage />,
        loader: getBlogByIdLoader,
      },
      {
        path: "password-recovery",
        element: <PasswordRecoveryPage />,
        action: passwordRecoveryAction,
      },
      {
        path: "reset-password/:resetToken",
        element: <ResetPasswordPage />,
        action: resetPasswordAcion,
      },
      {
        path: "me",
        element: <UserProfilePage />,
        action: profilePhotoAction,
      },
      {
        path: "my-blogs",
        element: <MyBlogsPage />,
      },
      {
        path: "edit-blog/:blogId",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
