import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post, onEditClick = () => {}, editable }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%" }} variant="outlined">
      <CardHeader
        avatar={<Avatar src="" alt={post.userName} />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={new Date(post.updatedAt).toLocaleString()}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxHeight: "80px",
            maxWidth: "50%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton> */}
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </ExpandMore>
        {editable && (
          <IconButton sx={{ ml: "auto" }} onClick={() => onEditClick(post)}>
            <EditIcon />
          </IconButton>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography paragraph>{post.body}</Typography>
      </Collapse>
    </Card>
  );
};

export default PostCard;
