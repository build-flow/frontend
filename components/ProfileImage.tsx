import Link from 'next/link';
import React from 'react';

const ProfileImage = () => {
  return (
    <Link
      className='flex p-4 h-10 w-10 rounded-full justify-center items-center bg-blue-500 cursor-pointer'
      href="/profile"
    >
      <p className='text-white'>T</p>
    </Link>
  );
}

export default ProfileImage;
