import React, { useState, useEffect } from "react";
import Http from "../services/Http";
import { API_METHODS } from "../utils/dec";
import CreatePost from "./CreatePost";
import PostListItem from "./PostListItem";

const PostsList = () => {
  const [postsList, setPostsList] = useState([]);
  const getPosts = () => {
    Http.Get(API_METHODS.ALL_POSTS)
      .then(setPostsList)
      .catch((err) => {
        throw err;
      });
  };

  const addToPostList = (newPost) =>
    setPostsList((posts) => [...posts, newPost]);

  useEffect(getPosts, []);

  return (
    <>
      <CreatePost onCreate={addToPostList} />

      {postsList.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </>
  );
};

export default PostsList;
