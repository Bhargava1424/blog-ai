import React from 'react';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <TopNavigation />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
