import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";

import Modal from "../util/Modal";
import { modalActions } from "../redux/store";

const CreateBlogForm = () => {
  const dispatch = useDispatch();

  const formSubmitHandler = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Modal backdrop={true}>
      <h1 className="text-center text-xl font-semibold mb-4">Create Blog</h1>
      <Form
        method="post"
        onSubmit={formSubmitHandler}
        encType="multipart/form-data"
        noValidate
      >
        <div id="blog-form" className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="no-error-input"
          />
          <input
            type="text"
            placeholder="Sub Title"
            name="subTitle"
            className="no-error-input"
          />
          <select name="category" className="no-error-input py-2">
            <option disabled defaultValue={true}>
              Select a category
            </option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
            <option value="travel">Travel</option>
          </select>

          <textarea
            rows={12}
            cols={12}
            placeholder="Content"
            name="content"
            className="no-error-input pt-1 pb-20"
          ></textarea>
          <input type="file" name="blogImage" />
          <button type="submit" className="btn-black">
            Create
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateBlogForm;
