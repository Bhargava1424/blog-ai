"use client";

import React from 'react';
import Sidebar from './Sidebar';
import { TopNavigation } from './TopNavigation';

const Layout = ({ children }) => {
  const handleFilterChange = (filterType, value) => {
    // Implement your filter change logic here
    console.log(`Filter changed: ${filterType}, ${value}`);
  };

  const clearAllFilters = () => {
    // Implement your clear filters logic here
    console.log('All filters cleared');
  };

  return (
    <div className="flex">
      <Sidebar
        handleFilterChange={handleFilterChange}
        clearAllFilters={clearAllFilters}
      />
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
