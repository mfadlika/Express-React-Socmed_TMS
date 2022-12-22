import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { userActions } from "../store/slices/userSlice";

export default function UploadPhoto() {
  const [image, setImage] = useState("");
  const { userInfo } = useSelector((state) => state.user.userSignIn);
  const [name, setName] = useState(userInfo.profileName);
  const [bio, setBio] = useState(userInfo.bio);
  const [gender, setGender] = useState(userInfo.gender);
  const { userId } = useParams();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (image) {
      const fileExtension = image.name.split(".").at(-1).toLowerCase();
      const allowedFileTypes = ["jpg", "png", "jpeg"];
      if (!allowedFileTypes.includes(fileExtension)) {
        window.alert(
          `File does not support. File type must be ${allowedFileTypes.join(
            ", "
          )}`
        );
        return false;
      }
      if (image.size > 3 * 1000 * 1000) {
        window.alert("Please upload a file smaller than 3 MB");
        return false;
      }
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("gender", gender);
    formData.append("bio", bio);
    formData.append("name", name);
    try {
      const data = await axios.post(
        `/api/user/${userId}/editprofile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(
        userActions.signIn({
          data: data.data,
        })
      );
      localStorage.setItem("userInfo", JSON.stringify(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div id="edit-profile">
      <div className="card-edit">
        <form onSubmit={submitHandler}>
          <div>
            <h1 className="text-3xl font-bold underline" htmlFor="register">
              Edit Profile
            </h1>
          </div>
          <div>
            <label htmlFor="image">Upload image</label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="image"
              type="file"
              onChange={handleFileSelect}
            />
          </div>
          <div>
            <label htmlFor="name">Change your profile name</label>
            <input
              type="text"
              maxLength="20"
              id="name"
              defaultValue={userInfo.profileName}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="bio">Change your bio</label>
            <input
              type="text"
              maxLength="50"
              id="image"
              defaultValue={userInfo.bio}
              onChange={(e) => setBio(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="gender">Select your gender</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              defaultValue={userInfo.gender === null ? "null" : userInfo.gender}
              id="countries_disabled"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="null">Choose not to display</option>
            </select>
          </div>
          <div>
            <label />
            <button className="edit-button" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
