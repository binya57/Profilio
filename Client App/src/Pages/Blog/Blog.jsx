import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Http from "../../services/Http";
import useErrorPage from "../../hooks/useErrorPage";
import { API_METHODS } from "../../utils/dec";
import PostsList from "../../components/PostsList";

const Blog = () => {
  const [blog, setBlog] = useState();
  const { blogId } = useParams();
  const { setError } = useErrorPage("/404_not_found");

  const getBlog = () => {
    Http.Get(`${API_METHODS.BLOG_BY_ID}/${blogId}`)
      .then(setBlog)
      .catch((err) => {
        setError(true);
      });
  };

  useEffect(getBlog, [blogId]);

  const addPost = (newPost) =>
    setBlog((_blog) => ({ ..._blog, posts: [..._blog.posts, newPost] }));

  if (!blog) return <Loader />;

  return (
    <div className="blog">
      <h2>{blog.author}</h2>
      <h2>{blog.title}</h2>
      <PostsList addPost={addPost} posts={blog.posts} blogId={blogId} />
    </div>
  );
};

export default Blog;
