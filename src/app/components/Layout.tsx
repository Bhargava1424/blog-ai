"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import SecondSidebar from './SecondSidebar';
import { TopNavigation } from './TopNavigation';
import { Separator } from '@/components/ui/separator';
import FilterComponent from './FilterComponent';

interface LayoutProps {
  children: React.ReactNode;
  handleFilterChange: (filter: string, value: string) => void;
  clearAllFilters: () => void;
  domains: string[];
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  handleFilterChange,
  clearAllFilters,
  domains,
  selectedDomain,
  onDomainChange
}) => {
  const pathname = usePathname();
  const showSecondSidebar = ['/', '/my-blog'].includes(pathname);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <TopNavigation />
        <div className="flex">
          <div className="w-64 p-4">
            <FilterComponent 
              handleFilterChange={handleFilterChange}
              clearAllFilters={clearAllFilters}
              domains={domains}
              selectedDomain={selectedDomain}
              onDomainChange={onDomainChange}
            />
          </div>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
