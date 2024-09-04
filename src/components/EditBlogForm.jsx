import { forwardRef, useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";

import Modal from "../util/Modal";
import { modalActions } from "../redux/store";

const EditBlogForm = forwardRef(({ blogId, blogsData }, ref) => {
  const [contentError, setContentError] = useState(null);
  const [blogImageError, setBlogImageError] = useState(null);

  const dispatch = useDispatch();

  const blog = blogsData.find((blog) => blog.id === blogId);

  const formData = useActionData();

  const errors = formData?.errors;

  useEffect(() => {
    if (errors) {
      if (!formData?.success) {
        if (errors.content) {
          setContentError(errors.content);
        }
        if (errors.blogImage) {
          setBlogImageError(errors.blogImage);
        }
      }
    }
  }, [formData]);

  useEffect(() => {
    if (formData?.success) {
      dispatch(modalActions.hideModal("editBlog"));
    }
  }, [formData?.success, dispatch]);

  const contentChangeHandler = () => {
    setContentError(null);
  };

  return (
    <Modal
      backdrop={true}
      className="left-[10%] md:left-[40%] md:-translate-x-1/2 "
      hideModal="editBlog"
    >
      <h1 className="text-center text-xl font-semibold mb-4">Edit Blog</h1>
      <Form method="post" encType="multipart/form-data" noValidate>
        <div id="blog-form" className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Title"
            name="title"
            ref={ref}
            defaultValue={blog.title}
            className="no-error-input"
          />

          <input
            type="text"
            placeholder="Sub Title"
            name="subTitle"
            defaultValue={blog.subTitle}
            className="no-error-input"
          />

          <select
            name="category"
            defaultValue={blog.category}
            className="no-error-input py-2"
          >
            <option disabled defaultValue={true}>
              Select a category
            </option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
          </select>

          <div>
            <textarea
              rows={12}
              cols={12}
              placeholder="Content"
              onChange={contentChangeHandler}
              name="content"
              defaultValue={blog.content}
              className={contentError ? "error-input" : "no-error-input"}
            ></textarea>
            {contentError && <p className="text-red-500">{contentError}</p>}
          </div>

          <div>
            <input type="file" name="blogImage" />
            {blogImageError && <p className="text-red-500">{blogImageError}</p>}
          </div>
          <input type="hidden" name="blogId" value={blogId} />
          <button
            type="submit"
            className="btn-black"
            name="intent"
            value="edit"
          >
            Edit
          </button>
        </div>
      </Form>
    </Modal>
  );
});

export default EditBlogForm;
