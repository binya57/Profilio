import {
  Box,
  Button,
  Container,
  FormLabel,
  IconButton,
  TextField,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Post from "../models/Post";
import UserContext from "../services/UserContext";
import Http from "../services/Http";
import { API_METHODS } from "../utils/dec";

const PostEditor = ({ isOpen, onClose, profileId, existingPost, onSave }) => {
  const initialPostValues = {
    title: "",
    body: "",
  };
  const [post, setPost] = useState(existingPost || initialPostValues);
  const [isNew, setIsNew] = useState(!existingPost);

  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((values) => ({ ...values, [name]: value }));
  };

  const savePost = () => {
    const newPost = new Post({
      ...post,
      author: user.userName,
      profileId: profileId || existingPost.profileId,
    });
    isNew
      ? Http.Post(API_METHODS.POSTS, newPost)
          .then((res) => {
            setPost(res);
            setIsNew(false);
            onSave?.(res);
          })
          .catch((err) => console.error(err))
      : Http.Put(`${API_METHODS.POSTS}/${post.id}`, newPost)
          .then((res) => {
            onSave?.(post);
          })
          .catch((err) => console.error(err));
  };

  useEffect(() => {
    setPost(existingPost || initialPostValues);
    setIsNew(!existingPost);
  }, [existingPost]);

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={() => {
        setPost(initialPostValues);
        setIsNew(!existingPost);
        onClose();
      }}
      PaperProps={{ sx: { height: "100vh" } }}
    >
      <Button color="primary" onClick={onClose}>
        <ArrowBackIosNewIcon sx={{ transform: "rotate(270deg)" }} />
      </Button>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        width="30%"
        margin="auto"
      >
        <TextField
          name="title"
          value={post.title}
          onChange={handleChange}
          label="post title"
          autoFocus
          sx={{
            mt: "5%",
            mb: "5%",
          }}
        />
        <TextField
          multiline
          name="body"
          value={post.body}
          onChange={handleChange}
          label="post body"
          sx={{ mb: "5%" }}
        />
        <Button variant="contained" onClick={savePost}>
          Save
        </Button>
      </Box>
    </Drawer>
  );
};

export default PostEditor;
