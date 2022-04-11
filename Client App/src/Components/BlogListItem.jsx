import React from "react";
import { Link } from "react-router-dom";

const BlogListItem = ({ blog }) => {
  return (
    <div className="blog-list-item">
      <Link to={`/Blogs/${blog._id}`}>{blog.title}</Link>
      <span className="blog-author">{blog.author}</span>
    </div>
  );
};

export default BlogListItem;
