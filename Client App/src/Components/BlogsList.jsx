import React, { useEffect, useState } from "react";
import Http from "../services/Http";
import { API_METHODS } from "../utils/dec";
import BlogListItem from "./BlogListItem";
import CreateBlog from "./CreateBlog";

const BlogsList = () => {
  const [blogsList, setBlogsList] = useState([]);

  const getBlogs = () => {
    Http.Get(API_METHODS.ALL_BLOGS)
      .then(setBlogsList)
      .catch((err) => console.error(err));
  };
  useEffect(getBlogs, []);

  return (
    <div className="blogs-list-container">
      <CreateBlog
        onCreate={(newBlog) => setBlogsList((blogs) => [...blogs, newBlog])}
      />
      {blogsList.map((blog) => (
        <BlogListItem blog={blog} key={blog._id} />
      ))}
    </div>
  );
};

export default BlogsList;
