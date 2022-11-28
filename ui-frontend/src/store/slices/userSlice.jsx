import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userSignIn: {
      userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    },
  },
  reducers: {
    signIn(state, action) {
      state.userSignIn.userInfo = action.payload.data;
    },
    signOut(state) {
      state.userSignIn.userInfo = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
