import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRegister } from "../store/actions/userActions";

export default function Register() {
  const [email, setEmail] = useState("");
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
    dispatch(userRegister(email, username, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
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
          </div>
          <div>
            <label />
            <button className="signin-button" type="submit">
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
