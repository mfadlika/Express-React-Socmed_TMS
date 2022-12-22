import axios from "../../axios";
import { postActions } from "../slices/postSlice";

export const sendPost = (post, username, type, userId, postId) => {
  return async (dispatch) => {
    let url = "/api/posting";
    if (type === "comment") {
      url = `api/posting/${userId}/status/${postId}`;
    }
    try {
      await axios
        .post(url, {
          post,
          username,
          type,
        })
        .then(dispatch(postActions.sendPost()));
    } catch (error) {
      dispatch(postActions.unsendPost());
    }
  };
};

export const getData = (data) => {
  return async (dispatch) => {
    dispatch(postActions.getPost({ data: data }));
  };
};

export const setFalse = () => {
  return async (dispatch) => {
    dispatch(postActions.unsendPost());
  };
};
