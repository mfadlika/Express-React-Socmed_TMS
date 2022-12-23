import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import Loading from "../components/Loading";
import Post from "../components/Post";
import Side from "../components/Side";
import { getData, sendPost, setFalse } from "../store/actions/postAction";
import { postActions } from "../store/slices/postSlice";
import { baseURL } from "../utils";

async function getPost(dispatch, username, userInfo) {
  const { data } = await axios.get("/api/posting/", {
    headers: { username: username, authorization: userInfo.token },
  });
  dispatch(getData(data));
}

export default function HomePage() {
  const userSignin = useSelector((state) => state.user.userSignIn);
  const isSent = useSelector((state) => state.post.status);
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const { userInfo } = userSignin;
  const { username, profileName } = userInfo || "";

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/signin";

  const [post, setPost] = useState("");

  const dispatch = useDispatch();

  const submitPostHandler = (e) => {
    e.preventDefault();
    dispatch(sendPost(post, username, "post"));
  };

  useEffect(() => {
    if (userInfo === null) {
      navigate(redirect);
    } else {
      dispatch(postActions.setLoading());
      getPost(dispatch, username, userInfo);
      if (isSent) {
        setPost("");
        toast("post sent");
        dispatch(setFalse());
      }
    }
  }, [isSent, dispatch, username, navigate, redirect, userInfo]);
  return (
    <div id="homepage">
      <div id="home">
        <form onSubmit={submitPostHandler} style={{ marginBottom: "15px" }}>
          <div className="mb-3">
            <label>Hello {profileName ? profileName : username}!!!</label>
            <input
              type="text"
              maxLength="242"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="What's happening?"
            />
          </div>
          <div>
            <button variant="primary" type="submit">
              Submit
            </button>
          </div>
        </form>
        {loading && <Loading />}
        {posts.map((props) => (
          <Post
            _id={props._id}
            like={props.like}
            image={`${baseURL}/api/user/${props.username}/profile-picture`}
            comment={props.comment}
            post={props.post}
            key={props._id}
            profileName={props.profileName}
            username={props.username}
            usernameOwner={username}
            createdAt={props.createdAt}
          ></Post>
        ))}
      </div>
      <Side username={username}></Side>
    </div>
  );
}
