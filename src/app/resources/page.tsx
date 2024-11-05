'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from '@/app/components/Layout'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useState } from 'react'
import { Trash2 } from "lucide-react"

interface UrlPair {
  url: string;
  domain: string;
}

const Resources = () => {
  const [urlPairs, setUrlPairs] = useState<UrlPair[]>([
    { url: '', domain: '' }
  ]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Add these props to match Layout interface
  const handleFilterChange = () => {};
  const clearAllFilters = () => {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Convert urlPairs array to required format
    const urlsObject = urlPairs.reduce((acc, pair) => {
      acc[pair.url] = pair.domain;
      return acc;
    }, {} as Record<string, string>);

    try {
      const response = await fetch('/api/add-urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlsObject }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form on success
        setUrlPairs([{ url: '', domain: '' }]);
        alert(data.message); // Simple success message
      } else {
        throw new Error(data.errors?.join('\n') || 'Failed to add URLs');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <Layout handleFilterChange={handleFilterChange} clearAllFilters={clearAllFilters}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Resources</h1>
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Resource</TabsTrigger>
            <TabsTrigger value="create-blog">Create Blog</TabsTrigger>
            <TabsTrigger value="rss">Add RSS/XML</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Add New Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="resource-type">Resource Type</Label>
                      <Select>
                        <SelectTrigger id="resource-type">
                          <SelectValue placeholder="Select resource type" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="docs">Google Docs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="resource-url">Resource URL</Label>
                      <Input id="resource-url" placeholder="Enter resource URL" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="resource-file">Upload File</Label>
                      <Input id="resource-file" type="file" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                      <Input id="keywords" placeholder="Enter keywords" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Enter any additional notes" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Upload Resource</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="create-blog">
            <Tabs defaultValue="manual" className="w-full">
              <TabsList>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="ai-generated">AI Generated</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Blog Manually</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="title">Blog Title</Label>
                          <Input id="title" placeholder="Enter blog title" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="content">Blog Content</Label>
                          <Textarea id="content" placeholder="Write your blog content here" rows={10} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="keywords">Keywords</Label>
                          <Input id="keywords" placeholder="Enter keywords (comma-separated)" />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button>Create Blog</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="ai-generated">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Blog with AI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="topic">Blog Topic</Label>
                          <Input id="topic" placeholder="Enter the main topic for your blog" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="keywords">Keywords</Label>
                          <Input id="keywords" placeholder="Enter relevant keywords (comma-separated)" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="tone">Writing Tone</Label>
                          <Input id="tone" placeholder="e.g., Professional, Casual, Humorous" />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button>Generate Blog</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="rss">
            <Card>
              <CardHeader>
                <CardTitle>Add RSS/XML Feeds</CardTitle>
              </CardHeader>
              <CardContent>
                {errorMessage && (
                  <div className="mb-4 p-4 text-red-500 bg-red-50 rounded-md">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-6">
                    {urlPairs.map((pair, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1 space-y-1.5">
                          <Label htmlFor={`url-${index}`}>Feed URL</Label>
                          <Input
                            id={`url-${index}`}
                            placeholder="https://example.com/feed.xml"
                            value={pair.url}
                            onChange={(e) => {
                              const newPairs = [...urlPairs];
                              newPairs[index].url = e.target.value;
                              setUrlPairs(newPairs);
                            }}
                          />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <Label htmlFor={`domain-${index}`}>Domain Name</Label>
                          <Input
                            id={`domain-${index}`}
                            placeholder="example.com"
                            value={pair.domain}
                            onChange={(e) => {
                              const newPairs = [...urlPairs];
                              newPairs[index].domain = e.target.value;
                              setUrlPairs(newPairs);
                            }}
                          />
                        </div>
                        {urlPairs.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="mt-6"
                            onClick={() => {
                              setUrlPairs(urlPairs.filter((_, i) => i !== index));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setUrlPairs([...urlPairs, { url: '', domain: '' }]);
                      }}
                    >
                      Add Another Feed
                    </Button>
                  </div>

                  <div className="flex justify-end mt-6 space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setUrlPairs([{ url: '', domain: '' }]);
                        setErrorMessage('');
                      }}
                    >
                      Clear All
                    </Button>
                    <Button type="submit">
                      Save Feeds
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export default Resources;