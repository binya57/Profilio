import React from "react";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MemoryLink from "./MemoryLink";

const BackButton = (props) => {
  const location = useLocation();
  return (
    <IconButton color="inherit" {...props} title="Back">
      <MemoryLink to={location.state?.pathname}>
        <ArrowBackIcon fontSize="large" color="inherit" />
      </MemoryLink>
    </IconButton>
  );
};

export default BackButton;
