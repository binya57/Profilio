import React, { useState } from "react";
import Post from "../models/Post";
import Http from "../services/Http";
import { API_METHODS } from "../utils/dec";

const CreatePost = ({ onCreate }) => {
  const [inputValues, setInputValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleCreate = () => {
    const newPost = new Post(inputValues);
    Http.Post(API_METHODS.CREATE_POST, newPost)
      .then((res) => {
        console.log(res);
        onCreate(res);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="create-post">
      <label htmlFor="title">post title</label>
      <input
        value={inputValues.title || ""}
        onChange={handleChange}
        type="text"
        name="title"
      />
      <textarea
        value={inputValues.body || ""}
        onChange={handleChange}
        name="body"
      ></textarea>
      <button onClick={handleCreate}>create post</button>
    </div>
  );
};

export default CreatePost;
