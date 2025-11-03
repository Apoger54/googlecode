import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { PropertyListing } from '@/lib/types';
import ListingDetail from '@/components/ListingDetail';

interface PageProps {
  params: { id: string };
}

// Fetch data on the server
async function getListingData(id: string): Promise<{ listing: PropertyListing | null; similarListings: PropertyListing[] }> {
  // In a real app, you'd fetch from your actual API endpoint or database
  const listingRes = await fetch(`http://localhost:3000/api/listings/${id}`, { cache: 'no-store' });

  if (!listingRes.ok) {
    return { listing: null, similarListings: [] };
  }
  const listing: PropertyListing = await listingRes.json();

  const allListingsRes = await fetch(`http://localhost:3000/api/listings`, { cache: 'no-store' });
  const allListings: PropertyListing[] = await allListingsRes.json();

  const similarListings = allListings
    .filter(l => l.location.district === listing.location.district && l.id !== id)
    .slice(0, 3);

  return { listing, similarListings };
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { listing } = await getListingData(params.id);

  if (!listing) {
    return {
      title: 'İlan Bulunamadı',
    };
  }

  return {
    title: `${listing.title} | MTD Gayrimenkul`,
    description: listing.description.substring(0, 160),
    openGraph: {
      title: listing.title,
      description: listing.description.substring(0, 160),
      images: [
        {
          url: listing.imageUrls[0],
          width: 1200,
          height: 630,
          alt: listing.title,
        },
      ],
    },
  };
}

// The page component is now a Server Component
export default async function ListingDetailPage({ params }: PageProps) {
  const { listing, similarListings } = await getListingData(params.id);

  if (!listing) {
    notFound();
  }

  return <ListingDetail listing={listing} similarListings={similarListings} />;
}
