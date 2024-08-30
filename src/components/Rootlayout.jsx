import { Outlet, useLocation } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

import useDocumentTitle from "../util/hooks/use-documentTitle";
import Navbar from "./Navbar";
import CreateBlogForm from "./CreateBlogForm";
import UserModal from "./UserModal";

const RootLayout = () => {
  const location = useLocation();

  const blogModalIsShown = useSelector((state) => state.modal.blogModalIsShown);
  const userModalIsShown = useSelector((state) => state.modal.userModalIsShown);

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
  } else if (path === "/password-recovery") {
    title = "Password Recovery";
  } else {
    title = "Nest-level Blogs";
  }

  useDocumentTitle(title);

  return (
    <Fragment>
      <Navbar />
      {blogModalIsShown && <CreateBlogForm />}
      {userModalIsShown && <UserModal />}
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;
