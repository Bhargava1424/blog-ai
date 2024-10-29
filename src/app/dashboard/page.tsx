// dashboard/page.tsx

"use client"

import React, { useState } from 'react';
import { blogs, Blog } from '../data/blog';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaTwitter, FaWhatsapp, FaLinkedin, FaClock, FaTags } from 'react-icons/fa';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Share } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from '@/styles/ShareMenu.module.css';

export default function Dashboard() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [wordpressUrl, setWordpressUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const openPreview = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const handlePostToWordPress = async () => {
    if (!selectedBlog) return;

    setIsPosting(true);

    try {
      // Construct HTML content with controlled image size
      const content = `
        <img src="${selectedBlog.main_image?.path}" alt="${selectedBlog.main_image?.alt_text}" style="max-width: 100%; height: auto; max-height: 400px; object-fit: cover;">
        <p>${selectedBlog.summary}</p>
        ${renderPreviewContent(selectedBlog)}
      `;

      const postData = {
        title: selectedBlog.title,
        content: content,
        status: 'publish',
      };

      const response = await fetch(`${wordpressUrl}/wp-json/wp/v2/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(username + ':' + password),
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to post to WordPress: ${errorData.message}`);
      }

      alert('Blog successfully posted to WordPress!');
    } catch (error) {
      console.error('Error posting to WordPress:', error);
      alert(`Failed to post blog to WordPress. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsPosting(false);
    }
  };

  const renderPreviewContent = (blog: Blog) => {
    switch (blog.structure_type) {
      case 'tutorial':
        return (
          <>
            <h3 className="font-semibold mt-4">Steps:</h3>
            <ol className="list-decimal list-inside">
              {blog.steps.map((step, index) => (
                <li key={index} className="mt-2">
                  {step.title}
                  {step.image && (
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }} 
                    />
                  )}
                </li>
              ))}
            </ol>
          </>
        );
      case 'comparison':
        return (
          <>
            <h3 className="font-semibold mt-4">Comparison Points:</h3>
            <ul className="list-disc list-inside">
              {blog.comparison_points.slice(0, 3).map((point, index) => (
                <li key={index} className="mt-2">{point.feature}</li>
              ))}
            </ul>
            {blog.comparison_points.length > 3 && <p className="mt-2 text-sm text-gray-500">...and {blog.comparison_points.length - 3} more points</p>}
          </>
        );
      case 'review':
        return (
          <>
            <h3 className="font-semibold mt-4">Pros:</h3>
            <ul className="list-disc list-inside">
              {blog.pros.slice(0, 3).map((pro, index) => (
                <li key={index} className="mt-1">{pro}</li>
              ))}
            </ul>
            <h3 className="font-semibold mt-4">Cons:</h3>
            <ul className="list-disc list-inside">
              {blog.cons.slice(0, 3).map((con, index) => (
                <li key={index} className="mt-1">{con}</li>
              ))}
            </ul>
          </>
        );
      // Add more cases for other blog types as needed
      default:
        return null;
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

  return (
    <Layout handleFilterChange={() => {}} clearAllFilters={() => {}}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs.map((blog, index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <AspectRatio ratio={16 / 9}>
                  {blog.main_image && (
                    <Image
                      src={blog.main_image.path}
                      alt={blog.main_image.alt_text}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </AspectRatio>
              </CardHeader>
              <CardContent className="p-3 flex-grow">
                <CardTitle className="text-lg mb-2 line-clamp-1">{blog.title}</CardTitle>
                <p className="text-gray-600 mb-2 text-sm line-clamp-2">{blog.summary}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {blog.tags.length > 2 && (
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
                      className={`${styles.menuItem} ${styles.twitter}`}
                    >
                      <FaTwitter className="mr-2 h-4 w-4" />
                      Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleShare('whatsapp', `https://yourblog.com/blog/${index}`)}
                      className={`${styles.menuItem} ${styles.whatsapp}`}
                    >
                      <FaWhatsapp className="mr-2 h-4 w-4" />
                      WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleShare('linkedin', `https://yourblog.com/blog/${index}`)}
                      className={`${styles.menuItem} ${styles.linkedin}`}
                    >
                      <FaLinkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="secondary"
                        onClick={() => openPreview(blog)}
                        size="sm"
                      >
                        Post
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 border-2 border-white">
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
                        </div>
                        <Button onClick={handlePostToWordPress} disabled={isPosting}>
                          {isPosting ? 'Posting...' : 'Post to WordPress'}
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Link href={`/blog/${index}`} passHref>
                    <Button size="sm">
                      Open
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
