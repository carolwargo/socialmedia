// frontend/src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserProfile.css'; // Optional, for custom styles

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const endpoint = userId
          ? `${import.meta.env.VITE_API_URL}/users/${userId}`
          : `${import.meta.env.VITE_API_URL}/users/me`;
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div className="p-3">Loading...</div>;
  }

  if (error) {
    return <div className="p-3 alert alert-danger">{error}</div>;
  }

  if (!profile) {
    return <div className="p-3">Profile not found.</div>;
  }

  return (
    <div className="card user-profile mb-3">
      <div
        className="card-img-top"
        style={{
          height: '150px',
          backgroundImage: 'url(https://via.placeholder.com/600x150)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="card-body text-center">
        <img
          src={profile.profilePic || 'https://via.placeholder.com/100'}
          alt={`${profile.name}'s profile`}
          className="rounded-circle mt-n5 shadow"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <h3 className="card-title mt-2">{profile.name}</h3>
        <p className="text-muted">{profile.handle}</p>
        <p className="card-text">{profile.bio || 'No bio provided'}</p>
        <p className="card-text">
          <Link to={`/users/${profile.handle}/followers`} className="text-decoration-none">
            Followers: {profile.followers.length}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;