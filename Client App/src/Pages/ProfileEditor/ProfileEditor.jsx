import {
  Avatar,
  Button,
  Fab,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Http from "../../services/Http";
import UserContext from "../../services/UserContext";
import { API_METHODS } from "../../utils/dec";
import Profile from "../../models/Profile";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostsList from "../../components/PostsList";
import Loader from "../../components/Loader";
import PostEditor from "../../components/PostEditor";
import AddIcon from "@mui/icons-material/Add";
import BackButton from "../../components/BackButton";

const ProfileEditor = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isNew, setIsNew] = useState(!user.userProfileId);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const [selectedForEditPost, setSelectedForEditPost] = useState(null);

  useEffect(() => {
    if (isNew) return;
    Http.Get(`${API_METHODS.PROFILES}/${user.userProfileId}`)
      .then((res) => {
        setProfile(res);
        setIsDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const refreshPost = ({ id }) => {
    Http.Get(`${API_METHODS.POSTS}/${id}`).then((res) => {
      setProfile((profile) => {
        const postExists = profile.posts?.find((post) => post.id === res.id);
        if (postExists)
          return {
            ...profile,
            posts: profile.posts.map((post) =>
              post.id === res.id ? res : post
            ),
          };
        else return { ...profile, posts: [...(profile.posts || []), res] };
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((values) => ({ ...values, [name]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    const _profile = new Profile({
      ...profile,
      userId: user.id,
      userName: user.userName,
    });
    if (isNew) {
      Http.Post(API_METHODS.PROFILES, _profile)
        .then((res) => {
          setProfile(res);
          setUser((user) => ({ ...user, userProfileId: res.id }));
          setIsNew(false);
          setIsDataLoaded(true);
        })
        .catch((err) => console.error(err));
    } else {
      Http.Put(`${API_METHODS.PROFILES}/${profile._id}`, _profile).catch(
        (err) => console.log(err)
      );
    }
  };

  if (!isNew && !isDataLoaded) return <Loader />;

  return (
    <Grid
      maxWidth="100%"
      maxHeight="100%"
      container
      flexDirection="row"
      flexWrap="nowrap"
      padding={5}
      gap={10}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src="" alt={user.userName} sx={{ mb: 2 }} />
        <Typography component="h1" variant="h5">
          {user.userName}'s Profile
        </Typography>
        <Box
          component="form"
          onSubmit={handleProfileSave}
          sx={{ mt: 1, width: "xs" }}
        >
          <TextField
            label="Profile Title"
            name="title"
            onChange={handleChange}
            value={profile.title || ""}
            margin="normal"
            required
            fullWidth
            autoFocus
            size="small"
          />
          <TextField
            label="Profile Description"
            name="description"
            value={profile.description || ""}
            onChange={handleChange}
            margin="normal"
            multiline
            required
            fullWidth
            size="small"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="small"
          >
            {isNew ? "Create Profile" : "Update Profile"}
          </Button>
        </Box>
      </Box>
      <Box flexGrow={2}>
        {!isNew && (
          <Container sx={{ width: "fit-content", mb: 2 }}>
            <Fab
              color="primary"
              size="medium"
              onClick={() => setIsPostEditorOpen(true)}
              variant="extended"
            >
              <AddIcon fontSize="medium" sx={{ mb: 0.3, mr: 1 }} />
              Create New Post
            </Fab>
          </Container>
        )}
        <PostsList
          posts={profile.posts || []}
          editable
          handleEditClick={(post) => {
            setSelectedForEditPost(post);
            setIsPostEditorOpen(true);
          }}
        />
      </Box>
      <PostEditor
        isOpen={isPostEditorOpen}
        onClose={() => {
          setIsPostEditorOpen(false);
          setSelectedForEditPost(null);
        }}
        profileId={profile.id}
        onSave={refreshPost}
        existingPost={selectedForEditPost}
      />
    </Grid>
  );
};

export default ProfileEditor;
