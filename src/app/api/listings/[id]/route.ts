import { NextResponse } from 'next/server';
import { mockListings } from '@/data/listings';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const listing = mockListings.find(listing => listing.id === id);

  if (listing) {
    return NextResponse.json(listing);
  } else {
    return new NextResponse(JSON.stringify({ message: `Listing with id ${id} not found` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
