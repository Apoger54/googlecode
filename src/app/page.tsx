import { PropertyListing } from '@/lib/types';
import HomePageClient from '@/components/HomePageClient';

async function getFeaturedListings(): Promise<PropertyListing[]> {
  try {
    const res = await fetch('http://localhost:3000/api/listings', { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch listings');
      return [];
    }
    const allListings: PropertyListing[] = await res.json();
    const featured = allListings.filter(l => l.isFeatured).slice(0, 6);
    return featured.length > 0 ? featured : allListings.slice(0, 6);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export default async function Home() {
  const featuredListings = await getFeaturedListings();

  return <HomePageClient featuredListings={featuredListings} />;
}
