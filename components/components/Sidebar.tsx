"use client";

import React, { useState } from 'react';
import './Sidebar.css';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

function Sidebar() {
  const params = useParams();
  const pathname = usePathname();

  const projectId = params.projectId as string | undefined;

  const links = [
    { href: `/app/project/${projectId}/workers`, icon: "🔨", name: "Workers" },
    { href: `/app/project/${projectId}/materials`, icon: "📦", name: "Materials" },
    { href: `/app/project/${projectId}/payment`, icon: "💳", name: "Payment" },
    { href: `/profile`, icon: "🧑", name: "Profile" }
  ];

  return (
    <div className={`sidebar ${pathname === "/app" && "hidden"}`}>
      <ul className="nav-list">
        {links.map(link => (
          <li
            key={link.href}
            className={`nav-item ${pathname === link.href ? 'active' : ''}`}
          >
            <span role="img" aria-label={link.name.toLowerCase()}>{link.icon}</span>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;