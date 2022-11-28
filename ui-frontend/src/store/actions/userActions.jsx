import { userActions } from "../slices/userSlice";
import axios from "../../axios";
import { toast } from "react-toastify";
import { getError } from "../../utils";

export const userSignIn = (username, password) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/user/signin", {
        username,
        password,
      });
      dispatch(
        userActions.signIn({
          data: data,
        })
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      toast.error(getError(err));
    }
  };
};

export const userSignOut = () => {
  return async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch(userActions.signOut());
  };
};

export const userRegister = (email, username, password) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/user/register", {
        email,
        username,
        password,
      });
      dispatch(
        userActions.signIn({
          data: data,
        })
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      toast.error(getError(err));
    }
  };
};

export const userFollow = (username, userId) => {
  return async () => {
    try {
      await axios.post(`/api/user/${userId}`, {
        username,
      });
    } catch (error) {
      console.log("error di sini");
    }
  };
};

export const userFollowed = (username, userId) => {
  return async () => {
    try {
      await axios.post(`/api/user/followed/${userId}`, {
        username,
      });
    } catch (error) {
      console.log("error di sini");
    }
  };
};
