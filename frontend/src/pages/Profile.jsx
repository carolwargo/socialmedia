// frontend/src/pages/Profile.jsx
import React, { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Profile/Profile.css'; // Assuming you have some CSS for styling   

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in.</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Menu (col-3) */}
        <div className="col-md-3">
          <div className="sticky-top">
            <h4>Menu</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink
                  to="posts"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Posts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="settings"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content (col-6) */}
        <div className="col-md-6">
          {/* Profile Header */}
          <UserProfile />

          {/* Navbar */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <NavLink
                to="posts"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="settings"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Settings
              </NavLink>
            </li>
          </ul>

          {/* Newsfeed (Outlet for ProfilePosts) */}
          <Outlet />
        </div>

        {/* Ads/Trending (col-3) */}
        <div className="col-md-3">
          <div className="sticky-top">
            <div className="card mb-3">
              <div className="card-body">
                <h5>Trending Posts</h5>
                <ul>
                  <li>Post 1</li>
                  <li>Post 2</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5>Ads</h5>
                <p>Ad content here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;