import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import FollowingList from "../components/Modal.jsx/FollowingListModal";
import Loading from "../components/Loading";
import Post from "../components/Post";
import { userFollow, userUnfollow } from "../store/actions/userActions";
import { postActions } from "../store/slices/postSlice";
import { baseURL, getError } from "../utils";
import picture from "../assets/unknown.jpeg";

function reducer(state, action) {
  switch (action.type) {
    case "failed":
      return { ...state, followButton: "null", user: "unknown" };
    default:
      throw new Error();
  }
}

export default function ProfilePage() {
  let { userId } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user.userSignIn);
  const loading = useSelector((state) => state.post.loading);
  const { username } = userInfo || "";
  const { following } = userInfo || [];
  const [posts, setPosts] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [toggleButton, setToggleButton] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/signin";

  const initialState = { followButton: "follow", user: userId };

  const [{ followButton, user }, dispatchReducer] = useReducer(
    reducer,
    initialState
  );

  if (userId === "profile") {
    if (!userInfo) {
      navigate(redirect);
    }
    userId = username;
  }

  async function toggleHandler(e) {
    let action = e.target.value;
    try {
      const data = await axios.get("/api/user/followingList", {
        headers: {
          username: userId === " profile" ? username : userId,
          action: action,
        },
      });
      setData(data.data);
    } catch (error) {
      console.log("error");
    }
    setToggleButton(e.target.value);
  }

  function toggleClose() {
    setToggleButton("");
  }

  function editProfileHandler(e) {
    e.preventDefault();
    navigate(`/${userId}/editprofile`);
  }

  function follow() {
    dispatch(userFollow(username, userId, "follow"));
    dispatch(userFollow(username, userId, "followed"));
  }

  function unfollow() {
    dispatch(userUnfollow(username, userId, "unfollow"));
    dispatch(userUnfollow(username, userId, "unfollowed"));
  }

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios.get(`/api/posting/${userId}`, {
          headers: { username: username },
        });
        new Promise(function (resolve, reject) {
          resolve();
        }).then(() => {
          setPosts(data);
          dispatch(postActions.setLoading());
        });
      } catch (err) {
        dispatchReducer({ type: "failed" });
        toast.error(getError(err));
      }
    }
    async function getUserData() {
      try {
        const { data } = await axios.get(`/api/user/${userId}`, {
          headers: { username: userId },
        });
        new Promise(function (resolve, reject) {
          resolve();
        }).then(() => {
          setDataUser(data);
        });
      } catch (err) {
        console.log("error");
      }
    }
    getPost();
    getUserData();
    dispatch(postActions.setLoading());
  }, [dispatch, userId, username, toggleButton]);

  return (
    <div id="profilepage">
      <div className="profilepage w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={
              user === "unknown"
                ? picture
                : `${baseURL}/api/user/${userId}/profile-picture`
            }
            alt="ava"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            <p>{dataUser.profileName}</p>
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            @{user === "unknown" ? user : dataUser.username}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            <p>{dataUser.bio}</p>
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <Link className="button-edit inline-flex items-center px-2 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none">
              {username === userId || !userInfo || followButton === "null" ? (
                <button onClick={editProfileHandler}>Edit Profile</button>
              ) : following.includes(userId) ? (
                <button onClick={unfollow}>Unfollow</button>
              ) : (
                <button onClick={follow}>Follow</button>
              )}
            </Link>
          </div>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              className="button-right inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none"
              value="following"
              onClick={toggleHandler}
            >
              following
            </button>
            <button
              className="button-left inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none"
              value="follower"
              onClick={toggleHandler}
            >
              follower
            </button>
          </div>
        </div>
      </div>

      {loading && <Loading />}
      {posts.map((props) => (
        <Post
          _id={props._id}
          like={props.like}
          post={props.post}
          key={props._id}
          comment={props.comment}
          image={`${baseURL}/api/user/${userId}/profile-picture`}
          profileName={props.profileName}
          username={props.username}
          usernameOwner={username}
          createdAt={props.createdAt}
        ></Post>
      ))}
      <FollowingList
        data={data}
        isHidden={toggleButton}
        toggle={toggleClose}
      ></FollowingList>
    </div>
  );
}
