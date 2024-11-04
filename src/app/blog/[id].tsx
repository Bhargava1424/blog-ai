import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Blog } from '../../data/blog';

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
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
          setError(error.message);
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
    return <p>Loading...</p>;
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