const Post = require("../models/Post");

const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate({
      path: "comments",
      select: "postId author title body",
    });
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
    const response = await newPost.save();
    return res.status(201).send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

module.exports = { getPost, createPost };
