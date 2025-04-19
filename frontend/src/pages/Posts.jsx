// src/pages/Post.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const { user, loading } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle loading state
  if (loading) return <div className="p-4">Loading...</div>;

  // Ensure user is logged in
  if (!user) {
    return (
      <div className="p-4">
        <p>Please log in to create a post.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Create FormData for text and image
    const formData = new FormData();
    formData.append('content', content);
    if (media) {
      formData.append('media', media);
    }
    formData.append('userId', user.id); // Assuming user.id from AuthContext

    try {
      // Send to backend
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setContent('');
      setMedia(null);
      navigate('/home'); // Redirect to home after posting
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
    } else {
      setError('Please select a valid image file');
    }
  };

  return (
    <div className="p-4">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
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
  );
};

export default Post;