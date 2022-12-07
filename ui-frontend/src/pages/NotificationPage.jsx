import React from "react";
import { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../axios";

export default function NotificationPage() {
  const { notification } = useSelector((state) => state.notification);
  const userSignin = useSelector((state) => state.user.userSignIn);
  const { userInfo } = userSignin;
  const { username } = userInfo;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await axios.post("/api/notification", { username });
    }, 3000);
    return () => clearInterval(intervalId);
  }, [username]);

  return (
    <Container>
      {notification[0] === undefined
        ? null
        : notification[0].map((props) => {
            return (
              <Card
                as={Link}
                to={
                  props.type === "follow"
                    ? `/${props.follower[props.follower.length - 1]}/`
                    : `/${props.username}/status/${props.postId}`
                }
                key={props._id}
                style={{
                  textDecoration: "none",
                  marginTop: "15px",
                  color: "black",
                }}
                className={props.seen}
              >
                {props.type === "follow" && props.follower.length === 1 && (
                  <Card.Text style={{ paddingLeft: "15px" }}>
                    {props.follower[0]} follows you
                  </Card.Text>
                )}
                {props.type === "like" && props.liker.length > 2 && (
                  <React.Fragment>
                    <Card.Header>
                      {props.liker[props.liker.length - 1] === username
                        ? "you"
                        : props.liker[props.liker.length - 1]}{" "}
                      and {props.liker.length - 1} people like your post:
                      <Card.Text>"{props.post}"</Card.Text>
                    </Card.Header>
                  </React.Fragment>
                )}
                {props.type === "like" && props.liker.length === 2 && (
                  <React.Fragment>
                    <Card.Header>
                      {props.liker[props.liker.length - 1] === username
                        ? "you"
                        : props.liker[props.liker.length - 1]}{" "}
                      and {props.liker[0] === username ? "you" : props.liker[0]}{" "}
                      like your post:
                      <Card.Text> "{props.post}"</Card.Text>
                    </Card.Header>
                  </React.Fragment>
                )}
                {props.type === "like" && props.liker.length === 1 && (
                  <React.Fragment>
                    <Card.Header>
                      {" "}
                      {props.liker[0] === username
                        ? "you like "
                        : `${props.liker[0]} likes `}
                      your post: <Card.Text>"{props.post}"</Card.Text>
                    </Card.Header>
                  </React.Fragment>
                )}
              </Card>
            );
          })}
    </Container>
  );
}
