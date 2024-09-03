import { Fragment } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, noUser }) => {
  const api_url = import.meta.env.VITE_API_URL;

  return (
    <div
      key={blog.id}
      className="shadow-xl w-fit h-fit p-3 rounded-md hover:shadow-2xl"
    >
      <li>
        <Link to={`/blog/${blog.id}`} className=" text-center">
          <h2 className="text-left bg-orange-500 rounded-md py-[1px] px-[5px] text-white w-fit">
            {blog.category}
          </h2>
          {!noUser && (
            <div className="flex justify-center space-x-1 items-center my-3">
              <img
                className="w-[2rem] h-[2rem] rounded-full"
                src={`${api_url}/${blog.user?.profilePhoto}`}
                alt=""
              />

              <h2 className="text-lg">{blog.user.name}</h2>
            </div>
          )}
          {blog.image && (
            <div className="h-[16rem] w-[21rem] mx-auto ">
              <img
                src={`${api_url}/${blog.image}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="mt-3">
            <h1>{blog.title}</h1>
            <h2>{blog.subTitle}</h2>
          </div>
        </Link>
      </li>
    </div>
  );
};

export default Blog;
