import { Outlet, useLocation } from "react-router-dom";
import { Fragment, useEffect } from "react";

import useDocumentTitle from "../util/hooks/use-documentTitle";
import Navbar from "./Navbar";

const RootLayout = () => {
  const location = useLocation();

  // Scroll Restoration
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const path = location.pathname;
  let title;

  if (path === "/login") {
    title = "Login";
  } else if (path === "/create-account") {
    title = "Create Account";
  } else {
    title = "Nest-level Blogs";
  }

  useDocumentTitle(title);

  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;
