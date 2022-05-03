import React, { useContext } from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import UserContext from "../services/UserContext";
import MemoryLink from "./MemoryLink";
import { useLocation } from "react-router-dom";
import { PATHS } from "../utils/dec";
import BackButton from "./BackButton";

const AppHeader = () => {
  const { logOut } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        {pathname !== PATHS.HOME && <BackButton sx={{ mt: 0.9 }} />}

        <IconButton
          component={MemoryLink}
          to={PATHS.MY_PROFILE}
          color="inherit"
          title="Profile"
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <IconButton color="inherit" title="Log Out" onClick={logOut}>
          <LogoutIcon sx={{ cursor: "pointer" }} fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
