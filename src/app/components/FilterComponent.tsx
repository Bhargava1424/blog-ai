import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FilterDropdown } from './FilterDropdown';

type FilterType = 'contentType' | 'resourceType' | 'keywords' | 'website' | 'pdf' | 'youtube' | 'docs';

interface FilterComponentProps {
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

const FilterComponent: React.FC<FilterComponentProps> = ({
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

  const [contentType, setContentType] = useState<string[]>(contentTypeFilter);
  const [resourceType, setResourceType] = useState<string[]>(resourceTypeFilter);
  const [keywords, setKeywords] = useState<string[]>(keywordsFilter);

  const handleSelect = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }

  const handleRemove = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) => {
    setter(prev => prev.filter(item => item !== value))
  }

  const handleApply = () => {
    // Apply filters logic here
    console.log('Filters applied')
  }

  const handleClearAll = () => {
    setContentType([]);
    setResourceType([]);
    setKeywords([]);
    clearAllFilters();
  }

  return (
    <div className="flex-grow overflow-hidden flex flex-col">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Filter Blogs</h3>
          <Button variant="secondary" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto flex-grow px-4 pb-4">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-sm mb-2 text-gray-600">Content Type</h4>
            <FilterDropdown
              title="Select content type"
              options={['Blog Post', 'Article', 'News', 'Tutorial']}
              selected={contentType}
              onSelect={handleSelect(setContentType)}
              onRemove={handleRemove(setContentType)}
              onApply={handleApply}
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-gray-600">Resource Type</h4>
            <FilterDropdown
              title="Select resource type"
              options={['PDF', 'Video', 'Audio', 'Infographic']}
              selected={resourceType}
              onSelect={handleSelect(setResourceType)}
              onRemove={handleRemove(setResourceType)}
              onApply={handleApply}
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-gray-600">Keywords</h4>
            <FilterDropdown
              title="Select keywords"
              options={['AI', 'Machine Learning', 'Web Development', 'Data Science']}
              selected={keywords}
              onSelect={handleSelect(setKeywords)}
              onRemove={handleRemove(setKeywords)}
              onApply={handleApply}
            />
          </div>
          {showWebsiteFilter && (
            <div>
              <h4 className="font-medium text-sm mb-2 text-gray-600">Websites</h4>
              <FilterDropdown
                title="Select website"
                options={['Website 1', 'Website 2', 'Website 3']}
                selected={websiteFilter}
                onSelect={(value) => handleFilterChange('website', value)}
                onRemove={(value) => handleFilterChange('website', value)}
                onApply={() => {}}
              />
            </div>
          )}
          {showPDFFilter && (
            <div>
              <h4 className="font-medium text-sm mb-2 text-gray-600">PDFs</h4>
              <FilterDropdown
                title="Select PDFs"
                options={['PDF 1', 'PDF 2', 'PDF 3']}
                selected={pdfFilter}
                onSelect={(value) => handleFilterChange('pdf', value)}
                onRemove={(value) => handleFilterChange('pdf', value)}
                onApply={() => {}}
              />
            </div>
          )}
          {showYouTubeFilter && (
            <div>
              <h4 className="font-medium text-sm mb-2 text-gray-600">YouTube Links</h4>
              <FilterDropdown
                title="Select YouTube links"
                options={['YouTube 1', 'YouTube 2', 'YouTube 3']}
                selected={youtubeFilter}
                onSelect={(value) => handleFilterChange('youtube', value)}
                onRemove={(value) => handleFilterChange('youtube', value)}
                onApply={() => {}}
              />
            </div>
          )}
          {showDocsFilter && (
            <div>
              <h4 className="font-medium text-sm mb-2 text-gray-600">Google Docs</h4>
              <FilterDropdown
                title="Select Google Docs"
                options={['Doc 1', 'Doc 2', 'Doc 3']}
                selected={docsFilter}
                onSelect={(value) => handleFilterChange('docs', value)}
                onRemove={(value) => handleFilterChange('docs', value)}
                onApply={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
