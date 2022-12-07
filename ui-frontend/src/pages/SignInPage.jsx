import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userSignIn } from "../store/actions/userActions";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const userSignin = useSelector((state) => state.user.userSignIn);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userSignIn(username, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div id="signin">
      <Card>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <h1 htmlFor="signin">Sign In</h1>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="username"
              id="username"
              placeholder="Enter username"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label />
            <Button className="primary" type="submit">
              Sign In
            </Button>
          </Form.Group>
          <Form.Group>
            <Form.Label />
            <div>
              New here? <Link to="/register">Create your account</Link>
            </div>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}
