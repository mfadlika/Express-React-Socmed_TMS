import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: false,
    loading: false,
  },
  reducers: {
    sendPost(state, action) {
      state.status = true;
      state.loading = true;
    },
    unsendPost(state, action) {
      state.status = false;
    },
    getPost(state, action) {
      state.posts = action.payload.data;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = !state.loading;
    },
    signOut(state, action) {
      state.posts = [];
      state.status = false;
      state.loading = false;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice;
