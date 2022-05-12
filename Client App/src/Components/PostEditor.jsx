import { Box, Button, TextField, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useContext, useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Post from "../models/Post";
import UserContext from "../services/UserContext";
import Http from "../services/Http";
import { API_METHODS } from "../utils/dec";

const PostEditor = ({ isOpen, onClose, existingPost, onSave }) => {
  const initialPostValues = {
    title: "",
    body: "",
  };
  const [post, setPost] = useState(initialPostValues);
  const { user } = useContext(UserContext);
  const isNew = !post.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((values) => ({ ...values, [name]: value }));
  };

  const handleCreate = (post) => {
    return Http.Post(API_METHODS.POSTS, post);
  };

  const handleEdit = (post) => {
    return Http.Put(`${API_METHODS.POSTS}/${post.id}`, post);
  };

  const handleSave = async () => {
    const _post = new Post({
      ...post,
      author: user.userName,
      profileId: user.userProfileId,
    });

    try {
      isNew
        ? await handleCreate(_post).then((res) => {
            setPost(res);
            onSave(res.id);
          })
        : await handleEdit(_post).then(() => onSave(post.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    existingPost ? setPost(existingPost) : setPost(initialPostValues);
  }, [existingPost]);

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={() => {
        setPost(initialPostValues);
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
        mt={6}
      >
        <Typography variant="h4" align="center">
          {isNew ? "Create New Post" : "Update Post"}
        </Typography>
        <TextField
          name="title"
          value={post.title}
          onChange={handleChange}
          label="Post Title"
          autoFocus
          sx={{
            mt: "5%",
            mb: "5%",
          }}
        />
        <TextField
          multiline
          minRows={4}
          name="body"
          value={post.body}
          onChange={handleChange}
          label="Post Body"
          sx={{ mb: "5%" }}
        />
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Drawer>
  );
};

export default PostEditor;
