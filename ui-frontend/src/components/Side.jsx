import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import "./Side.scss";

export default function Side(props) {
  const [whoToFollow, setWhoToFollow] = useState([{}]);

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
    <div id="side">
      <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-black">
            Who To Follow
          </h5>
        </div>
        {whoToFollow.map((props, num) => {
          if (props === null) {
            return null;
          }
          return (
            <Link to={`/${props.username}`} key={num} className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={props.picture}
                        alt="Neil"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {props.profileName}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        @{props.username}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
