import React from "react";
import { Link } from "react-router-dom";

const PostListItem = ({ post }) => {
  return (
    <div className="post-list-item">
      <Link to={`/Posts/${post._id}`}>{post.title}</Link>
      <span>{post.author}</span>
      <p>{post.body}</p>
    </div>
  );
};

export default PostListItem;
