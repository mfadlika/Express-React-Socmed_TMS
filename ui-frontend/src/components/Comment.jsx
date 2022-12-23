import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPost } from "../store/actions/postAction";

export default function Comment(props) {
  const userSignin = useSelector((state) => state.user.userSignIn);
  const isSent = useSelector((state) => state.post.status);
  const { userInfo } = userSignin;
  const { username } = userInfo || "";
  const userId = props.userId;
  const postId = props.postId;

  const [post, setPost] = useState("");

  const dispatch = useDispatch();

  const submitPostHandler = (e) => {
    e.preventDefault();
    dispatch(sendPost(post, username, "comment", userId, postId));
  };

  useEffect(() => {
    if (isSent) {
      setPost("");
    }
  }, [isSent, dispatch, username, userInfo]);
  return (
    <form
      className="comment"
      onSubmit={submitPostHandler}
      style={{ marginBottom: "15px" }}
    >
      <div>
        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Write your comment here"
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
