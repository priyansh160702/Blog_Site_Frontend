import { useRouteLoaderData } from "react-router-dom";

import Blog from "../custom-components/Blog";

const HomePage = () => {
  const blogsData = useRouteLoaderData("root");

  const blogs = blogsData.map((blog) => {
    return <Blog blog={blog} />;
  });

  return (
    <div className="container">
      <ul className="grid grid-cols-3">{blogs}</ul>
    </div>
  );
};

export default HomePage;
