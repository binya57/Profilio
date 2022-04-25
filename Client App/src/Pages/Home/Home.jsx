import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Http from "../../services/Http";
import { API_METHODS } from "../../utils/dec";
import UserContext from "../../services/UserContext";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileList from "./ProfileList";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";

const Home = () => {
  const [selectedProfile, setSelectedProfile] = useState();

  const handleProfileItemSelect = (id) => {
    id !== selectedProfile &&
      Http.Get(`${API_METHODS.PROFILES}/${id}`).then(setSelectedProfile);
  };

  return (
    <div className="home" style={{ width: "100%", height: "100%" }}>
      <Link component={RouterLink} to="/MyProfile">
        <AccountCircleIcon />
      </Link>
      <Box
        sx={{
          maxWidth: "25%",
          height: "96.5%",
          borderRight: "1px solid black",
          borderTop: "1px solid black",
        }}
      >
        <ProfileList onItemSelect={handleProfileItemSelect} />
      </Box>
      <Box sx={{ float: "right" }}>
        {selectedProfile && (
          <>
            <Avatar src="#" alt={selectedProfile.userName} />
            <Typography variant="h3">{selectedProfile.userName}</Typography>
            <Typography variant="h4">{selectedProfile.title}</Typography>
            <Typography component="p">{selectedProfile.description}</Typography>
          </>
        )}
      </Box>
    </div>
  );
};

export default Home;
