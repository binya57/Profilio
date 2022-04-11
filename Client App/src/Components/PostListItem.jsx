import React from "react";

const PostListItem = ({ post }) => {
  return (
    <div className="post">
      <span>{post.title}</span>
      <span>{post.author}</span>
      <p>{post.body}</p>
    </div>
  );
};

export default PostListItem;
