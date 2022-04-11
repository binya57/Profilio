const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/api/blogs", blogController.getAllBlogs);

router.get("/api/blogs/:blogId", blogController.getBlogById);

router.post("/api/blogs", blogController.createBlog);

module.exports = router;
