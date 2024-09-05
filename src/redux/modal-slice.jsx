import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "Modal",
  initialState: {
    createBloglIsShown: false,
    editBlogIsShown: false,
    userModalIsShown: false,
    deleteBloglIsShown: false,
    sessionTimeOut: false,
  },
  reducers: {
    showModal(state, action) {
      switch (action.payload) {
        case "createBlog":
          state.createBloglIsShown = true;
          break;
        case "editBlog":
          state.editBlogIsShown = true;
          break;
        case "user":
          state.userModalIsShown = true;
          break;
        case "deleteBlog":
          state.deleteBloglIsShown = true;
          break;
        case "sessionTimeout":
          state.sessionTimeOut = true;
          break;
      }
    },
    hideModal(state, action) {
      switch (action.payload) {
        case "createBlog":
          state.createBloglIsShown = false;
          break;
        case "editBlog":
          state.editBlogIsShown = false;
          break;
        case "user":
          state.userModalIsShown = false;
          break;
        case "deleteBlog":
          state.deleteBloglIsShown = false;
          break;
        case "sessionTimeout":
          state.sessionTimeOut = false;
          break;
      }
    },
  },
});

export default modalSlice;
