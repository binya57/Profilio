const Blog = require("../models/blog");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.json(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

const getBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const requestedBlog = await Blog.findById(blogId).populate({
      path: "posts",
      select: "title author body",
    });
    if (!requestedBlog) return res.status(404).send();
    res.json(requestedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const response = await newBlog.save();
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

module.exports = { getAllBlogs, getBlogById, createBlog };
