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

// export const userFollow = (username, userId, action) => {
//   return async (dispatch) => {
//     try {
//       switch (action) {
//         case "follow":
//           const { data } = await axios.post(`/api/user/${action}/${userId}`, {
//             username,
//           });
//           dispatch(
//             userActions.signIn({
//               data: data,
//             })
//           );
//           localStorage.setItem("userInfo", JSON.stringify(data));
//           return;
//         case "followed":
//           await axios.post(`/api/user/followed/${userId}`, {
//             username,
//           });
//           return;
//         case "unfollow":
//           await axios.delete(`/api/user/unfollow/${userId}`, {
//             data: { username: username },
//           });
//           return;
//         case "unfollowed":
//           await axios.delete(`/api/user/unfollowed/${userId}`, {
//             data: { username: username },
//           });
//           return;
//         default:
//           throw new Error();
//       }
//     } catch (error) {
//       console.log(`error di sini: /api/user/${action}/${userId}`);
//     }
//   };
// };

export const userFollow = (username, userId, action) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/user/${action}/${userId}`, {
        username,
      });
      dispatch(
        userActions.signIn({
          data: data,
        })
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(`/api/user/${action}/${userId}`);
    }
  };
};

export const userUnfollow = (username, userId, action) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/user/${action}/${userId}`, {
        data: { username: username },
      });
      dispatch(
        userActions.signIn({
          data: data,
        })
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(`/api/user/${action}/${userId}`);
    }
  };
};

// export const userFollowed = (username, userId) => {
//   return async () => {
//     try {
//       await axios.post(`/api/user/followed/${userId}`, {
//         username,
//       });
//     } catch (error) {
//       console.log("error di sini");
//     }
//   };
// };

// export const userUnfollow = (username, userId) => {
//   return async () => {
//     try {
//       await axios.delete(`/api/user/unfollow/${userId}`, {
//         data: {
//           username: username,
//         },
//       });
//     } catch (error) {
//       console.log("error di sini");
//     }
//   };
// };

// export const userUnfollowed = (username, userId) => {
//   return async () => {
//     try {
//       await axios.delete(`/api/user/unfollowed/${userId}`, {
//         data: {
//           username: username,
//         },
//       });
//     } catch (error) {
//       console.log("error di sini");
//     }
//   };
// };
