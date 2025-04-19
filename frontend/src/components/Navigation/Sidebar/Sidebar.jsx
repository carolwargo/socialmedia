// frontend/src/components/Sidebar/Sidebar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import './Sidebar.css';
import GirlCamera from '../../assets/images/GirlCamera.png';
import { AuthContext } from '../../context/AuthContext';

const navItems = [
  { to: '/home', icon: 'bi-house-door', label: 'Home', ariaLabel: 'Go to home page' },
  { to: '/explore', icon: 'bi-search', label: 'Explore', ariaLabel: 'Explore content' },
  { to: '/notifications', icon: 'bi-bell', label: 'Notifications', ariaLabel: 'View notifications' },
  { to: '/messages', icon: 'bi-chat-quote', label: 'Messages', ariaLabel: 'View messages' },
  { to: '/network', icon: 'bi-people', label: 'Network', ariaLabel: 'View network' },
  { to: '/leads', icon: 'bi-clipboard-plus', label: 'Leads', ariaLabel: 'View leads' },
  { to: '/products', icon: 'bi-grid', label: 'Products', ariaLabel: 'View products' },
  { to: '/orders', icon: 'bi-collection', label: 'Orders', ariaLabel: 'View orders' },
  { to: '/profile', icon: 'bi-person-circle', label: 'Profile', ariaLabel: 'View profile' },
  { to: '/settings', icon: 'bi-gear', label: 'Settings', ariaLabel: 'View settings' },
];

const Sidebar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltips = Array.from(tooltipTriggerList).map((el) => new bootstrap.Tooltip(el));
    return () => tooltips.forEach((tooltip) => tooltip.dispose());
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Calls AuthContext's logout (hits /api/auth/logout)
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  if (loading) {
    return <div className="sidebar">Loading...</div>;
  }

  const displayName = user?.name || 'Guest';
  const displayHandle = user?.handle || '@guest';
  const profilePic = user?.profilePic || GirlCamera;

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} aria-label="Main navigation">
      <div className="sidebar-content px-3 py-3 mt-3">
        {/* Toggle Button for Mobile */}
        <button
          className="btn btn-link d-md-none mb-2"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
        </button>

        {/* Brand Logo */}
        <div className="brand mb-4">
          <Link to="/" className="text-decoration-none text-dark fs-4 fw-bold d-flex align-items-center">
            <i className="fas fa-kiwi-bird text-warning me-2"></i>
            {!isCollapsed && (
              <span>
                Bea<span className="text-warning">ū</span>Pro
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <ul className="nav nav-pills flex-column mb-auto custom-nav">
          {navItems.map((item) => (
            <li key={item.to} className="nav-item">
              <NavLink
                to={item.to}
                className={({ isActive }) => `nav-link link-dark ${isActive ? 'active' : ''}`}
                data-bs-toggle={isCollapsed ? 'tooltip' : ''}
                data-bs-placement="right"
                title={isCollapsed ? item.label : ''}
                aria-label={item.ariaLabel}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {!isCollapsed && item.label}
              </NavLink>
            </li>
          ))}
          {!isCollapsed && (
            <li className="nav-item mt-2">
              <Link
                to="/post"
                className="btn btn-dark rounded-pill w-75"
                aria-label="Create a new post"
              >
                Post
              </Link>
            </li>
          )}
        </ul>

        {/* User Profile Dropdown */}
        {!isCollapsed && (
          <div className="dropdown w-100 mt-3">
            <div
              className="row align-items-center p-2"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="User profile menu"
            >
              <div className="col-3">
                <img
                  src={profilePic}
                  alt={`${displayName}'s profile`}
                  className="rounded-circle shadow"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-6 text-start">
                <strong>{displayName}</strong>
                <br />
                <span className="text-muted">{displayHandle}</span>
              </div>
              <div className="col-3 text-end">
                <i className="bi bi-three-dots"></i>
              </div>
            </div>
            <ul className="dropdown-menu shadow" aria-labelledby="dropdownUser">
              <li>
                <Link className="dropdown-item" to="/profile">
                  View Profile
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;