import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: { user: userSlice.reducer, post: postSlice.reducer },
});

export default store;
