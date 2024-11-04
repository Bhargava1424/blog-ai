"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../components/Layout';
import { Skeleton } from '@/components/ui/skeleton'; // Import the Skeleton component from Shadcn

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      console.log(`Fetching blog with ID: ${id}`); // Debugging log
      const fetchBlog = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/article/${id}`);
          console.log('Fetch response:', response); // Debugging log
          if (!response.ok) {
            throw new Error('Failed to fetch blog details');
          }
          const data = await response.json();
          console.log('Fetched data:', data); // Debugging log
          if (!data) {
            throw new Error('Blog not found');
          }
          setBlog(data);
        } catch (error) {
          console.error('Error fetching blog details:', error);
          setError((error as Error).message); // Type assertion to fix 'unknown' type error
        }
      };

      fetchBlog();
    } else {
      console.log('ID is not available yet'); // Debugging log
    }
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 mb-6" /> {/* Skeleton for title */}
          <Skeleton className="w-full h-64 mb-4" /> {/* Skeleton for image */}
          <Skeleton className="h-4 mb-4" /> {/* Skeleton for summary */}
          <Skeleton className="h-32" /> {/* Skeleton for content */}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
        <img src={blog.image_url} alt={blog.title} className="w-full h-auto mb-4" />
        <p className="text-gray-600 mb-4">{blog.summary_result}</p>
        <div dangerouslySetInnerHTML={{ __html: blog.scrape_result }} />
      </div>
    </Layout>
  );
}
