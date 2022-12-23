import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FollowingList(props) {
  const navigate = useNavigate();

  const data = props.data;

  const toggle = props.toggle;

  useEffect(() => {
    if (data || toggle) {
    }
  }, [data, toggle]);
  return (
    <React.Fragment>
      <div
        id="crypto-modal"
        tabIndex="-1"
        aria-hidden={props.isHidden === "" ? "true" : "false"}
        className={`fixed top-20 left-0 right-0 z-50 w-full p-4 ${
          props.isHidden === "" ? "hidden" : ""
        } overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={toggle}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="crypto-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="black"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-black">
                {props.isHidden}: {data.length}
              </h3>
            </div>

            <div className="p-6">
              <ul className="my-4 space-y-3">
                {data === [] ? (
                  <div></div>
                ) : (
                  data.map((props, num) => {
                    return (
                      <li key={num}>
                        <Link
                          to={`/${props.username}`}
                          onClick={() => {
                            toggle();
                            navigate(`/${props.username}`);
                          }}
                          className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={props.picture}
                            alt="list"
                          ></img>
                          <span className="flex-1 ml-3 whitespace-nowrap">
                            {props.username}
                          </span>
                        </Link>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
