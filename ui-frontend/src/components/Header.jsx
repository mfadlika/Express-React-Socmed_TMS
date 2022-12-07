import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import style from "./Header.module.css";
import { userSignOut } from "../store/actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getNotif } from "../store/actions/notifAction";
import { notifActions } from "../store/slices/notifSlice";
import { postActions } from "../store/slices/postSlice";

export default function Header() {
  const { userInfo } = useSelector((state) => state.user.userSignIn);
  const { notification } = useSelector((state) => state.notification) || [[]];
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/signin";

  const dispatch = useDispatch();

  const signOutHandler = (e) => {
    e.preventDefault();
    dispatch(userSignOut());
    dispatch(notifActions.signOut());
    dispatch(postActions.signOut());
    navigate(redirect);
  };

  useEffect(() => {
    if (userInfo) {
      const intervalId = setInterval(() => {
        dispatch(getNotif(userInfo.username));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [dispatch, userInfo, notification]);

  return (
    <Navbar bg="dark" id="header" className={style.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={style.navlink}>
          to-my.space
        </Navbar.Brand>
        <Nav className={style.nav}>
          <Nav.Link className={style.navlink} as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link className={style.navlink} as={NavLink} to="/profile">
            Profile
          </Nav.Link>
          {userInfo && (
            <Nav.Link className={style.navlink} as={NavLink} to="/notification">
              Notification{" "}
              {notification[1] === undefined
                ? null
                : notification[1].length > 0 && (
                    <Badge className={style.badge} pill variant="primary">
                      {notification[1].length}
                    </Badge>
                  )}
            </Nav.Link>
          )}
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
