import { useRouteLoaderData, useSubmit } from "react-router-dom";
import Blog from "../components/Blog";

const MyBlogsPage = () => {
  const { blogs: blogsData, user } = useRouteLoaderData("root");

  const submit = useSubmit();

  const userId = user.id;

  const deletBlogHandler = (blogId) => {
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) {
      const formData = new FormData();

      formData.append("blogId", blogId);

      submit(formData, { method: "post" });
    }
  };

  const blogs = blogsData
    .filter((blog) => blog.user.id === userId)
    .map((blog) => {
      return (
        <div key={blog.id} className="flex flex-col">
          <Blog blog={blog} noUser={true} />
          <div className="mx-auto space-x-3">
            <button className="btn-white">Edit</button>
            <button
              className="btn-white"
              onClick={() => deletBlogHandler(blog.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });

  return <ul className="grid grid-cols-2">{blogs}</ul>;
};

export default MyBlogsPage;
