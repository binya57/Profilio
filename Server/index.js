//packages:
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//#region routes:
const blogsRoutes = require("./routes/blogsRoutes");
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postsRoutes");
const commentRoutes = require("./routes/CommentsRoutes");

//#region consts:
const PORT = process.env.PORT || 3001;
const uri = process.env.ATLAS_URI;

//#region app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
* for the production build
app.use(express.static(path.resolve(__dirname, '../client/build')));
*/

//# routes
app.use(blogsRoutes);
app.use(userRoutes);
app.use(postsRoutes);
app.use(commentRoutes);

async function main() {
  await mongoose.connect(uri);
  app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}`);
  });
}

main().catch((err) => console.log(err));

/*
* for the production build
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
*/
