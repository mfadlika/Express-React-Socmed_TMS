import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    followingList: [],
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
      state.followingList = action.payload.followingList;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = true;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice;
