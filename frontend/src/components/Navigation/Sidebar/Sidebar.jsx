// src/components/Sidebar.jsx
import React, { useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import './Sidebar.css';
import GirlCamera from '../../assets/images/GirlCamera.png';
import { AuthContext } from '../context/AuthContext';

// src/components/Sidebar.jsx (excerpt)
const navItems = [
    { to: '/home', icon: 'bi-house-door', label: 'Home' },
    { to: '/explore', icon: 'bi-search', label: 'Explore' },
    { to: '/notifications', icon: 'bi-bell', label: 'Notifications' },
    { to: '/messages', icon: 'bi-chat-quote', label: 'Messages' },
    { to: '/network', icon: 'bi-people', label: 'Network' },
    { to: '/leads', icon: 'bi-clipboard-plus', label: 'Leads' },
    { to: '/products', icon: 'bi-grid', label: 'Product' },
    { to: '/orders', icon: 'bi-collection', label: 'Orders' },
    { to: '/profile', icon: 'bi-person-circle', label: 'Profile' },
    { to: '/settings', icon: 'bi-gear', label: 'Settings' },
  ];

const Sidebar = () => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
  }, []);

  // Show loading state while user data is fetching
  if (loading) {
    return <div className="sidebar">Loading...</div>;
  }

  // Fallback if user is null (e.g., not logged in)
  const displayName = user?.name || 'Guest';
  const displayHandle = user?.handle || '@guest';

  return (
    <div className="sidebar">
      <div className="sidebar-content px-3 py-3 mt-3">
        {/* Brand Logo */}
        <div className="brand mb-4">
          <Link to="/" className="text-decoration-none text-dark fs-4 fw-bold">
            <i className="fas fa-kiwi-bird text-warning me-1"></i>
            Bea<span className="text-warning">ū</span>Pro
          </Link>
        </div>

        {/* Navigation */}
        <ul className="nav nav-pills flex-column mb-auto custom-nav">
          {navItems.map((item) => (
            <li key={item.to} className="nav-item">
              <NavLink
                to={item.to}
                className="nav-link link-dark"
                activeClassName="active"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title={item.label}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="nav-item mt-2">
            <Link to="/post" className="btn btn-dark rounded-pill w-75">
              Post
            </Link>
          </li>
        </ul>

        {/* User Profile Dropdown */}
        <div className="dropdown w-100 mt-3">
          <div className="row align-items-center p-2">
            <div className="col-3">
              <img
                src={GirlCamera}
                alt="Profile"
                className="rounded-circle shadow"
                style={{ width: '40px', height: '40px' }}
              />
            </div>
            <div className="col-6 text-start">
              <strong>{displayName}</strong>
              <br />
              <span className="text-muted">{displayHandle}</span>
            </div>
            <div className="col-3 text-end">
              <a
                href="#"
                className="dropdown-toggle link-dark"
                id="dropdownUser"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots"></i>
              </a>
              <ul className="dropdown-menu shadow" aria-labelledby="dropdownUser">
                <li>
                  <Link className="dropdown-item" to="/logout">
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;