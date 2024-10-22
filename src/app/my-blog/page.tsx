// dashboard/page.tsx

"use client"

import React, { useState } from 'react';
import { blogs, Blog } from '../data/myblog';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaTwitter, FaWhatsapp, FaLinkedin, FaClock, FaTags } from 'react-icons/fa';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function MyBlog() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const openPreview = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const renderPreviewContent = (blog: Blog) => {
    switch (blog.structure_type) {
      case 'tutorial':
        return (
          <>
            <h3 className="font-semibold mt-4">Steps:</h3>
            <ol className="list-decimal list-inside">
              {blog.steps.slice(0, 3).map((step, index) => (
                <li key={index} className="mt-2">{step.title}</li>
              ))}
            </ol>
            {blog.steps.length > 3 && <p className="mt-2 text-sm text-gray-500">...and {blog.steps.length - 3} more steps</p>}
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs.map((blog, index) => (
            <Card key={index} className="overflow-hidden">
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
              <CardContent className="p-3">
                <CardTitle className="text-lg mb-2 line-clamp-1">{blog.title}</CardTitle>
                <p className="text-gray-600 mb-2 text-sm line-clamp-2">{blog.summary}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {blog.tags.length > 2 && (
                    <Badge variant="Outline">+{blog.tags.length - 2} more</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">Type: {blog.structure_type}</p>
              </CardContent>
              <CardFooter className="p-3 pt-0 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-500" aria-label="Share on Twitter">
                    <FaTwitter size={20} />
                  </button>
                  <button className="text-gray-500 hover:text-green-500" aria-label="Share on WhatsApp">
                    <FaWhatsapp size={20} />
                  </button>
                  <button className="text-gray-500 hover:text-blue-700" aria-label="Share on LinkedIn">
                    <FaLinkedin size={20} />
                  </button>
                </div>
                <div className="flex space-x-2">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button 
                        variant="secondary"
                        onClick={() => openPreview(blog)}
                      >
                        Preview
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle className="text-2xl font-bold">{selectedBlog?.title}</DrawerTitle>
                      </DrawerHeader>
                      <div className="p-4 pb-0 max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/2">
                            <AspectRatio ratio={16 / 9}>
                              <Image
                                src={selectedBlog?.main_image.path || ''}
                                alt={selectedBlog?.main_image.alt_text || ''}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </AspectRatio>
                            <p className="mt-2 text-sm text-gray-500 italic">{selectedBlog?.main_image.caption}</p>
                          </div>
                          <div className="w-full md:w-1/2">
                            <div className="flex items-center mb-4 text-sm text-gray-500">
                              <FaClock className="mr-2" />
                              <span>5 min read</span>
                              <FaTags className="ml-4 mr-2" />
                              <span>{selectedBlog?.tags.join(', ')}</span>
                            </div>
                            <p className="text-gray-700">{selectedBlog?.summary}</p>
                            {selectedBlog?.introduction && (
                              <p className="mt-4 text-gray-700">{selectedBlog.introduction.text}</p>
                            )}
                            <Separator className="my-4" />
                            {selectedBlog && renderPreviewContent(selectedBlog)}
                          </div>
                        </div>
                      </div>
                      <DrawerFooter className="flex justify-between">
                        <Link href={`/blog/${blogs.indexOf(selectedBlog!)}`} passHref>
                          <Button >Read Full Article</Button>
                        </Link>
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                  <Link href={`/blog/${index}`} passHref>
                    <Button >
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
