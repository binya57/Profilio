import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Http from "../../services/Http";
import BlogListItem from "./Components/BlogListItem";

const Home = () => {
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    Http.Get("/api/blogs").then(setBlogsList);
  }, []);

  return (
    <div className="home">
      <Link to="/Login">create a user to start posting</Link>
      <div className="blogs-list-container">
        {blogsList.map((blog) => (
          <BlogListItem blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
