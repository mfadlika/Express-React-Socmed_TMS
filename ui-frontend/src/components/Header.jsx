import { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import svgAssets from "../assets/svg-assets";
import { getNotif } from "../store/actions/notifAction";
import { userSignOut } from "../store/actions/userActions";
import { notifActions } from "../store/slices/notifSlice";
import { postActions } from "../store/slices/postSlice";
import "./Header.scss";

export default function Header() {
  const { logout } = svgAssets;
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
    <nav id="header">
      <div className="flex flex-row">
        <div className="basis-1/5">
          <Link className="brand text-xs underline" to="/">
            my.space
          </Link>
        </div>
        <div className="basis-3/5 flex flex-row">
          <NavLink className="basis-1/3 text-sm" to="/">
            Home
          </NavLink>
          <NavLink className="basis-1/3 text-sm" to="/profile">
            Profile
          </NavLink>
          {userInfo && (
            <NavLink className="notif basis-1/3 text-sm" to="/notification">
              Notification
              {notification[1] === undefined
                ? null
                : notification[1].length > 0 && (
                    <Badge className="badge" pill variant="primary">
                      {notification[1].length}
                    </Badge>
                  )}
            </NavLink>
          )}
        </div>
        <div className="basis-1/5">
          {userInfo ? (
            <Link className="logout text-sm" as={Link} onClick={signOutHandler}>
              {logout}
            </Link>
          ) : (
            <Link className="text-sm" as={Link} to="/signin">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
