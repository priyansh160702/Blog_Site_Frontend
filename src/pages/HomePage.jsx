import { lazy, Suspense } from "react";
import { useRouteLoaderData, Await } from "react-router-dom";

// import Blog from "../components/Blog";
const Blog = lazy(() => import("../components/Blog"));

const HomePage = () => {
  const { blogs } = useRouteLoaderData("root");

  return (
    <div className="container pb-5">
      <Suspense
        fallback={<p className="text-center text-red-500">Loading Blogs...</p>}
      >
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
                  <Suspense fallback={<p>Loading...</p>}>
                    <Blog key={blog.id} blog={blog} />
                  </Suspense>
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
