const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};
const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send();
    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const response = await newPost.save(newPost);
    return res.status(201).send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

module.exports = { getAllPosts, getPost, createPost };
