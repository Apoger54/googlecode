'use client';

import { PropertyListing } from '@/lib/types';
import Breadcrumb from '@/components/Breadcrumb';
import ListingCard from '@/components/ListingCard';

interface ListingDetailProps {
  listing: PropertyListing;
  similarListings: PropertyListing[];
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing, similarListings }) => {
  if (!listing) return <div className="text-center py-40">İlan bulunamadı.</div>;

  const breadcrumbItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Satılık', href: '/satilik' },
    { label: listing.location.city, href: `/satilik?location=${listing.location.city}` },
    { label: listing.title },
  ];

  return (
    <div className="px-4 py-8 md:px-8 lg:px-12 xl:px-20 2xl:px-40 pt-24">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb items={breadcrumbItems} />

        {/* Heading & Price */}
        <div className="flex flex-col md:flex-row md:flex-wrap justify-between gap-4 py-4 mt-4">
            <h1 className="text-gray-900 dark:text-white text-3xl lg:text-4xl font-black leading-tight tracking-[-0.03em]">{listing.title}</h1>
            <p className="text-3xl lg:text-4xl font-bold text-electric-teal">
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.price)}
            </p>
        </div>

        {/* Image Gallery */}
        <div className="w-full grid grid-cols-4 grid-rows-2 gap-2 my-6 h-64 md:h-[480px]">
            <div className="col-span-4 md:col-span-2 row-span-2 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url("${listing.imageUrls[0]}")` }} aria-label={`${listing.title} main image`}></div>
            </div>
            {listing.imageUrls.slice(1, 5).map((url, index) => (
                 <div key={index} className="col-span-2 md:col-span-1 rounded-lg overflow-hidden hidden md:block">
                    <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url("${url}")` }} aria-label={`${listing.title} image ${index + 2}`}></div>
                </div>
            ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
            <div className="lg:col-span-2">
                <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    <h2 className="text-gray-900 dark:text-white text-2xl font-bold">İlan Açıklaması</h2>
                    <p>{listing.description}</p>
                </div>
                <div className="mt-10">
                    <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-4">Özellikler</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
                        {listing.features.map(feature => (
                             <div key={feature} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                                <span className="material-symbols-outlined text-electric-teal">check_circle</span>{feature}
                             </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Agent Sidebar (Placeholder) */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-primary/20 p-6">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">Danışmanla İletişime Geç</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Bu ilan hakkında daha fazla bilgi almak için formu doldurun.</p>
                </div>
            </div>
        </div>

        {/* Similar Listings */}
        <div className="mt-16">
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-6">Benzer İlanlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarListings.map(item => <ListingCard key={item.id} listing={item} />)}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
