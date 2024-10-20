import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Upload, Sliders, X, Compass } from 'lucide-react';
import { FilterDropdown } from './FilterDropdown';

type FilterType = 'contentType' | 'resourceType' | 'keywords' | 'website' | 'pdf' | 'youtube' | 'docs';

interface SidebarProps {
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

const Sidebar: React.FC<SidebarProps> = ({
  contentTypeFilter = [],
  resourceTypeFilter = [],
  keywordsFilter = [],
  websiteFilter = [],
  pdfFilter = [],
  youtubeFilter = [],
  docsFilter = [],
  handleFilterChange,
  clearAllFilters
}) => {
  const showWebsiteFilter = resourceTypeFilter.includes('Website');
  const showPDFFilter = resourceTypeFilter.includes('PDF');
  const showYouTubeFilter = resourceTypeFilter.includes('YouTube');
  const showDocsFilter = resourceTypeFilter.includes('Docs');

  return (
    <aside className="w-64 border-r h-screen flex flex-col">
      <div className="p-4">
        <h1 className="cursor-pointer text-4xl font-extrabold">
          BlogAI
        </h1>
      </div>
      <nav className="mt-8 flex-grow space-y-2 px-4 mb-8">
        <Link href="/" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm py-4 font-semibold"
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Button>
        </Link>
        <Link href="/my-blog" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm py-4 font-semibold"
          >
            <BookOpen className="mr-3 h-5 w-5" />
            My Blogs
          </Button>
        </Link>
        <Link href="/resources" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm py-4 font-semibold"
          >
            <Upload className="mr-3 h-5 w-5" />
            Resources
          </Button>
        </Link>
        <Link href="/preferences" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm py-4 font-semibold"
          >
            <Sliders className="mr-3 h-5 w-5" />
            Preferences
          </Button>
        </Link>
        <Link href="/explore" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm py-4 font-semibold"
          >
            <Compass className="mr-3 h-5 w-5" />
            Explore
          </Button>
        </Link>
      </nav>
      <div className="p-4 border-t flex-shrink-0 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm">Filter Blogs</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs bg-red-500 bg-opacity-70 hover:bg-red-600 transition-all duration-300 text-white font-semibold hover:text-white ease-in-out hover:scale-105 hover:shadow-md"
          >
            <X />
            Clear All
          </Button>
        </div>
        <div className="space-y-0">
          <FilterDropdown
            title="Content Type"
            options={['Technology', 'Productivity', 'Lifestyle']}
            selected={contentTypeFilter}
            onSelect={(value) => handleFilterChange('contentType', value)}
            onRemove={(value) => handleFilterChange('contentType', value)}
            onApply={() => {}}
          />
          <FilterDropdown
            title="Resource Type"
            options={['Website', 'PDF', 'YouTube', 'Docs']}
            selected={resourceTypeFilter}
            onSelect={(value) => handleFilterChange('resourceType', value)}
            onRemove={(value) => handleFilterChange('resourceType', value)}
            onApply={() => {}}
          />
          <FilterDropdown
            title="Keywords"
            options={['AI', 'Machine Learning', 'Web Development', 'Data Science']}
            selected={keywordsFilter}
            onSelect={(value) => handleFilterChange('keywords', value)}
            onRemove={(value) => handleFilterChange('keywords', value)}
            onApply={() => {}}
          />
          <FilterDropdown
            title="Select Website"
            options={['Website 1', 'Website 2', 'Website 3']}
            selected={websiteFilter}
            onSelect={(value) => handleFilterChange('website', value)}
            onRemove={(value) => handleFilterChange('website', value)}
            visible={showWebsiteFilter}
            onApply={() => {}}
          />
          <FilterDropdown
            title="Select PDFs"
            options={['PDF 1', 'PDF 2', 'PDF 3']}
            selected={pdfFilter}
            onSelect={(value) => handleFilterChange('pdf', value)}
            onRemove={(value) => handleFilterChange('pdf', value)}
            visible={showPDFFilter}
            onApply={() => {}}
          />
          <FilterDropdown
            title="Select YouTube Links"
            options={['YouTube 1', 'YouTube 2', 'YouTube 3']}
            selected={youtubeFilter}
            onSelect={(value) => handleFilterChange('youtube', value)}
            onRemove={(value) => handleFilterChange('youtube', value)}
            visible={showYouTubeFilter}
            onApply={() => {}}
          />
          <FilterDropdown
            title="Select Google Docs"
            options={['Doc 1', 'Doc 2', 'Doc 3']}
            selected={docsFilter}
            onSelect={(value) => handleFilterChange('docs', value)}
            onRemove={(value) => handleFilterChange('docs', value)}
            visible={showDocsFilter}
            onApply={() => {}}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
