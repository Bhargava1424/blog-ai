// MyBlog/page.tsx

"use client"

import React, { useState } from 'react';
import { blogs } from '../data/myblog';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export default function MyBlog() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const openPreview = (blog) => {
    setSelectedBlog(blog);
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
                    <span
                      key={tagIndex}
                      className="bg-blue-400 text-black text-xs font-semibold px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{blog.tags.length - 2} more</span>
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
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button 
                      onClick={() => openPreview(blog)}
                      className="bg-gray-900 hover:opacity-100 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Preview
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>{selectedBlog?.title}</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="w-full max-w-md mx-auto">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={selectedBlog?.main_image.path}
                            alt={selectedBlog?.main_image.alt_text}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </AspectRatio>
                      </div>
                      <p className="mt-4 text-sm text-gray-600">{selectedBlog?.summary}</p>
                      {/* Add more content here based on the blog structure */}
                    </div>
                    <DrawerFooter>
                      <Link href={`/blog/${blogs.indexOf(selectedBlog)}`} passHref>
                        <Button>Read Full Article</Button>
                      </Link>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
