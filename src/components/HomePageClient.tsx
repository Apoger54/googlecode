'use client';

import Header3D from '@/components/Header3D';
import FilterForm from '@/components/FilterForm';
import ListingCard from '@/components/ListingCard';
import { PropertyListing } from '@/lib/types';

interface HomePageClientProps {
  featuredListings: PropertyListing[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({ featuredListings }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <Header3D />
        <div className="flex min-h-[60vh] md:min-h-screen flex-col gap-6 items-center justify-center p-4 text-center">
          <div className="flex flex-col gap-4 mt-16 sm:mt-0 max-w-4xl z-10">
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              Alanya & Antalya'da Hayalinizdeki Evi Birlikte Bulalım
            </h1>
            <h2 className="text-white/90 text-base md:text-xl font-normal leading-normal">
              Hemen aramaya başlayın ve hayalinizdeki evi bulun.
            </h2>
          </div>
          <div className="w-full max-w-4xl mt-6 z-10">
            <FilterForm />
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight px-4 pb-3 pt-12 md:pt-20 text-center text-gray-900 dark:text-white">
          Öne Çıkan İlanlar
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Sizin için seçtiğimiz en popüler mülklere göz atın.
        </p>

        {featuredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {featuredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-center">Öne çıkan ilan bulunamadı.</p>
        )}
      </div>
    </>
  );
};

export default HomePageClient;
