// dashboard/page.tsx

import React from 'react';
import { blogs } from '../data/blog';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Dashboard() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              {blog.main_image && (
                <Image
                  src={blog.main_image.path}
                  alt={blog.main_image.alt_text}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover mb-4 rounded"
                  unoptimized
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mb-2">Type: {blog.structure_type}</p>
              <Link href={`/blog/${index}`} className="text-blue-600 hover:underline">
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
