const express = require("express");
const commentsController = require("../controllers/commentController");
const router = express.Router();

// router.get("/api/comments/:postId", commentsController.getPostComments);

router.post("/api/comments", commentsController.createComment);

module.exports = router;
