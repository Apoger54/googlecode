import { PropertyListing } from '@/lib/types';
import ListingPageClient from '@/components/ListingPageClient';

async function getListings(): Promise<PropertyListing[]> {
  try {
    const res = await fetch('http://localhost:3000/api/listings', { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch listings');
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export default async function ListingsPage() {
  const listings = await getListings();

  return <ListingPageClient listings={listings} />;
}
