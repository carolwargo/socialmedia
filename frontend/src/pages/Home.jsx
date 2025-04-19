// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm/PostForm';
import PostCard from '../components/PostCard/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPosts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <PostForm onPostCreated={handlePostCreated} />
      <div className="posts-list">
        {posts.length === 0 ? (
          <p className="text-center">No posts yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Home;