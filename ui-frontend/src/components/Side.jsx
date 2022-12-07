import React, { useState } from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../axios";
import style from "./Side.module.css";

export default function Side(props) {
  const [whoToFollow, setWhoToFollow] = useState([]);

  useEffect(() => {
    async function getWhoToFollow() {
      try {
        const { data } = await axios.get(`/api/user/random`, {
          headers: { username: props.username },
        });
        new Promise(function (resolve, reject) {
          resolve();
        }).then(() => {
          setWhoToFollow(data);
        });
      } catch (err) {
        console.log(err);
      }
    }
    getWhoToFollow();
  }, [props.username]);

  return (
    <div id="side" className={style.side}>
      <Card className={style.card}>
        <Card.Header>People to follow</Card.Header>
        <Card.Body>
          {whoToFollow.map((props, num) => {
            return (
              <React.Fragment key={num}>
                {props === null ? null : (
                  <Card.Text
                    as={Link}
                    to={`/${props}`}
                    style={{ textDecoration: "none" }}
                  >
                    {props}
                  </Card.Text>
                )}
                <br></br>
              </React.Fragment>
            );
          })}{" "}
        </Card.Body>
      </Card>
    </div>
  );
}
