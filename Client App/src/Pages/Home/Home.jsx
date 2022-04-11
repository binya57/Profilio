import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Http from "../../services/Http";
import BlogListItem from "../../components/BlogListItem";
import { API_METHODS } from "../../utils/dec";
import CreateBlog from "../../components/CreateBlog";
import BlogsList from "../../components/BlogsList";

const Home = () => {
  return (
    <div className="home">
      <Link to="/Login">create a user to start posting</Link>
      <BlogsList />
    </div>
  );
};

export default Home;
