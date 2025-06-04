import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="sidebar">
      <ul className="nav-list">
        <li
          className={`nav-item ${activeLink === '/dashboard' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/dashboard')}
        >
          <span role="img" aria-label="dashboard">📊</span>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`nav-item ${activeLink === '/workers' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/workers')}
        >
          <span role="img" aria-label="workers">🔨</span>
          <Link to="/workers">Workers</Link>
        </li>
        <li
          className={`nav-item ${activeLink === '/materials' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/materials')}
        >
          <span role="img" aria-label="materials">📦</span>
          <Link to="/materials">Materials</Link>
        </li>
        <li
          className={`nav-item ${activeLink === '/payment' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/payment')}
        >
          <span role="img" aria-label="payment">💳</span>
          <Link to="/payment">Payment</Link>
        </li>
        <li
          className={`nav-item ${activeLink === '/profile' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/profile')}
        >
          <span role="img" aria-label="profile">🧑</span>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;