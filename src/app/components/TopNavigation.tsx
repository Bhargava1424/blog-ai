import React from 'react';

const TopNavigation = () => {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">BlogAI</h1>
      <input
        type="text"
        placeholder="Search blogs..."
        className="border rounded p-2"
      />
    </div>
  );
};

export default TopNavigation;
