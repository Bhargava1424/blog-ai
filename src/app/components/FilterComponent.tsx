import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FilterDropdown } from './FilterDropdown';
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  domains: string[];
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
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
  clearAllFilters,
  domains,
  selectedDomain,
  onDomainChange
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
          <div className="space-y-2">
            <Label htmlFor="domain-filter">Filter by Domain</Label>
            <select
              id="domain-filter"
              className="w-full border rounded-md p-2"
              value={selectedDomain}
              onChange={(e) => onDomainChange(e.target.value)}
            >
              <option value="all">All Domains</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default FilterComponent;
