import { useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import Blog from "../util/Blog";
import CreateBlogForm from "../components/CreateBlogForm";

const HomePage = () => {
  const blogsData = useRouteLoaderData("root");

  const noBlogs = blogsData.length === 0;

  const modalIsShown = useSelector((state) => state.modal.modalIsShown);

  const blogs = blogsData.map((blog) => {
    return <Blog key={blog.id} blog={blog} />;
  });

  return (
    <div className="container">
      {modalIsShown && <CreateBlogForm />}
      {noBlogs ? (
        <p className="text-center text-red-500 font-bold text-2xl">
          No Blogs yet!
        </p>
      ) : (
        <ul className="grid grid-cols-3">{blogs}</ul>
      )}
    </div>
  );
};

export default HomePage;
