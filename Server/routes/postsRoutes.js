const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/api/posts", postController.getAllPosts);
router.get("/api/posts/:id", postController.getPost);
router.post("/api/posts", postController.createPost);

module.exports = router;
