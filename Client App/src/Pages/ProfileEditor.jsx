import { Avatar, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Http from "../services/Http";
import UserContext from "../services/UserContext";
import { API_METHODS } from "../utils/dec";
import Profile from "../models/Profile";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProfileEditor = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({
    userId: user._id,
    userName: user.userName,
  });

  const isNew = !profile._id;

  useEffect(() => {
    Http.Get(`${API_METHODS.USER_PROFILE}/${user._id}`)
      .then(setProfile)
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((values) => ({ ...values, [name]: value }));
  };

  const handleCreateProfile = (e) => {
    e.preventDefault();
    const _profile = new Profile(profile);
    if (isNew) {
      Http.Post(API_METHODS.PROFILES, _profile)
        .then(setProfile)
        .catch((err) => console.error(err));
    } else {
      Http.Put(`${API_METHODS.PROFILES}/${profile._id}`, _profile).catch(
        (err) => console.log(err)
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Link to="/">
        <ArrowBackIcon />
      </Link>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src="#" alt={user.userName} sx={{ mb: 2 }} />
        <Typography component="h1" variant="h5">
          {user.userName}'s Profile
        </Typography>
        <Box component="form" onSubmit={handleCreateProfile} sx={{ mt: 1 }}>
          <TextField
            label="Profile Title"
            name="title"
            onChange={handleChange}
            value={profile.title || ""}
            margin="normal"
            required
            fullWidth
            autoFocus
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isNew ? "Create Profile" : "Update Profile"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileEditor;
