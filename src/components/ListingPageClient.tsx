'use client';

import ListingCard from '@/components/ListingCard';
import { PropertyListing } from '@/lib/types';
import Breadcrumb from '@/components/Breadcrumb';

interface ListingPageClientProps {
  listings: PropertyListing[];
}

const ListingPageClient: React.FC<ListingPageClientProps> = ({ listings }) => {
  const breadcrumbItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Satılık' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-2">
        Satılık İlanlar
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {listings.length} ilan bulundu.
      </p>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p className="text-center">İlan bulunamadı.</p>
      )}
    </div>
  );
};

export default ListingPageClient;
