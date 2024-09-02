import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "Modal",
  initialState: {
    createBloglIsShown: false,
    editBlogIsShown: false,
    userModalIsShown: false,
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
    },
  },
});

export default modalSlice;
