import React from "react";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import photo from "../assets/unknown.jpeg";
import axios from "../axios";
import style from "../components/Post.module.css";
import { getData } from "../store/actions/postAction";

export default function StatusPage(props) {
  const { userId, _id } = useParams();
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.user.userSignIn);
  const { userInfo } = userSignin;
  const { username } = userInfo || "";

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : `/${userId}`;

  async function deletePost() {
    try {
      await axios
        .delete(`/api/posting/${userId}/status/${_id}`, {
          data: {
            username: username,
          },
        })
        .then(toast("Post has been deleted"))
        .then(navigate(redirect));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getPost() {
      const { data } = await axios.get(`/api/posting/${userId}/status/${_id}`, {
        headers: { username: userId },
      });
      dispatch(getData(data));
    }
    getPost();
  }, [userId, _id, dispatch]);

  return (
    <Container>
      {posts.map((props) => {
        return (
          <Card key={props._id} style={{ marginTop: "15px" }}>
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
                  {username === userId ? (
                    <Button
                      className={style.header_button}
                      onClick={deletePost}
                    >
                      X
                    </Button>
                  ) : null}
                </Card.Header>
                <Card.Body>
                  <Card.Text>{props.post}</Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        );
      })}
    </Container>
  );
}
