import { useLoaderData, useRouteLoaderData } from "react-router-dom";

import dateFormatter from "../util/dateFormatter";
import { Fragment } from "react";
import Blog from "../components/Blog";
import BlogsByUserSection from "../components/BlogsByUserSection";
import BlogsByCategorySection from "../components/BlogsByCategorySection";

const BlogPage = () => {
  const api_url = import.meta.env.VITE_API_URL;

  const { id, title, subTitle, category, content, image, createdAt, user } =
    useLoaderData();

  const data = useRouteLoaderData("root");

  const date = dateFormatter(createdAt);

  const blogsByUser = data
    .filter((blog) => blog.user.id === user.id && blog.id !== id)
    .map((blog) => <Blog key={blog.id} blog={blog} />);

  const blogsByCategory = data
    .filter((blog) => blog.category === category && blog.id !== id)
    .map((blog) => <Blog key={blog.id} blog={blog} />);

  return (
    <Fragment>
      <main>
        <div className="container text-center">
          <img src={`${api_url}/${image}`} alt="" />
          <h2 className="">{category}</h2>
          <h1 className="title">{title}</h1>
          <h2>{subTitle}</h2>
          <h2>~By {user.name}</h2>
          <h2>{date}</h2>
          <p className="text-left mt-5">{content}</p>
        </div>
      </main>
      {blogsByUser.length > 0 && (
        <BlogsByUserSection userName={user.name} blogsByUser={blogsByUser} />
      )}
      {blogsByCategory.length > 0 && (
        <BlogsByCategorySection
          category={category}
          blogsByCategory={blogsByCategory}
        />
      )}
    </Fragment>
  );
};

export default BlogPage;
