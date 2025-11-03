'use client';

import { BlogPost } from '@/lib/types';
import Breadcrumb from '@/components/Breadcrumb';

interface BlogDetailProps {
  post: BlogPost;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
  if (!post) return <div className="text-center py-40">Yazı bulunamadı.</div>;

  const breadcrumbItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 pt-24">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6">
        <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="text-gray-600 dark:text-subtle-dark text-sm mt-2">
          Yazar: {post.author} • Yayınlanma: {post.publishedDate}
        </p>
      </div>

      <div
        className="w-full bg-center bg-no-repeat bg-cover rounded-xl min-h-[400px] my-8"
        style={{ backgroundImage: `url("${post.featuredImageUrl}")` }}
        aria-label={post.title}
      ></div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-gray-800 dark:text-text-dark"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default BlogDetail;
