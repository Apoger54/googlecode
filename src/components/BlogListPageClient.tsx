'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import Breadcrumb from '@/components/Breadcrumb';

// Self-contained component for the blog post card
const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="flex flex-col gap-4 bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
    <div
      className="w-full bg-center bg-no-repeat aspect-video bg-cover"
      style={{ backgroundImage: `url("${post.featuredImageUrl}")` }}
      aria-label={post.title}
    ></div>
    <div className="p-5 flex flex-col flex-grow">
      <p className="text-xs font-bold uppercase text-secondary tracking-wider mb-2">{post.category}</p>
      <h3 className="text-gray-900 dark:text-text-dark text-lg font-bold leading-snug flex-grow group-hover:text-secondary transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-600 dark:text-text-muted-dark text-sm font-normal leading-normal mt-2">
        {post.excerpt}
      </p>
      <div className="text-secondary text-sm font-bold leading-normal mt-4 inline-flex items-center gap-2">
        Devamını Oku
        <span className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
      </div>
    </div>
  </Link>
);


interface BlogListPageClientProps {
  posts: BlogPost[];
}

const BlogListPageClient: React.FC<BlogListPageClientProps> = ({ posts }) => {
  const breadcrumbItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Bölge Rehberleri' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-10 lg:px-20 py-5 sm:py-10 pt-24">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-col gap-3 mb-8">
        <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
          Bölge Rehberleri & Emlak İpuçları
        </h1>
        <p className="text-gray-600 dark:text-text-muted-dark text-base md:text-lg font-normal leading-normal max-w-3xl">
          Alanya ve Antalya'da yatırım yaparken veya yeni bir hayata başlarken bilmeniz gereken her şey.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p>Yazı bulunamadı.</p>
      )}
    </div>
  );
};

export default BlogListPageClient;
