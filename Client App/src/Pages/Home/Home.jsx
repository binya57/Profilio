import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Http from "../../services/Http";
import { API_METHODS } from "../../utils/dec";
import UserContext from "../../services/UserContext";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ProfileList from "./ProfileList";
import { Box } from "@mui/system";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import "./Home.css";
import PostsList from "../../components/PostsList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PostEditor from "../../components/PostEditor";

const Home = () => {
  const [selectedProfile, setSelectedProfile] = useState();
  const [selectedForEditPost, setSelectedForEditPost] = useState(null);
  const { user, logOut } = useContext(UserContext);

  const handleProfileItemSelect = (id) => {
    id !== selectedProfile?.id &&
      Http.Get(`${API_METHODS.PROFILES}/${id}`).then(setSelectedProfile);
  };

  return (
    <div className="home">
      <Box className="home-content">
        <Box className="profile-list-side">
          <ProfileList
            onItemSelect={handleProfileItemSelect}
            selectedId={selectedProfile?.id}
          />
        </Box>

        <Box className="profile-view-side">
          {selectedProfile && (
            <>
              <Avatar src="#" alt={selectedProfile.userName} />
              <Typography variant="h3">{selectedProfile.userName}</Typography>
              <Typography variant="h4">{selectedProfile.title}</Typography>
              <Typography component="p">
                {selectedProfile.description}
              </Typography>
              <Box maxHeight="73%" overflow="auto" width="80%">
                <PostsList
                  posts={selectedProfile?.posts}
                  editable={selectedProfile.userId === user.id}
                  handleEditClick={setSelectedForEditPost}
                />
                {selectedForEditPost && (
                  <PostEditor
                    existingPost={selectedForEditPost}
                    onSave={() => setSelectedForEditPost(null)}
                  />
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
