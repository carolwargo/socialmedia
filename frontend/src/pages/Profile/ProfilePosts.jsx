// frontend/src/pages/Profile/ProfilePosts.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import PostCard from '../../components/PostCard/PostCard';

const ProfilePosts = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        setError('Please log in to view your posts.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        // Filter posts by the current user's ID
        const userPosts = res.data.filter((post) => post.userId._id === user._id);
        setPosts(userPosts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchPosts();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="profile-posts">
      {posts.length === 0 ? (
        <div className="p-4 text-center">
          <p>No posts yet. Start sharing!</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;