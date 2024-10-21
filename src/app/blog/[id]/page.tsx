"use client"

import React from 'react';
import { blogs } from '../../data/blog';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function BlogPage({ params }: { params: { id: string } }) {
  const blogId = parseInt(params.id);
  const blog = blogs[blogId];

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const renderBlogContent = () => {
    switch (blog.structure_type) {
      case 'tutorial':
        return (
          <div>
            <h2 className="text-2xl font-bold mt-6 mb-4">Steps</h2>
            {blog.steps.map((step, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.instruction}</p>
                {step.image && (
                  <div className="mt-2">
                    <Image src={step.image.path} alt={step.image.alt_text} width={300} height={200} />
                    <p className="text-sm text-gray-500 mt-1">{step.image.caption}</p>
                  </div>
                )}
              </div>
            ))}
            {blog.conclusion && <p className="mt-6">{blog.conclusion}</p>}
          </div>
        );
      case 'comparison':
        return (
          <div>
            <h2 className="text-2xl font-bold mt-6 mb-4">Comparison Points</h2>
            {blog.comparison_points.map((point, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{point.feature}</h3>
                <p><strong>DSLR:</strong> {point.dslr}</p>
                <p><strong>Mirrorless:</strong> {point.mirrorless}</p>
              </div>
            ))}
            {blog.conclusion && <p className="mt-6">{blog.conclusion}</p>}
          </div>
        );
      // Add more cases for other blog types...
      default:
        return <p>Content not available for this blog type.</p>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
        <div className="w-full max-w-3xl mx-auto mb-6">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={blog.main_image.path}
              alt={blog.main_image.alt_text}
              fill
              className="object-cover rounded-lg"
            />
          </AspectRatio>
          <p className="text-sm text-gray-500 mt-2">{blog.main_image.caption}</p>
        </div>
        <p className="text-xl mb-6">{blog.summary}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        {blog.introduction && <p className="mb-6">{blog.introduction.text}</p>}
        {renderBlogContent()}
      </div>
    </Layout>
  );
}
