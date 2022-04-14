import React, { useState } from "react";
import Http from "../services/Http";
import { API_METHODS } from "../utils/dec";
import Comment from "../models/Comment";

const CreateComment = ({ postId, onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldValues, setFieldValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValues((values) => ({ ...fieldValues, [name]: value }));
  };
  const handleCreateComment = (e) => {
    e.preventDefault();
    const newComment = new Comment(fieldValues);
    Http.Post(API_METHODS.CREATE_COMMENT, {
      ...newComment,
      postId,
    }).then((res) => onCreate(res));
  };

  return (
    <div className="create-comment">
      <button onClick={() => setIsOpen(!isOpen)}>create comment</button>
      {isOpen && (
        <form onSubmit={handleCreateComment}>
          <fieldset>
            <label htmlFor="author">author</label>
            <input
              type="text"
              name="author"
              value={fieldValues.author}
              onChange={handleChange}
            />
            <label htmlFor="title">title</label>

            <input
              type="text"
              name="title"
              value={fieldValues.title}
              onChange={handleChange}
            />
            <label htmlFor="body">body</label>

            <textarea
              name="body"
              value={fieldValues.body}
              onChange={handleChange}
            />
            <button type="submit">send</button>
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default CreateComment;
