import { BlogPost } from '@/lib/types';
import BlogListPageClient from '@/components/BlogListPageClient';

async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('http://localhost:3000/api/blog', { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch posts');
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogListPage() {
  const posts = await getPosts();

  return <BlogListPageClient posts={posts} />;
}
