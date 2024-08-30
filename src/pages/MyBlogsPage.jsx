import { Link, useRouteLoaderData } from "react-router-dom";
import Blog from "../components/Blog";

const MyBlogsPage = () => {
  const { blogs: blogsData, user } = useRouteLoaderData("root");

  const userId = user.id;

  const blogs = blogsData
    .filter((blog) => blog.user.id === userId)
    .map((blog) => {
      return (
        <div key={blog.id} className="flex flex-col">
          <Blog blog={blog} />
          <div className="mx-auto space-x-3">
            <Link to={`/edit-blog/${blog.id}`} className="btn-white">
              Edit
            </Link>
            <button className="btn-white">Delete</button>
          </div>
        </div>
      );
    });

  return <ul className="grid grid-cols-2">{blogs}</ul>;
};

export default MyBlogsPage;
