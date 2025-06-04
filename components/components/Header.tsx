import React from 'react';
import './Header.css';
import ProfileImage from '../ProfileImage';
import Link from 'next/link';

function Header() {
  return (
    <header className="header">
      <Link href="/app" className="logo">BuildFlow.</Link>
        <div>
          <ProfileImage />
        </div>
    </header>
  );
}

export default Header;