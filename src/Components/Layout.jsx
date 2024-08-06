import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
 
const Layout = () => {
  const location = useLocation();
 
  const noNavbarRoutes = ['/', '/Registration'];
 
  const showNavbar = !noNavbarRoutes.includes(location.pathname);
 
  return (
    
    <div className="App d-flex">
      {showNavbar && <Navbar />}
      <div className="main-content flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
};
 
export default Layout;
 
 
 