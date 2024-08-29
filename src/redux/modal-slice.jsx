import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "Modal",
  initialState: { blogModalIsShown: false, userModalIsShown: false },
  reducers: {
    showModal(state, action) {
      if (action.payload === "blog") {
        state.blogModalIsShown = true;
      }
      if (action.payload === "user") {
        state.userModalIsShown = true;
      }
    },
    hideModal(state, action) {
      if (action.payload === "blog") {
        state.blogModalIsShown = false;
      }
      if (action.payload === "user") {
        state.userModalIsShown = false;
      }
    },
  },
});

export default modalSlice;
