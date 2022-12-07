import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { getData, sendPost, setFalse } from "../store/actions/postAction";
import { toast } from "react-toastify";
import axios from "../axios";
import Post from "../components/Post";
import Loading from "../components/Loading";
import { postActions } from "../store/slices/postSlice";
import Side from "../components/Side";

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
  const { username } = userInfo || "";

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/signin";

  const [post, setPost] = useState("");

  const dispatch = useDispatch();
  const submitPostHandler = (e) => {
    e.preventDefault();
    dispatch(sendPost(post, username));
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
    <Container id="homepage">
      <div id="home">
        <Form onSubmit={submitPostHandler} style={{ marginBottom: "15px" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Hello {username}!!!</Form.Label>
            <Form.Control
              type="text"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="What's happening?"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {loading && <Loading />}
        {posts.map((props) => (
          <Post
            _id={props._id}
            like={props.like}
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
    </Container>
  );
}
