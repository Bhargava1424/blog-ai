// dashboard/page.tsx

import React from 'react';
import { blogs } from '../data/blog';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Dashboard() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
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
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded"
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
              <CardFooter className="p-3 pt-0">
                <Link href={`/blog/${index}`} className="text-blue-600 hover:underline text-sm">
                  Read more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
