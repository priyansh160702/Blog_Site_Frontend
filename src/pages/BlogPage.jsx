import { useLoaderData } from "react-router-dom";

import dateFormatter from "../util/dateFormatter";

const BlogPage = () => {
  const api_url = import.meta.env.VITE_API_URL;

  const { title, subTitle, category, content, image, createdAt, user } =
    useLoaderData();

  const date = dateFormatter(createdAt);

  console.log(date);

  return (
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
  );
};

export default BlogPage;
