import { useDispatch } from "react-redux";

import Modal from "../util/Modal";
import { modalActions } from "../redux/store";

const DeleteBlogPopup = ({ blogTitle, onDelete }) => {
  const dispatch = useDispatch();

  const cancelButtonHandler = () => {
    dispatch(modalActions.hideModal("deleteBlog"));
  };

  const deleteBlogHandler = () => {
    onDelete();
    dispatch(modalActions.hideModal("deleteBlog"));
  };

  return (
    <Modal className="left-[10%] md:left-[35%] ">
      <div className="p-3 shadow-md bg-gray-300">
        <h1 className="mb-3 text-lg">
          Are you sure you want to delete "{blogTitle}" ?
        </h1>
        <div className="flex justify-center space-x-2">
          <button className="btn-white" onClick={cancelButtonHandler}>
            Cancel
          </button>
          <button className="btn-black" onClick={deleteBlogHandler}>
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBlogPopup;
