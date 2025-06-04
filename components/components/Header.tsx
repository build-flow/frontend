import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">BuildFlow.</div>
      <div className="profile-icon">
        <span role="img" aria-label="profile">
          🧑
        </span>
      </div>
    </header>
  );
}

export default Header;