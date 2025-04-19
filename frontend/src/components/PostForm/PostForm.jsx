// frontend/src/components/PostForm.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './PostForm.css'; // Optional, for custom styles

const PostForm = ({ onPostCreated }) => {
  const { user, loading } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <div className="p-3">Loading...</div>;
  }

  if (!user) {
    return <div className="p-3 text-danger">Please log in to create a post.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData();
    formData.append('content', content);
    if (media) {
      formData.append('media', media);
    }
    formData.append('userId', user._id);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setContent('');
      setMedia(null);
      if (onPostCreated) {
        onPostCreated(res.data); // Notify parent component of new post
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setMedia(file);
      setError(null);
    } else {
      setError('Please select a valid image file');
    }
  };

  return (
    <div className="card mb-3 post-form">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleMediaChange}
              disabled={submitting}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-dark rounded-pill"
            disabled={submitting || !content.trim()}
          >
            {submitting ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;