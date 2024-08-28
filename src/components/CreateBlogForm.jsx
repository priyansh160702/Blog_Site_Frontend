import { useEffect } from "react";
import { Form } from "react-router-dom";

import Modal from "../util/Modal";

const CreateBlogForm = () => {
  useEffect(() => {
    const inputs = document.querySelectorAll("#blog-form input");

    inputs.forEach((input, index) => {
      if (index < 3) {
        input.classList.add("no-error-input");
      }
    });
  }, []);

  return (
    <Modal backdrop={true}>
      <h1 className="text-center text-xl font-semibold mb-4">Create Blog</h1>
      <Form encType="multipart/form-data">
        <div id="blog-form" className="flex flex-col space-y-4">
          <input type="text" placeholder="Title" name="title" />
          <input type="text" placeholder="Sub Title" name="subTitle" />
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

          <input type="text" placeholder="Content" name="content" />
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
