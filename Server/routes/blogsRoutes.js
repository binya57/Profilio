const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/api/blogs", blogController.getAllBlogs);

router.get("/api/blog/:blogId", blogController.getBlogById);

module.exports = router;
