import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import photo from "../assets/unknown.jpeg";
import style from "./Post.module.css";

export default function Post(props) {
  var dateNow = new Date();
  var date = new Date(props.createdAt);
  var time = (dateNow - date) / 1000;
  var timeUnit = "seconds";

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
  }

  return (
    <Card key={props._id} style={{ marginTop: "15px" }}>
      <NavLink
        as={Link}
        className={style.card}
        to={`/${props.username}/status/${props._id}`}
      >
        <Row>
          <Col md={2}>
            <Card.Img
              style={{ width: "100%" }}
              src={photo}
              alt="ava"
            ></Card.Img>
          </Col>
          <Col md={10}>
            <Card.Header as="h5" className={style.header}>
              <object>
                <NavLink
                  className={style.navlink}
                  as={Link}
                  to={`/${props.username}`}
                >
                  @{props.username}
                </NavLink>
              </object>
              <Card.Text>&nbsp;·&nbsp;</Card.Text>
              <Card.Text>
                {Math.trunc(time)} {timeUnit} ago
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Card.Text>{props.post}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </NavLink>
    </Card>
  );
}
