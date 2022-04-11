import React, { useState } from "react";
import Blog from "../models/Blog";
import Http from "../services/Http";
import { API_METHODS } from "../utils/dec";

const CreateBlog = ({ onCreate }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [blog, setBlog] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog((blog) => ({ ...blog, [name]: value }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const newBlog = new Blog(blog);
    Http.Post(API_METHODS.CREATE_BLOG, newBlog)
      .then((res) => {
        onCreate(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <button onClick={() => setIsFormOpen(!isFormOpen)}>create blog</button>
      {isFormOpen && (
        <form onSubmit={handleSumbit}>
          <fieldset>
            <label htmlFor="author">your name:</label>
            <input type="text" name="author" onChange={handleInputChange} />

            <label htmlFor="title">blogs title:</label>
            <input type="text" name="title" onChange={handleInputChange} />
            <button type="submit">publish blog</button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default CreateBlog;
