import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "Modal",
  initialState: { modalIsShown: false },
  reducers: {
    showModal(state) {
      state.modalIsShown = true;
    },
    hideModal(state) {
      state.modalIsShown = false;
    },
  },
});

export default modalSlice;
