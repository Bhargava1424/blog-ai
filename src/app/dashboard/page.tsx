// dashboard/page.tsx

"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from '@/components/ui/skeleton'; 
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Share } from "lucide-react"
import Modal from '@/components/ui/modal'; // Import the Modal component
import { extractDomain } from '@/lib/utils'; // We'll create this utility function

// Add the interface for the API response
interface ArticleResponse {
  id: string;
  title: string;
  published: string;
  link?: string;
  source?: string;
  image_url?: string;
  scrape_result?: string;
  summary_result?: string;
  blog_result?: string;
  image_result?: string;
  keyword_result?: string;
  created_at: string;
}

// Fix the error handling type
interface WordPressError {
  message?: string;
  code?: string;
}

export default function Dashboard() {
  const [blogs, setBlogs] = useState<ArticleResponse[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<ArticleResponse | null>(null);
  const [wordpressUrl, setWordpressUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSummarizerModalOpen, setIsSummarizerModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [filteredBlogs, setFilteredBlogs] = useState<ArticleResponse[]>([]);
  const [postStatus, setPostStatus] = useState<'draft' | 'publish'>('draft');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/article/', {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Extract unique domains from blogs
    const uniqueDomains = Array.from(new Set(
      blogs.map(blog => blog.link ? extractDomain(blog.link) : 'unknown')
    )).filter(Boolean);
    setDomains(uniqueDomains);
  }, [blogs]);

  useEffect(() => {
    if (selectedDomain === 'all') {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter(blog => 
        blog.link && extractDomain(blog.link) === selectedDomain
      ));
    }
  }, [selectedDomain, blogs]);

  const openPreview = (blog: ArticleResponse) => {
    setSelectedBlog(blog);
    setIsSummarizerModalOpen(true); // Open the summarizer modal first
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSummarizerModalOpen(false);
  };

  const handleSummarize = () => {
    setIsSummarizerModalOpen(false);
    setIsModalOpen(true); // Open the main modal after summarizing
  };

  const handlePostToWordPress = async () => {
    if (!wordpressUrl || !username || !password) {
      alert('Please fill in all WordPress credentials');
      return;
    }

    if (!wordpressUrl.startsWith('http://') && !wordpressUrl.startsWith('https://')) {
      alert('Please enter a valid WordPress URL starting with http:// or https://');
      return;
    }

    if (!selectedBlog) {
      console.error('No blog selected');
      return;
    }

    setIsPosting(true);

    try {
      // Clean up the WordPress URL
      const cleanWordPressUrl = wordpressUrl.replace(/\/?$/, '');

      // Format the blog content using the actual API response data structure
      const content = `
        <!-- wp:heading -->
        <h2>${selectedBlog.title}</h2>
        <!-- /wp:heading -->

        ${selectedBlog.image_url ? `
        <!-- wp:image -->
        <figure class="wp-block-image">
          <img src="${selectedBlog.image_url}" alt="${selectedBlog.title}"/>
        </figure>
        <!-- /wp:image -->
        ` : ''}

        ${selectedBlog.summary_result && selectedBlog.summary_result !== "Error generating summary: Request timed out." ? `
        <!-- wp:paragraph -->
        <p>${selectedBlog.summary_result}</p>
        <!-- /wp:paragraph -->
        ` : ''}

        ${selectedBlog.scrape_result && selectedBlog.scrape_result !== "No meaningful content found" ? `
        <!-- wp:paragraph -->
        <p>${selectedBlog.scrape_result}</p>
        <!-- /wp:paragraph -->
        ` : ''}

        ${selectedBlog.blog_result ? `
        <!-- wp:paragraph -->
        <p>${selectedBlog.blog_result}</p>
        <!-- /wp:paragraph -->
        ` : ''}

        <!-- wp:paragraph -->
        <p>Published: ${selectedBlog.published || 'No date available'}</p>
        <!-- /wp:paragraph -->

        ${selectedBlog.link ? `
        <!-- wp:paragraph -->
        <p>Source: <a href="${selectedBlog.link}">${selectedBlog.source || 'Original Article'}</a></p>
        <!-- /wp:paragraph -->
        ` : ''}
      `.trim();

      // Prepare the post data according to WordPress REST API specifications
      const postData = {
        title: selectedBlog.title,
        content: content,
        status: 'publish',
        format: 'standard'
      };

      // Create Basic Auth header
      const authHeader = 'Basic ' + btoa(`${username}:${password}`);

      // Make the POST request to WordPress
      const response = await fetch(`${cleanWordPressUrl}/wp-json/wp/v2/posts`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('WordPress API Error:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          error: errorData
        });
        throw new Error(
          `WordPress Error (${response.status}): ${errorData.message || 'Unknown error'}`
        );
      }

      await response.json();
      
      // Show success message
      alert('Successfully posted to WordPress!');
      closeModal();

    } catch (error) {
      const wpError = error as WordPressError;
      console.error('Error posting to WordPress:', wpError);
      alert(`Failed to post to WordPress: ${wpError.message || 'Unknown error'}`);
    } finally {
      setIsPosting(false);
    }
  };

  const handleShare = (platform: string, blogUrl: string) => {
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(blogUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;
        break;
    }
    window.open(shareUrl, '_blank');
  };

  const handleFilterChange = () => {
    // Implement filter logic here if needed
  };

  const clearAllFilters = () => {
    setSelectedDomain('all');
    // Clear other filters if needed
  };

  return (
    <Layout 
      handleFilterChange={handleFilterChange} 
      clearAllFilters={clearAllFilters}
      domains={domains}
      selectedDomain={selectedDomain}
      onDomainChange={(domain) => setSelectedDomain(domain)}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    <Skeleton className="w-full h-full" />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-3 flex-grow">
                  <Skeleton className="h-6 mb-2" />
                  <Skeleton className="h-4 mb-2" />
                  <Skeleton className="h-4 mb-2" />
                  <Skeleton className="h-4" />
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between items-center mt-auto">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </CardFooter>
              </Card>
            ))
          ) : (
            filteredBlogs.map((blog, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    {blog.image_url && (
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        layout="fill"
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-3 flex-grow">
                  <CardTitle className="text-lg mb-2 line-clamp-1">{blog.title}</CardTitle>
                  <p className="text-gray-600 mb-2 text-sm line-clamp-2">{blog.summary_result}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(blog.tags || []).slice(0, 2).map((tag: string, tagIndex: number) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {blog.tags && blog.tags.length > 2 && (
                      <Badge variant="outline">+{blog.tags.length - 2} more</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Type: {blog.structure_type}</p>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between items-center mt-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem 
                        onClick={() => handleShare('twitter', `https://yourblog.com/blog/${index}`)}
                        className="menuItem twitter"
                      >
                        <FaTwitter className="mr-2 h-4 w-4" />
                        Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleShare('whatsapp', `https://yourblog.com/blog/${index}`)}
                        className="menuItem whatsapp"
                      >
                        <FaWhatsapp className="mr-2 h-4 w-4" />
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleShare('linkedin', `https://yourblog.com/blog/${index}`)}
                        className="menuItem linkedin"
                      >
                        <FaLinkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex space-x-2">
                    <Button 
                      variant="secondary"
                      onClick={() => openPreview(blog)}
                      size="sm"
                    >
                      Post
                    </Button>
                    <Link href={`/blog/${blog.id}`} passHref>
                      <Button size="sm">
                        Open
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isSummarizerModalOpen} onClose={closeModal}>
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Summarizer</h4>
          <p>empty</p>
          <Button onClick={handleSummarize}>
            Summarize
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Post to WordPress</h4>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="wordpress-url">WordPress URL</Label>
              <Input 
                id="wordpress-url" 
                value={wordpressUrl}
                onChange={(e) => setWordpressUrl(e.target.value)}
                placeholder="https://your-wordpress-site.com"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="WordPress username"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="WordPress application password"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="post-status">Post Status</Label>
              <select 
                id="post-status"
                value={postStatus}
                onChange={(e) => setPostStatus(e.target.value as 'draft' | 'publish')}
                className="form-select"
              >
                <option value="draft">Save as Draft</option>
                <option value="publish">Publish Immediately</option>
              </select>
            </div>
          </div>
          <Button 
            onClick={handlePostToWordPress} 
            disabled={isPosting}
            className={isPosting ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isPosting ? (
              <>
                <span className="animate-spin mr-2">⌛</span>
                Posting...
              </>
            ) : (
              'Post to WordPress'
            )}
          </Button>
        </div>
      </Modal>
    </Layout>
  );
}
