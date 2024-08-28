import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const api_url = import.meta.env.VITE_API_URL;

  return (
    <li key={blog.id} className="m-5 max-h-[10rem] border border-red-500">
      <Link to={`/blog/${blog.id}`} className=" text-center">
        <h2 className="text-left">{blog.category}</h2>
        {blog.image && (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={`${api_url}/${blog.image}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1>{blog.title}</h1>
        <h2>{blog.subTitle}</h2>
        <h2>User = {blog.user.name}</h2>
      </Link>
    </li>
  );
};

export default Blog;
