import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Router
const router = createBrowserRouter([{ path: "/" }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
