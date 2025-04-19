// frontend/src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css'; // Optional, for custom styles

const PostCard = ({ post }) => {
  if (!post || !post.userId) {
    return null; // Prevent rendering if post or userId is missing
  }

  return (
    <div className="card mb-3 post-card">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <Link to={`/users/${post.userId.handle}`}>
            <img
              src={post.userId.profilePic || 'https://via.placeholder.com/40'}
              alt={`${post.userId.name}'s profile`}
              className="rounded-circle me-2"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
          </Link>
          <div>
            <Link to={`/users/${post.userId.handle}`} className="text-decoration-none">
              <strong>{post.userId.name}</strong>
            </Link>
            <span className="text-muted ms-1">{post.userId.handle}</span>
          </div>
        </div>
        <p className="card-text">{post.content}</p>
        {post.mediaUrl && (
          <img
            src={`${import.meta.env.VITE_API_URL}${post.mediaUrl}`}
            alt="Post media"
            className="img-fluid mb-2 rounded"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
        <p className="text-muted small">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PostCard;