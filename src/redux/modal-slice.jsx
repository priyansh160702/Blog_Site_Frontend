import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "Modal",
  initialState: {
    createBloglIsShown: false,
    editBlogIsShown: false,
    userModalIsShown: false,
    deleteBloglIsShown: false,
  },
  reducers: {
    showModal(state, action) {
      if (action.payload === "createBlog") {
        state.createBloglIsShown = true;
      }
      if (action.payload === "editBlog") {
        state.editBlogIsShown = true;
      }
      if (action.payload === "user") {
        state.userModalIsShown = true;
      }
      if (action.payload === "deleteBlog") {
        state.deleteBloglIsShown = true;
      }
    },
    hideModal(state, action) {
      if (action.payload === "createBlog") {
        state.createBloglIsShown = false;
      }
      if (action.payload === "editBlog") {
        state.editBlogIsShown = false;
      }
      if (action.payload === "user") {
        state.userModalIsShown = false;
      }
      if (action.payload === "deleteBlog") {
        state.deleteBloglIsShown = false;
      }
    },
  },
});

export default modalSlice;
