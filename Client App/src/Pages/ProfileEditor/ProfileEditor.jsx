import { Avatar, Button, Typography } from "@mui/material";
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

const ProfileEditor = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [isNew, setIsNew] = useState(!user.userProfileId);

  useEffect(() => {
    if (isNew) return;
    Http.Get(`${API_METHODS.PROFILES}/${user.userProfileId}`)
      .then(setProfile)
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
        })
        .catch((err) => console.error(err));
    } else {
      Http.Put(`${API_METHODS.PROFILES}/${profile._id}`, _profile).catch(
        (err) => console.log(err)
      );
    }
  };

  return (
    <Box width="100%" height="100%">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "5%",
          maxWidth: "50%",
        }}
      >
        <Box alignSelf="flex-start">
          <Link to="/">
            <ArrowBackIcon fontSize="large" />
          </Link>
        </Box>
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
      <PostsList posts={profile.posts || []} />
    </Box>
  );
};

export default ProfileEditor;
