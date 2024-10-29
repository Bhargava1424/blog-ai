"use client"

import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilterDropdown } from "../components/FilterDropdown"

const contentTypeOptions = ['Technology', 'Productivity', 'Lifestyle']
const resourceTypeOptions = ['Website', 'PDF', 'YouTube', 'Docs']
const keywordsOptions = ['AI', 'Machine Learning', 'Web Development', 'Data Science']
const websiteOptions = ['Medium', 'Dev.to', 'Hashnode']
const pdfOptions = ['Research Papers', 'E-books', 'Whitepapers']
const youtubeOptions = ['Tutorials', 'Tech Talks', 'Reviews']
const docsOptions = ['API Documentation', 'User Guides', 'Technical Specifications']

export default function PreferencesPage() {
  const [contentTypeFilter, setContentTypeFilter] = useState<string[]>([])
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string[]>([])
  const [keywordsFilter, setKeywordsFilter] = useState<string[]>([])
  const [websiteFilter, setWebsiteFilter] = useState<string[]>([])
  const [pdfFilter, setPdfFilter] = useState<string[]>([])
  const [youtubeFilter, setYoutubeFilter] = useState<string[]>([])
  const [docsFilter, setDocsFilter] = useState<string[]>([])
  const [showAIGenerated, setShowAIGenerated] = useState(false)
  const [autoSaveDrafts, setAutoSaveDrafts] = useState(false)
  const [receiveNotifications, setReceiveNotifications] = useState(false)

  const handleFilterChange = (filterType: string, value: string) => {
    const filterMap: Record<string, React.Dispatch<React.SetStateAction<string[]>>> = {
      contentType: setContentTypeFilter,
      resourceType: setResourceTypeFilter,
      keywords: setKeywordsFilter,
      website: setWebsiteFilter,
      pdf: setPdfFilter,
      youtube: setYoutubeFilter,
      docs: setDocsFilter,
    }
    const setFilter = filterMap[filterType]
    setFilter(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  const handleSave = () => {
    const preferences = {
      contentTypeFilter,
      resourceTypeFilter,
      keywordsFilter,
      websiteFilter,
      pdfFilter,
      youtubeFilter,
      docsFilter,
      showAIGenerated,
      autoSaveDrafts,
      receiveNotifications,
    }
    console.log('Saving preferences:', preferences)
    alert("Preferences saved successfully!")
  }

  return (
    <Layout handleFilterChange={handleFilterChange} clearAllFilters={() => {}}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Preferences</h1>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content Preferences</TabsTrigger>
            <TabsTrigger value="blog">Blog Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
                <CardDescription>Customize your content feed and resource filtering</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FilterDropdown
                  title="Content Type"
                  options={contentTypeOptions}
                  selected={contentTypeFilter}
                  onSelect={(value) => handleFilterChange('contentType', value)}
                  onRemove={(value) => handleFilterChange('contentType', value)}
                />
                <FilterDropdown
                  title="Resource Type"
                  options={resourceTypeOptions}
                  selected={resourceTypeFilter}
                  onSelect={(value) => handleFilterChange('resourceType', value)}
                  onRemove={(value) => handleFilterChange('resourceType', value)}
                />
                <FilterDropdown
                  title="Website"
                  options={websiteOptions}
                  selected={websiteFilter}
                  onSelect={(value) => handleFilterChange('website', value)}
                  onRemove={(value) => handleFilterChange('website', value)}
                  visible={resourceTypeFilter.includes('Website')}
                />
                <FilterDropdown
                  title="PDF"
                  options={pdfOptions}
                  selected={pdfFilter}
                  onSelect={(value) => handleFilterChange('pdf', value)}
                  onRemove={(value) => handleFilterChange('pdf', value)}
                  visible={resourceTypeFilter.includes('PDF')}
                />
                <FilterDropdown
                  title="YouTube"
                  options={youtubeOptions}
                  selected={youtubeFilter}
                  onSelect={(value) => handleFilterChange('youtube', value)}
                  onRemove={(value) => handleFilterChange('youtube', value)}
                  visible={resourceTypeFilter.includes('YouTube')}
                />
                <FilterDropdown
                  title="Docs"
                  options={docsOptions}
                  selected={docsFilter}
                  onSelect={(value) => handleFilterChange('docs', value)}
                  onRemove={(value) => handleFilterChange('docs', value)}
                  visible={resourceTypeFilter.includes('Docs')}
                />
                <FilterDropdown
                  title="Keywords"
                  options={keywordsOptions}
                  selected={keywordsFilter}
                  onSelect={(value) => handleFilterChange('keywords', value)}
                  onRemove={(value) => handleFilterChange('keywords', value)}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Blog Preferences</CardTitle>
                <CardDescription>Customize your blog creation and viewing experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-generated">Show AI-generated content</Label>
                  <Switch 
                    id="ai-generated" 
                    checked={showAIGenerated}
                    onCheckedChange={setShowAIGenerated}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save">Auto-save drafts</Label>
                  <Switch 
                    id="auto-save" 
                    checked={autoSaveDrafts}
                    onCheckedChange={setAutoSaveDrafts}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Receive notifications</Label>
                  <Switch 
                    id="notifications" 
                    checked={receiveNotifications}
                    onCheckedChange={setReceiveNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <Button onClick={handleSave} className="w-full">Save Preferences</Button>
        </div>
      </div>
    </Layout>
  );
}
