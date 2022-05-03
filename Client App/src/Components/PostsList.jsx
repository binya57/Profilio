import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import PostCard from "./PostCard";
import PostEditor from "./PostEditor";

const PostsList = ({ posts, editable, handleEditClick, ...props }) => {
  return (
    <Box
      className="posts-list"
      display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="space-around"
      {...props}
    >
      {posts.map((post) => (
        <Box mb="1rem" width="100%" key={post.id}>
          <PostCard
            post={post}
            editable={editable}
            onEditClick={() => handleEditClick(post)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PostsList;
