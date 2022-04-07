import React from "react";
import { Link } from "react-router-dom";

const BlogListItem = ({ blog }) => {
  return (
    <div className="blog-list-item">
      <Link to={`/Blogs/${blog.id}`}>{blog.name}</Link>
      <h5 className="blog-author">{blog.author}</h5>
    </div>
  );
};

export default BlogListItem;
