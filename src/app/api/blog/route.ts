import { NextResponse } from 'next/server';
import { mockBlogPosts } from '@/data/blog';

export async function GET() {
  return NextResponse.json(mockBlogPosts);
}
