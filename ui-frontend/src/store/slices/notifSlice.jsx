import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
  name: "notification",
  initialState: {
    notification: [],
    status: false,
    loading: false,
  },
  reducers: {
    getNotif(state, action) {
      state.notification = action.payload.data;
    },
    setLoading(state, action) {
      state.loading = !state.loading;
    },
    signOut(state, action) {
      state.notification = [];
      state.status = false;
      state.loading = false;
    },
  },
});

export const notifActions = notifSlice.actions;

export default notifSlice;
