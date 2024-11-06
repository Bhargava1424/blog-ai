"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { TopNavigation } from './TopNavigation';
import FilterComponent from './FilterComponent';
import { Separator } from '@/components/ui/separator';

interface LayoutProps {
  children: React.ReactNode;
  handleFilterChange: (filter: string, value: string) => void;
  clearAllFilters: () => void;
  domains: string[];
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  showSignUp: boolean;
  setShowSignUp: (value: boolean) => void;
  isPreferredContent: boolean;
  togglePreferredContent: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  handleFilterChange,
  clearAllFilters,
  domains,
  selectedDomain,
  onDomainChange,
  isLoggedIn,
  setIsLoggedIn,
  showSignUp,
  setShowSignUp,
  isPreferredContent,
  togglePreferredContent
}) => {
  const pathname = usePathname();
  const showFilter = ['/'].includes(pathname);

  return (
    <div className="flex flex-col h-screen">
      <TopNavigation 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
        isPreferredContent={isPreferredContent}
        togglePreferredContent={togglePreferredContent}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1">
          {showFilter && (
            <>
              <div className="w-64 p-4">
                <FilterComponent 
                  handleFilterChange={handleFilterChange}
                  clearAllFilters={clearAllFilters}
                  domains={domains}
                  selectedDomain={selectedDomain}
                  onDomainChange={onDomainChange}
                />
              </div>
              <Separator className="mt-4" orientation="vertical" />
            </>
          )}
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
