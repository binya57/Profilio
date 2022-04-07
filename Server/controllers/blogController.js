const blogs = [
  { id: 2, author: "benjamin gilaad", name: "greates blog" },
  { id: 5, author: "joe strong", name: "bodybuilding blog" },
];

const getAllBlogs = (req, res) => {
  res.json(blogs);
};

const getBlogById = (req, res) => {
  const { blogId } = req.params;
  const requestedBlog = blogs.find((blog) => blog.id === +blogId);
  if (!requestedBlog) return res.status(404).send();
  res.json(requestedBlog);
};

module.exports = { getAllBlogs, getBlogById };
