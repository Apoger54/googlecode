import Link from 'next/link';
import { PropertyListing } from '@/lib/types';
import { formatPrice } from '@/lib/utils'; // I will create this utility function later

interface ListingCardProps {
  listing: PropertyListing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-[#1C2331] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover"
        style={{ backgroundImage: `url("${listing.imageUrls[0]}")` }}
        aria-label={listing.title}
      ></div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-normal group-hover:text-electric-teal transition-colors">
          {listing.title}
        </h3>
        <p className="text-gray-600 dark:text-[#97a8c3] text-sm font-normal leading-normal mt-1">
          {listing.roomCount}, {listing.size} m², {listing.location.neighborhood}
        </p>
        <p className="text-gray-800 dark:text-white text-xl font-bold leading-normal mt-2">
          {/* We will need a price formatting utility */}
          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.price)}
        </p>
        <Link
          href={`/satilik/${listing.id}`}
          className="mt-4 inline-flex items-center justify-center h-10 px-5 rounded-lg bg-midnight-blue/10 text-midnight-blue dark:bg-electric-teal/20 dark:text-white text-sm font-bold group-hover:bg-midnight-blue group-hover:text-white transition-colors self-start"
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
