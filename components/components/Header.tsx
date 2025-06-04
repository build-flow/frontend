import React from 'react';
import './Header.css';
import ProfileImage from '../ProfileImage';

function Header() {
  return (
    <header className="header">
      <div className="logo">BuildFlow.</div>
        <div>
          <ProfileImage />
        </div>
    </header>
  );
}

export default Header;