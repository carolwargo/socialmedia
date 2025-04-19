import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar/Sidebar'; // Adjust the import path as necessary

const Layout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <main>
        <Outlet /> {/* Renders child routes */}
      </main>
    </div>
  );
};

export default Layout;