import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Http from "../../services/Http";
import { API_METHODS } from "../../utils/dec";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();

  const getPost = () => {
    Http.Get(`${API_METHODS.POST_BY_ID}/${postId}`).then(setPost);
  };

  useEffect(getPost, []);

  if (!post) return <Loader />;

  return (
    <>
      <div className="post">
        <span>{post.author}</span>
        <span>{post.title}</span>
        <span>{post.body}</span>
      </div>
      <div className="comments-list">
        {post.comments.map((comment) => (
          <div key={comment._id} className="comment-list-item">
            <span>{comment.author}</span>
            <span>{comment.title}</span>
            <span>{comment.body}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
