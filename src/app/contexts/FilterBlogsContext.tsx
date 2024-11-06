"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { extractDomain } from '@/lib/utils';

interface FilterBlogsContextType {
  domains: string[];
  selectedDomain: string;
  setSelectedDomain: (domain: string) => void;
}

const FilterBlogsContext = createContext<FilterBlogsContextType | undefined>(undefined);

export function FilterBlogsProvider({ children }: { children: React.ReactNode }) {
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('all');

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/article/');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        const uniqueDomains = Array.from(new Set(
          data.map((blog: any) => blog.link ? extractDomain(blog.link) : 'unknown')
        )).filter(Boolean);
        setDomains(uniqueDomains);
      } catch (error) {
        console.error('Error fetching domains:', error);
      }
    };

    fetchDomains();
  }, []);

  return (
    <FilterBlogsContext.Provider value={{ domains, selectedDomain, setSelectedDomain }}>
      {children}
    </FilterBlogsContext.Provider>
  );
}

export function useFilterBlogs() {
  const context = useContext(FilterBlogsContext);
  if (context === undefined) {
    throw new Error('useFilterBlogs must be used within a FilterBlogsProvider');
  }
  return context;
} 