import { useRouteLoaderData } from "react-router-dom";

import Blog from "../components/Blog";

const HomePage = () => {
  const blogsData = useRouteLoaderData("root");

  const noBlogs = blogsData.blogs.length === 0;

  const blogs = blogsData.blogs.map((blog) => {
    return <Blog key={blog.id} blog={blog} />;
  });

  return (
    <div className="container pb-5">
      {noBlogs ? (
        <p className="text-center text-red-500 font-bold text-2xl">
          No Blogs yet!
        </p>
      ) : (
        <ul className="grid grid-cols-3 place-items-center gap-8">{blogs}</ul>
      )}
    </div>
  );
};

export default HomePage;
