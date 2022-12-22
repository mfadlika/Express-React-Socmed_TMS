import axios from "../../axios";
import { notifActions } from "../slices/notifSlice";

export const getNotif = (username) => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/notification/", {
      headers: {
        username: username,
      },
    });
    try {
      dispatch(notifActions.getNotif({ data: data }));
    } catch (err) {
      console.log(err);
    }
  };
};
