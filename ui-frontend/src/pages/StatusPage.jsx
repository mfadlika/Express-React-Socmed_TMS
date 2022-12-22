import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import Comment from "../components/Comment";
import Post from "../components/Post";
import { setFalse } from "../store/actions/postAction";
import { baseURL } from "../utils";

export default function StatusPage(props) {
  const { userId, _id } = useParams();
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.user.userSignIn);
  const isSent = useSelector((state) => state.post.status);
  const { userInfo } = userSignin;
  const { username } = userInfo || "";
  const [post, setPosts] = useState([]);
  const [[comments], setComments] = useState([[]]);
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
        })
          .then(() => setPosts([data[0]]))
          .then(() => setComments([data[1]]));
      } catch (err) {
        toast.error("Post can't be found or may have been removed.");
        setIsError(true);
      }
    }
    getPost();
    if (isSent) {
      toast("post sent");
      dispatch(setFalse());
      window.location.reload();
    }
  }, [userId, _id, dispatch, isSent]);

  return (
    <Container>
      {isError ? (
        <Container>Post can't be found or may have been removed.</Container>
      ) : (
        <React.Fragment>
          {post.map((props) => (
            <Post
              _id={props._id}
              like={props.like}
              image={`${baseURL}/api/user/${props.username}/profile-picture`}
              post={props.post}
              key={props._id}
              comment={props.comment}
              profileName={props.profileName}
              username={props.username}
              usernameOwner={username}
              createdAt={props.createdAt}
            ></Post>
          ))}
        </React.Fragment>
      )}
      <Comment postId={_id} userId={userId}></Comment>
      {isError ? (
        <Container>Post can't be found or may have been removed.</Container>
      ) : (
        <React.Fragment>
          {comments.map((props) => (
            <Post
              _id={props._id}
              like={props.like}
              comment={props.comment}
              image={`${baseURL}/api/user/${props.username}/profile-picture`}
              post={props.post}
              key={props._id}
              profileName={props.profileName}
              username={props.username}
              usernameOwner={username}
              createdAt={props.createdAt}
            ></Post>
          ))}
        </React.Fragment>
      )}
    </Container>
  );
}
