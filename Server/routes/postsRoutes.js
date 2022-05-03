const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/api/posts/:postId", postController.getPost);
router.post("/api/posts", postController.createPost);
router.put("/api/posts/:postId", postController.updatePost);

module.exports = router;
