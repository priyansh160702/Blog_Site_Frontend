import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/Rootlayout";
const HomePage = lazy(() => import("./pages/HomePage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const PasswordRecoveryPage = lazy(() => import("./pages/PasswordRecoveryPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const MyBlogsPage = lazy(() => import("./pages/MyBlogsPage"));
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";

import signupAction from "./util/actions/SignupAction";
import loginAction from "./util/actions/LoginAction";
import createBlogAction from "./util/actions/CreateBlogAction";
import passwordRecoveryAction from "./util/actions/PasswordRecoveryAction";
import resetPasswordAcion from "./util/actions/ResetPasswordAction";
import profilePhotoAction from "./util/actions/ProfilePhotoAction";
import blogAction from "./util/actions/blogAction";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: async () => {
      //For default export
      const { default: getData } = await import("./util/loaders/getData");
      return getData({});
    },
    action: createBlogAction,
    id: "root",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/create-account",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SignupPage />
          </Suspense>
        ),
        action: signupAction,
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <LoginPage />
          </Suspense>
        ),
        action: loginAction,
      },
      {
        path: "blog/:blogId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <BlogPage />
          </Suspense>
        ),
        loader: async ({ params }) => {
          const { default: getBlogByIdLoader } = await import(
            "./util/loaders/getBlogByIdLoader"
          );
          return getBlogByIdLoader({ params });
        },
      },
      {
        path: "password-recovery",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <PasswordRecoveryPage />
          </Suspense>
        ),
        action: passwordRecoveryAction,
      },
      {
        path: "reset-password/:resetToken",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ResetPasswordPage />
          </Suspense>
        ),
        action: resetPasswordAcion,
      },
      {
        path: "me",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p>Loading...</p>}>
              <UserProfilePage />
            </Suspense>
          </ProtectedRoute>
        ),
        action: profilePhotoAction,
      },
      {
        path: "my-blogs",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<p>Loading...</p>}>
              <MyBlogsPage />
            </Suspense>
          </ProtectedRoute>
        ),
        action: blogAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
