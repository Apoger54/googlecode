import { NextResponse } from 'next/server';
import { mockBlogPosts } from '@/data/blog';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const post = mockBlogPosts.find(p => p.slug === slug);

  if (post) {
    return NextResponse.json(post);
  } else {
    return new NextResponse(JSON.stringify({ message: `Blog post with slug '${slug}' not found` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
