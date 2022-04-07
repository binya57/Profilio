import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import Http from "../../services/Http";

const Blog = () => {
  const [blog, setBlog] = useState();
  const { id: blogId } = useParams();

  useEffect(() => {
    Http.Get(`/api/Blog/${Number(blogId)}`)
      .then(setBlog)
      .catch((err) => {
        throw err;
      });
  }, [blogId]);

  if (!blog) return <Loader />;

  return (
    <div className="blog">
      <h2>{blog.author}</h2>
      <h2>{blog.name}</h2>
    </div>
  );
};

export default Blog;
