const Comment = require("../models/Comment");

// const getPostComments = async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const postComments = await Comment.find({ postId });
//     return res.json(postComments);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send();
//   }
// };

const createComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const response = await newComment.save();
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

module.exports = { /*getPostComments,*/ createComment };
