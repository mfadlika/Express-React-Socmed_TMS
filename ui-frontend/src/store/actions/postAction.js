import { postActions } from "../slices/postSlice";
import axios from "../../axios";

export const sendPost = (post, username) => {
  return async (dispatch) => {
    try {
      await axios
        .post("/api/posting", {
          post,
          username,
        })
        .then(dispatch(postActions.sendPost()));
    } catch (error) {
      dispatch(postActions.unsendPost());
    }
  };
};

export const getData = (data) => {
  return async (dispatch) => {
    dispatch(postActions.setLoading());
    dispatch(
      postActions.getPost({
        data: data[0],
        followingList: data[1],
      })
    );
  };
};

export const setFalse = () => {
  return async (dispatch) => {
    dispatch(postActions.unsendPost());
  };
};
