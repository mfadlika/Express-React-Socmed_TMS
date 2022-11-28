import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import photo from "../assets/unknown.jpeg";

export default function Post(props) {
  return (
    <Card key={props._id} style={{ marginTop: "15px" }}>
      <Row>
        <Col md={2}>
          <Card.Img style={{ width: "100%" }} src={photo} alt="ava"></Card.Img>
        </Col>
        <Col md={10}>
          <Card.Header as="h5">
            <NavLink as={Link} to={`/${props.username}`}>
              {props.username}
            </NavLink>
          </Card.Header>
          <Card.Body>
            <Card.Text>{props.post}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
