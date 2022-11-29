import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { userSignOut } from "../store/actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header(props) {
  const { userInfo } = useSelector((state) => state.user.userSignIn);
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/signin";

  const dispatch = useDispatch();

  const signOutHandler = (e) => {
    e.preventDefault();
    dispatch(userSignOut());
    navigate(redirect);
  };

  return (
    <Navbar bg="dark" className={style.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={style.navlink}>
          to-my.space
        </Navbar.Brand>
        <Nav className={style.nav}>
          <Nav.Link className={style.navlink} as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link className={style.navlink} as={Link} to="/profile">
            Profile
          </Nav.Link>
        </Nav>
        <Nav className={style.nav}>
          {userInfo ? (
            <Nav.Link
              className={style.navlink}
              as={Link}
              onClick={signOutHandler}
            >
              Log Out
            </Nav.Link>
          ) : (
            <Nav.Link className={style.navlink} as={Link} to="/signin">
              Sign In
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
