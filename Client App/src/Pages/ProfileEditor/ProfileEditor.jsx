import { Avatar, Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import Http from "../../services/Http";
import UserContext from "../../services/UserContext";
import { API_METHODS } from "../../utils/dec";
import Profile from "../../models/Profile";
import PostsList from "../../components/PostsList";
import Loader from "../../components/Loader";

const ProfileEditor = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isNew, setIsNew] = useState(!user.userProfileId);

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
      maxHeight="93%"
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
          maxWidth: 1 / 2,
        }}
      >
        <Avatar src="" alt={user.userName} sx={{ mb: 2 }} />
        <Typography component="h1" variant="h5">
          {user.userName}'s Profile
        </Typography>
        <Box component="form" onSubmit={handleProfileSave} sx={{ mt: 1 }}>
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
            minRows={4}
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
      <Box width={1 / 2}>
        <PostsList posts={profile.posts || []} editable />
      </Box>
    </Grid>
  );
};

export default ProfileEditor;
