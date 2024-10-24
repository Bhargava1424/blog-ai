"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import SecondSidebar from './SecondSidebar';

type FilterType = 'contentType' | 'resourceType' | 'keywords' | 'website' | 'pdf' | 'youtube' | 'docs';

interface LayoutProps {
  children: React.ReactNode;
  contentTypeFilter?: string[];
  resourceTypeFilter?: string[];
  keywordsFilter?: string[];
  websiteFilter?: string[];
  pdfFilter?: string[];
  youtubeFilter?: string[];
  docsFilter?: string[];
  handleFilterChange: (filterType: FilterType, value: string) => void;
  clearAllFilters: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  contentTypeFilter,
  resourceTypeFilter,
  keywordsFilter,
  websiteFilter,
  pdfFilter,
  youtubeFilter,
  docsFilter,
  handleFilterChange,
  clearAllFilters
}) => {
  const pathname = usePathname();
  const showSecondSidebar = ['/', '/my-blog'].includes(pathname);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 overflow-hidden">
        {showSecondSidebar && (
          <SecondSidebar
            contentTypeFilter={contentTypeFilter}
            resourceTypeFilter={resourceTypeFilter}
            keywordsFilter={keywordsFilter}
            websiteFilter={websiteFilter}
            pdfFilter={pdfFilter}
            youtubeFilter={youtubeFilter}
            docsFilter={docsFilter}
            handleFilterChange={handleFilterChange}
            clearAllFilters={clearAllFilters}
          />
        )}
        <main className={`flex-1 overflow-y-auto ${showSecondSidebar ? '' : 'w-full'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
