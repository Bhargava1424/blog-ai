import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">BlogAI</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/" className="hover:underline">Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link href="/my-blog" className="hover:underline">My Blogs</Link>
          </li>
          <li className="mb-2">
            <Link href="/resources" className="hover:underline">Resources</Link>
          </li>
          <li className="mb-2">
            <Link href="/preferences" className="hover:underline">Preferences</Link>
          </li>
          <li className="mb-2">
            <Link href="/explore" className="hover:underline">Explore</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
