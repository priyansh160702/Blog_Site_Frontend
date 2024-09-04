import { Suspense } from "react";
import { useRouteLoaderData, Await } from "react-router-dom";

import Blog from "../components/Blog";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const { blogs } = useRouteLoaderData("root");

  return (
    <div className="container pb-5">
      <Suspense fallback={<LoadingSpinner />}>
        <Await
          resolve={blogs}
          errorElement={
            <p className="text-center text-red-500">Failed to load blogs.</p>
          }
        >
          {(resolvedBlogs) => {
            if (!resolvedBlogs || resolvedBlogs.length === 0) {
              return (
                <p className="text-center text-red-500 font-bold text-2xl">
                  No Blogs yet!
                </p>
              );
            }
            return (
              <ul className="grid grid-cols-3 place-items-center gap-8">
                {resolvedBlogs.map((blog) => (
                  <Blog key={blog.id} blog={blog} />
                ))}
              </ul>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default HomePage;
