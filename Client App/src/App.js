import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Blog from "./Pages/Blog/Blog";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Blogs" />} />
      <Route path="/Blogs" element={<Home />} />
      <Route path="Blogs/:id" element={<Blog />} />
      <Route path="Login" element={<Login />} />
      <Route path="SignUp" element={<SignUp />} />

      <Route path="*" element={<div>not found</div>} />
    </Routes>
  );
};

export default App;
