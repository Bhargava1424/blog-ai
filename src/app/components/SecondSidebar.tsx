import React from 'react';
import FilterComponent from './FilterComponent';

type FilterType = 'contentType' | 'resourceType' | 'keywords' | 'website' | 'pdf' | 'youtube' | 'docs';

interface SecondSidebarProps {
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

const SecondSidebar: React.FC<SecondSidebarProps> = (props) => {
  return (
    <aside className="w-64 border-l h-screen flex flex-col">
      <FilterComponent {...props} />
    </aside>
  );
};

export default SecondSidebar;
