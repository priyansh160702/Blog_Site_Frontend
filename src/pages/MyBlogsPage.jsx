import { Fragment, useEffect, useRef, useState } from "react";
import { useRouteLoaderData, useSubmit } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Blog from "../components/Blog";
import { modalActions } from "../redux/store";
import EditBlogForm from "../components/EditBlogForm";

const MyBlogsPage = () => {
  const { blogs: blogsData, user } = useRouteLoaderData("root");

  const [blogId, setBlogId] = useState();

  const dispatch = useDispatch();

  const editBlogIsShown = useSelector((state) => state.modal.editBlogIsShown);

  const submit = useSubmit();

  const titleInputRef = useRef();

  useEffect(() => {
    if (editBlogIsShown) {
      titleInputRef.current.focus();
    }
  }, [editBlogIsShown]);

  const userId = user.id;

  const editBlogHandler = (blogId) => {
    dispatch(modalActions.showModal("editBlog"));
    setBlogId(blogId);
  };

  const deletBlogHandler = (blogId) => {
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) {
      const formData = new FormData();

      formData.append("blogId", blogId);
      formData.append("intent", "delete");

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
            <button
              className="btn-white"
              onClick={() => editBlogHandler(blog.id)}
            >
              Edit
            </button>
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

  return (
    <Fragment>
      {editBlogIsShown && (
        <EditBlogForm
          ref={titleInputRef}
          blogsData={blogsData}
          blogId={blogId}
        />
      )}
      <ul className="grid grid-cols-2">{blogs}</ul>
    </Fragment>
  );
};

export default MyBlogsPage;
