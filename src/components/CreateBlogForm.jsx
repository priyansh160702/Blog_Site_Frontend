import { useEffect, useState, useRef } from "react";
import { Form, useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";

import Modal from "../util/Modal";
import { modalActions } from "../redux/store";

const CreateBlogForm = () => {
  const [titleErrorMessage, setTitleErrorMessage] = useState(null);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState(null);
  const [contentErrorMessage, setContentErrorMessage] = useState(null);
  const [blogImageErrorMessage, setBlogImageErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const titleInputRef = useRef();

  const actionData = useActionData();

  const errors = actionData?.errors;
  const success = actionData?.success;

  useEffect(() => {
    if (errors) {
      if (errors.title) {
        setTitleErrorMessage(errors.title);
      }
      if (errors.content) {
        setContentErrorMessage(errors.content);
      }
      if (errors.category) {
        setCategoryErrorMessage(errors.category);
      }
      if (errors.blogImage) {
        setBlogImageErrorMessage(errors.blogImage);
      }
    }
  }, [errors]);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(modalActions.hideModal());
    }
  }, [success, dispatch]);

  useEffect(() => {
    setTitleErrorMessage(null);
    setContentErrorMessage(null);
    setBlogImageErrorMessage(null);
  }, [dispatch]);

  const titleChangeHandler = () => {
    setTitleErrorMessage(null);
  };
  const contentChangeHandler = () => {
    setContentErrorMessage(null);
  };
  const blogImageChangeHandler = () => {
    setBlogImageErrorMessage(null);
  };

  return (
    <Modal backdrop={true}>
      <h1 className="text-center text-xl font-semibold mb-4">Create Blog</h1>
      <Form method="post" encType="multipart/form-data" noValidate>
        <div id="blog-form" className="flex flex-col space-y-4">
          <div>
            <input
              type="text"
              placeholder="Title"
              name="title"
              ref={titleInputRef}
              onChange={titleChangeHandler}
              className={titleErrorMessage ? "error-input" : "no-error-input"}
            />
            {titleErrorMessage && (
              <p className="text-red-500">{titleErrorMessage}</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Sub Title"
            name="subTitle"
            className="no-error-input"
          />
          <div>
            <select name="category" className="no-error-input py-2">
              <option disabled defaultValue={true}>
                Select a category
              </option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
            </select>
            {categoryErrorMessage && (
              <p className="text-red-500">{categoryErrorMessage}</p>
            )}
          </div>

          <div>
            <textarea
              rows={12}
              cols={12}
              placeholder="Content"
              name="content"
              onChange={contentChangeHandler}
              className={contentErrorMessage ? "error-input" : "no-error-input"}
            ></textarea>
            {contentErrorMessage && (
              <p className="text-red-500">{contentErrorMessage}</p>
            )}
          </div>
          <div>
            <input
              type="file"
              name="blogImage"
              onChange={blogImageChangeHandler}
            />
            {blogImageErrorMessage && (
              <p className="text-red-500 -mt-2">{blogImageErrorMessage}</p>
            )}
          </div>
          <button type="submit" className="btn-black">
            Create
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateBlogForm;
