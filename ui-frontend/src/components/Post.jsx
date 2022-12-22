import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import svg from "../assets/svg-assets";
import axios from "../axios";
import style from "./Post.scss";

export default function Post(props) {
  const { love, loved, comment, xMark } = svg;
  const id = props._id;
  const userSignin = useSelector((state) => state.user.userSignIn);
  const { userInfo } = userSignin;
  const usernameOwner = props.usernameOwner;
  var dateNow = new Date();
  var date = new Date(props.createdAt);
  var time = (dateNow - date) / 1000;
  var timeUnit = "seconds";
  const [like, setLike] = useState(props.like);
  const [isLike, setIsLike] = useState(
    like.some((e) => e.liker === usernameOwner)
  );
  const [isDelete, setIsDelete] = useState(false);
  const { _id } = useParams();

  const navigate = useNavigate();

  if (time >= 86400) {
    time /= 86400;
    if (time < 2) {
      timeUnit = "day";
    } else {
      timeUnit = "days";
    }
  } else if (time > 3600) {
    time /= 3600;
    if (time < 2) {
      timeUnit = "hour";
    } else {
      timeUnit = "hours";
    }
  } else if (time >= 60) {
    time /= 60;
    if (time < 2) {
      timeUnit = "minute";
    } else {
      timeUnit = "minutes";
    }
  } else if (time > 0 && time < 2) {
    timeUnit = "second";
  }

  async function postLike(e) {
    e.stopPropagation();
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/posting/postlike",
        {
          id,
          usernameOwner,
        },
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );
      setLike(data);
    } catch (err) {
      toast("you need to log in to like this post");
    }
  }

  async function deletePost(e) {
    e.stopPropagation();
    e.preventDefault();
    try {
      await axios
        .delete(`/api/posting/${props.username}/status/${props._id}`, {
          data: {
            username: props.username,
          },
        })
        .then(setIsDelete(true));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isDelete) {
      console.log(isDelete);
      toast("Post has been deleted");
      setIsDelete(false);
      navigate("/");
    }
    if (like.some((e) => e.liker === usernameOwner)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [like, isLike, usernameOwner, isDelete, navigate]);

  return (
    <div className="post max-w-sm w-full lg:max-w-full lg:flex">
      <Link
        to={`/${props.username}/status/${props._id}`}
        className="border-r border-b border-l border-t border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
      >
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={props.image}
            alt="profile"
          />
          <div className="username basis-4/5 text-sm">
            <p className="text-gray-900 leading-none">
              {props.profileName}
              {!_id && (
                <small>
                  &nbsp;·&nbsp;{Math.trunc(time)} {timeUnit} ago
                </small>
              )}
              <object>
                <Link to={`/${props.username}`}>@{props.username}</Link>
              </object>
            </p>
          </div>
          {props.username === usernameOwner && _id ? (
            <button className="basis-1/5 del-button" onClick={deletePost}>
              <div>{xMark}</div>
            </button>
          ) : null}
        </div>
        <div>
          <p className="text-gray-700 text-base">{props.post}</p>
        </div>
        <div className="flex">
          <div className="basis-1/5">
            <object className={style.object}>
              <button
                style={{ display: "flex", alignItems: "center" }}
                onClick={postLike}
              >
                {isLike ? loved : love}
                <div>
                  &nbsp;&nbsp;
                  {isLike
                    ? like.length
                    : like.length === 0
                    ? null
                    : like.length}
                </div>
              </button>
            </object>
          </div>
          <div className="basis-1/5">
            <object className={style.object}>
              <button
                style={{ display: "flex", alignItems: "center" }}
                to={`/${props.username}/status/${props._id}`}
              >
                {comment}
                <div>
                  &nbsp;&nbsp;
                  {props.comment > 0 && props.comment}
                </div>
              </button>
            </object>
          </div>
        </div>
      </Link>
    </div>
  );
}
