import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { BlogPost } from '@/lib/types';
import BlogDetail from '@/components/BlogDetail';

interface PageProps {
  params: { slug: string };
}

// Fetch data on the server
async function getPostData(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
    };
  }

  return {
    title: `${post.title} | MTD Gayrimenkul Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featuredImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

// The page component is now a Server Component
export default async function BlogDetailPage({ params }: PageProps) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogDetail post={post} />;
}
