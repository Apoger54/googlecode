import { NextResponse } from 'next/server';
import { mockListings } from '@/data/listings';
import type { PropertyListing } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const location = searchParams.get('location');
  const type = searchParams.get('type');
  const propertyType = searchParams.get('propertyType');
  const roomCount = searchParams.get('roomCount');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  let filteredListings: PropertyListing[] = mockListings;

  if (location) {
    filteredListings = filteredListings.filter(listing =>
      listing.location.district.toLowerCase().includes(location.toLowerCase()) ||
      listing.location.city.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (type) {
    filteredListings = filteredListings.filter(listing => listing.type === type);
  }

  if (propertyType) {
    filteredListings = filteredListings.filter(listing => listing.propertyType === propertyType);
  }

  if (roomCount) {
    filteredListings = filteredListings.filter(listing => listing.roomCount === roomCount);
  }

  if (minPrice) {
    filteredListings = filteredListings.filter(listing => listing.price >= Number(minPrice));
  }

  if (maxPrice) {
    filteredListings = filteredListings.filter(listing => listing.price <= Number(maxPrice));
  }

  return NextResponse.json(filteredListings);
}
