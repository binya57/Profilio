import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Http from "../services/Http";
import UserContext from "../services/UserContext";
import { API_METHODS } from "../utils/dec";
import PostCard from "./PostCard";
import PostEditor from "./PostEditor";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const PostsList = ({ posts, editable, profileUserId, ...props }) => {
  const { user } = useContext(UserContext);
  const isProfileNew = !user.userProfileId;

  const [posts_internal, setPosts_internal] = useState(posts);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [inEditPost, setInEditPost] = useState(null);

  const handleCreatePostClick = () => {
    setIsEditorOpen(true);
  };

  const handleEditPostClick = (post) => {
    setInEditPost(post);
    setIsEditorOpen(true);
  };

  const handleEditorClose = () => {
    setIsEditorOpen(false);
    setInEditPost(null);
  };

  const handlePostSave = (postId) => {
    Http.Get(`${API_METHODS.POSTS}/${postId}`).then((res) => {
      setPosts_internal((_posts) => {
        const isExists = _posts.find((_post) => _post.id == postId);
        if (isExists)
          return _posts.map((_post) =>
            _post.id == postId ? { ..._post, res } : _post
          );
        else return [..._posts, res];
      });
    });
  };

  useEffect(() => {
    setPosts_internal(posts);
  }, [posts]);

  return (
    <Box
      className="posts-list"
      display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="space-around"
      width="100%"
      {...props}
    >
      {!isProfileNew && user.id === profileUserId && (
        <>
          <Fab
            color="primary"
            size="medium"
            onClick={handleCreatePostClick}
            variant="extended"
            sx={{ mb: 3 }}
          >
            <AddIcon fontSize="medium" sx={{ mb: 0.3, mr: 1 }} />
            Create New Post
          </Fab>
          <PostEditor
            isOpen={isEditorOpen}
            onClose={handleEditorClose}
            existingPost={inEditPost}
            onSave={handlePostSave}
          />
        </>
      )}{" "}
      {posts_internal.map((post) => (
        <Box mb="1rem" width="inherit" key={post.id}>
          <PostCard
            post={post}
            editable={editable}
            onEditClick={handleEditPostClick}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PostsList;
