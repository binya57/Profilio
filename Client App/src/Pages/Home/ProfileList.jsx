import React, { useContext, useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Http from "../../services/Http";
import { API_METHODS } from "../../utils/dec";

const ProfileList = ({ onItemSelect }) => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    Http.Get(API_METHODS.PROFILES)
      .then(setProfiles)
      .catch((err) => console.log(err));
  }, []);

  return (
    <List className="profile-list">
      {profiles.map((profile) => (
        <>
          <ListItem
            alignItems="flex-start"
            onClick={() => onItemSelect(profile._id)}
          >
            <ListItemAvatar>
              <Avatar alt={profile.userName} src="#" />
            </ListItemAvatar>

            <ListItemText
              primary={profile.userName}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {profile.title}
                  </Typography>
                  {" - " + profile.description}
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
};

export default ProfileList;