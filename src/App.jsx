import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/Rootlayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import signupAction from "./util/actions/SignupAction";
import loginAction from "./util/actions/LoginAction";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/create-account",
        element: <SignupPage />,
        action: signupAction,
      },
      { path: "/login", element: <LoginPage />, action: loginAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
