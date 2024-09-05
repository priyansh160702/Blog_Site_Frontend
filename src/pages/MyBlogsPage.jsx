import { Fragment, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Await, useRouteLoaderData, useSubmit } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";

import LoadingSpinner from "../components/LoadingSpinner";
import Blog from "../components/Blog";
const EditBlogForm = lazy(() => import("../components/EditBlogForm"));
import { modalActions } from "../redux/store";
import DeleteBlogPopup from "../components/DeleteBlogPopup";

const MyBlogsPage = () => {
  const { blogs: blogsData, user } = useRouteLoaderData("root");

  const [blogId, setBlogId] = useState();
  const [blogTitle, setBlogTitle] = useState();

  const dispatch = useDispatch();

  const editBlogIsShown = useSelector((state) => state.modal.editBlogIsShown);
  const deleteBloglIsShown = useSelector(
    (state) => state.modal.deleteBloglIsShown
  );

  const submit = useSubmit();

  const titleInputRef = useRef();

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [editBlogIsShown]);

  if (!user) {
    return;
  }

  const userId = user.id;

  const editBlogHandler = (blogId) => {
    dispatch(modalActions.showModal("editBlog"));
    setBlogId(blogId);
  };

  const deletePopupHandler = (blogId, blogTitle) => {
    setBlogTitle(blogTitle);
    setBlogId(blogId);

    dispatch(modalActions.showModal("deleteBlog"));
  };

  const deleteBlogHandler = () => {
    console.log(blogId);

    const formData = new FormData();

    formData.append("blogId", blogId);
    formData.append("intent", "delete");

    submit(formData, { method: "post" });
  };

  return (
    <Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={blogsData}>
          {(resolvedBlogs) => {
            if (resolvedBlogs.length === 0) {
              return (
                <p className="text-center font-semibold text-red-500 text-xl">
                  No blogs yet!
                </p>
              );
            }

            const blogs = resolvedBlogs
              .filter((blog) => blog.user.id === userId)
              .map((blog) => {
                return (
                  <div key={blog.id} className="flex flex-col mx-auto">
                    <Blog blog={blog} noUser={true} />
                    <div className="mx-auto space-x-3 mt-1">
                      <button
                        className="btn-white"
                        onClick={() => editBlogHandler(blog.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-white"
                        onClick={() => deletePopupHandler(blog.id, blog.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              });

            return (
              <Fragment>
                <AnimatePresence>
                  {editBlogIsShown && (
                    <Suspense fallback={<LoadingSpinner />}>
                      <EditBlogForm
                        ref={titleInputRef}
                        blogsData={resolvedBlogs}
                        blogId={blogId}
                      />
                    </Suspense>
                  )}
                  {deleteBloglIsShown && (
                    <DeleteBlogPopup
                      blogTitle={blogTitle}
                      onDelete={deleteBlogHandler}
                    />
                  )}
                </AnimatePresence>
                <ul className="grid md:grid-cols-2 place-items-center gap-3 mb-5">
                  {blogs}
                </ul>
                ;
              </Fragment>
            );
          }}
        </Await>
      </Suspense>
    </Fragment>
  );
};

export default MyBlogsPage;
