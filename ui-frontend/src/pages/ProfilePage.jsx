import React, { useEffect, useReducer, useState } from "react";
import { Container, Card, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import Post from "../components/Post";
import photo from "../assets/unknown.jpeg";
import { userFollow, userUnfollow } from "../store/actions/userActions";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { postActions } from "../store/slices/postSlice";
import Loading from "../components/Loading";

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
    getPost();
    dispatch(postActions.setLoading());
  }, [dispatch, userId, username]);

  return (
    <Container>
      <Card>
        <Row>
          <Col md={2}>
            <Card.Img
              style={{ width: "100%" }}
              src={photo}
              alt="ava"
            ></Card.Img>
          </Col>
          <Col md={10}>
            <Card.Body>
              {userId === username ? (
                <Card.Text>@{username}</Card.Text>
              ) : (
                <Card.Text>@{user}</Card.Text>
              )}
            </Card.Body>
            {username === userId ||
            !userInfo ||
            followButton === "null" ? null : following.includes(userId) ? (
              <Button onClick={unfollow}>Unfollow</Button>
            ) : (
              <Button onClick={follow}>Follow</Button>
            )}
          </Col>
        </Row>
      </Card>
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
    </Container>
  );
}
