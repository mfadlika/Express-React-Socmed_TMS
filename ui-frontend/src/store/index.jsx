import { configureStore } from "@reduxjs/toolkit";
import notifSlice from "./slices/notifSlice";
import postSlice from "./slices/postSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
    notification: notifSlice.reducer,
  },
});

export default store;
