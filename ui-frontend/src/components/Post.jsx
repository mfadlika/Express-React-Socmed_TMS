import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import photo from "../assets/unknown.jpeg";
import style from "./Post.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Post(props) {
  const id = props._id;
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

    const { data } = await axios.post("/api/posting/postlike", {
      id,
      usernameOwner,
    });
    setLike(data);
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
    <Card key={props._id} className={style.card}>
      <NavLink
        as={Link}
        className={style.card_nav}
        to={`/${props.username}/status/${props._id}`}
      >
        <Row style={{ padding: "0", margin: "0" }}>
          <Col md={1} sm={1} className={style.col_img}>
            <Card.Img className={style.img} src={photo} alt="ava"></Card.Img>
          </Col>
          <Col md={11} sm={11} style={{ padding: "0" }}>
            <Card.Body as="h5" className={style.header}>
              {props.profileName && (
                <Card.Text className={style.text}>
                  {" "}
                  {props.profileName} &nbsp;
                </Card.Text>
              )}

              <object>
                <NavLink
                  className={style.navlink}
                  as={Link}
                  to={`/${props.username}`}
                >
                  @{props.username}
                </NavLink>
              </object>

              {!_id && (
                <React.Fragment>
                  <Card.Text className={style.text}>&nbsp;·&nbsp;</Card.Text>
                  <small>
                    <Card.Text>
                      {Math.trunc(time)} {timeUnit} ago
                    </Card.Text>
                  </small>
                </React.Fragment>
              )}

              {props.username === usernameOwner && _id ? (
                <Button className={style.header_button} onClick={deletePost}>
                  X
                </Button>
              ) : null}
            </Card.Body>
            <Card.Body style={{ padding: "0" }}>
              <Card.Text className={style.text}>{props.post}</Card.Text>
            </Card.Body>
            <Card.Body className={style.footer}>
              <object className={style.object}>
                <Button className={style.like_button} onClick={postLike}>
                  <span>
                    <small className="text-muted">
                      {isLike ? "❤️" : "🤍"}{" "}
                      {isLike
                        ? like.length
                        : like.length === 0
                        ? null
                        : like.length}
                    </small>
                  </span>
                </Button>
              </object>
            </Card.Body>
          </Col>
        </Row>
      </NavLink>
    </Card>
  );
}
