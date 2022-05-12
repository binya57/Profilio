import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Http from "../../services/Http";
import { API_METHODS } from "../../utils/dec";
import Loader from "../../components/Loader";

const ProfileList = ({ onItemSelect, selectedId }) => {
  const [profiles, setProfiles] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    Http.Get(API_METHODS.PROFILES)
      .then((res) => {
        setProfiles(res);
        setIsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!isDataLoaded) return <Loader />;

  return (
    <List className="profile-list">
      {profiles.length < 1 ? (
        <Typography component="h5" variant="h5" align="center" mt={2}>
          No Profiles To Display
        </Typography>
      ) : (
        profiles.map((profile) => (
          <div key={profile.id}>
            <ListItem
              alignItems="flex-start"
              onClick={() => onItemSelect(profile._id)}
              sx={{
                cursor: "pointer",
                bgcolor: profile._id === selectedId ? "grey.300" : "",
              }}
            >
              <ListItemAvatar>
                <Avatar alt={profile.userName} src="#" />
              </ListItemAvatar>

              <ListItemText
                primary={profile.userName}
                secondary={
                  <>
                    <Typography
                      sx={{
                        display: "inline",
                      }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        display: "block",
                        maxWidth: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {profile.description}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))
      )}
    </List>
  );
};

export default ProfileList;
