import Box from "@mui/material/Box";
import React from "react";
import PostCard from "./PostCard";

const PostsList = ({ posts, editable }) => {
  return (
    <Box className="posts-list">
      {posts.map((post) => (
        <PostCard post={post} editable={false} />
      ))}
    </Box>
  );
};

export default PostsList;
