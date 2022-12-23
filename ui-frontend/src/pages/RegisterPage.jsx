import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRegister } from "../store/actions/userActions";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const userSignin = useSelector((state) => state.user.userSignIn);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userRegister(email, username, password));
  };

  const userMatch = username.match(/^[A-Za-z0-9._]+$/);
  const emailMatch = email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/);
  const passwordMatch = password.match(
    /^(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,30}$/
  );

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    if (
      username.length >= 3 &&
      password.length >= 6 &&
      userMatch &&
      emailMatch &&
      passwordMatch
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    navigate,
    redirect,
    userInfo,
    username,
    password,
    isDisabled,
    userMatch,
    emailMatch,
    passwordMatch,
  ]);
  return (
    <div id="register">
      <div className="card-signin">
        <form onSubmit={submitHandler}>
          <div>
            <h1 className="text-3xl font-bold underline" htmlFor="register">
              Sign Up
            </h1>
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              maxLength="15"
              type="username"
              id="username"
              placeholder="Enter username"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label className="text-xs label-warning" htmlFor="username-warning">
              {username.length !== 0 &&
                !userMatch &&
                "username contains prohibited character"}
            </label>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label className="text-xs label-warning" htmlFor="email-warning">
              {email.length !== 0 && !emailMatch && "wrong email format"}
            </label>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              maxLength="30"
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label className="text-xs label-warning" htmlFor="password-warning">
              {password.length >= 6 &&
                !passwordMatch &&
                "password needs at least one special character"}
            </label>
          </div>
          <div>
            <label />
            <button
              disabled={isDisabled}
              className={
                isDisabled ? "signin-button-disabled" : "signin-button"
              }
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div>
            <label />
            <div>
              Already have an account?{" "}
              <Link className="register-link" to="/signin">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
