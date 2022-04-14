import React, { useState, useEffect } from "react";
import Http from "../services/Http";
import { API_METHODS } from "../utils/dec";
import CreatePost from "./CreatePost";
import PostListItem from "./PostListItem";

const PostsList = ({ blogId, posts, addPost }) => {
  return (
    <>
      <CreatePost blogId={blogId} onCreate={addPost} />

      {posts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </>
  );
};

export default PostsList;
