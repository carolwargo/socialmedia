// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfilePosts from './pages/Profile/ProfilePosts';
import ProfileSettings from './pages/Profile/ProfileSettings';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Network from './pages/Network';
import Leads from './pages/Leads';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<div className="p-4">Explore Page</div>} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="messages" element={<Messages />} />
          <Route path="network" element={<Network />} />
          <Route path="leads" element={<Leads />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />}>
            <Route path="posts" element={<ProfilePosts />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="post" element={<Post />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;