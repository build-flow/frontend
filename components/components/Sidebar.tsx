"use client";

import React, { useState } from 'react';
import './Sidebar.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function Sidebar() {
  const [activeLink, setActiveLink] = useState(location.pathname);
  const params = useParams();
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const projectId = params.projectId as string | undefined;

  const links = projectId
    ? [
      { href: `/app/project/${projectId}/workers`, icon: "🔨", name: "Workers" },
      { href: `/app/project/${projectId}/materials`, icon: "📦", name: "Materials" },
      { href: `/app/project/${projectId}/payment`, icon: "💳", name: "Payment" },
      { href: `/profile`, icon: "🧑", name: "Profile" }
    ]
    : [];

  return (
    <div className="sidebar">
      <ul className="nav-list">
        {links.map(link => (
          <li
            key={link.href}
            className={`nav-item ${activeLink === link.href ? 'active' : ''}`}
            onClick={() => handleLinkClick(link.href)}
          >
            <span role="img" aria-label={link.name.toLowerCase()}>{link.icon}</span>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="sidebar">
      <ul className="nav-list">
        <li
          className={`nav-item ${activeLink === '/dashboard' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/dashboard')}
        >
          <span role="img" aria-label="dashboard">📊</span>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`nav-item ${activeLink === '/workers' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/workers')}
        >
          <span role="img" aria-label="workers">🔨</span>
          <Link href="/workers">Workers</Link>
        </li>
        <li
          className={`nav-item ${activeLink === '/materials' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/materials')}
        >
          <span role="img" aria-label="materials">📦</span>
          <Link href="/materials">Materials</Link>
        </li>
        <li
          className={`nav-item ${activeLink === '/payment' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/payment')}
        >
          <span role="img" aria-label="payment">💳</span>
          <Link href="/payment">Payment</Link>
        </li>
        <li
          className={`nav-item ${activeLink === '/profile' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/profile')}
        >
          <span role="img" aria-label="profile">🧑</span>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;