"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Blog } from '@/app/data/blog';
import Layout from '@/app/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, Tag, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BlogPost({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/article/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch blog');
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  if (isLoading) {
    return (
      <Layout handleFilterChange={() => {}} clearAllFilters={() => {}}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-6" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout handleFilterChange={() => {}} clearAllFilters={() => {}}>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Blog post not found</AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  // Convert the blog_result markdown to HTML sections
  const sections = blog.blog_result.split('\n\n').filter(Boolean);

  return (
    <Layout handleFilterChange={() => {}} clearAllFilters={() => {}}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="space-y-8">
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{blog.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Original Article
                </a>
              </div>
            </div>
          </div>

          {/* Main Image */}
          {blog.image_url && (
            <Card>
              <CardContent className="p-0 relative h-[400px]">
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </CardContent>
            </Card>
          )}

          {/* Content Tabs */}
          <Tabs defaultValue="article" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="article">Article</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="article" className="mt-6">
              <Card>
                <CardContent className="prose prose-lg max-w-none p-6">
                  {sections.map((section, index) => {
                    if (section.startsWith('#')) {
                      return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{section.replace(/^#+\s/, '')}</h2>;
                    }
                    return <p key={index} className="mb-4">{section}</p>;
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{blog.summary_result}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Keywords Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[100px] w-full">
                <div className="flex flex-wrap gap-2">
                  {blog.keyword_result.split(',').map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </article>
      </div>
    </Layout>
  );
}






