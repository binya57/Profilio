const express = require("express");
const app = express();
const blogsRoutes = require("./routes/blogsRoutes");
const userRoutes = require("./routes/userRoutes");
const PORT = process.env.PORT || 3001;

/*
* for the production build
app.use(express.static(path.resolve(__dirname, '../client/build')));
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(blogsRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`server is listening on localhost:${PORT}`);
});

/*
* for the production build
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
*/
