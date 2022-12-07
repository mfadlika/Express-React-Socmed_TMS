import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import Post from "../components/Post";

export default function StatusPage(props) {
  const { userId, _id } = useParams();
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.user.userSignIn);
  const { userInfo } = userSignin;
  const { username } = userInfo || "";
  const [post, setPosts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios.get(
          `/api/posting/${userId}/status/${_id}`,
          {
            headers: { username: userId },
          }
        );
        new Promise(function (resolve, reject) {
          resolve();
        }).then(() => setPosts([data]));
      } catch (err) {
        toast.error("Post can't be found or may have been removed.");
        setIsError(true);
      }
    }
    getPost();
  }, [userId, _id, dispatch]);

  return (
    <Container>
      {isError ? (
        <Container>Post can't be found or may have been removed.</Container>
      ) : (
        post.map((props) => (
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
        ))
      )}
    </Container>
  );
}
