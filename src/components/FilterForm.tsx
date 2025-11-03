'use client';

import { useState } from 'react';

const FilterForm = () => {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('all');
  const [roomCount, setRoomCount] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would trigger a search with the selected filters
    console.log({
      keyword,
      type,
      roomCount,
    });
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl p-4 md:p-6 bg-black/30 backdrop-blur-sm rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative lg:col-span-2">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            className="form-input w-full h-12 rounded-lg text-white bg-white/10 border-white/20 focus:border-white/50 focus:ring-0 pl-10 placeholder:text-gray-400"
            placeholder="Bölge, adres, anahtar kelime..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <select
          className="form-select w-full h-12 rounded-lg text-white bg-white/10 border-white/20 focus:border-white/50 focus:ring-0"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">Satılık / Kiralık</option>
          <option value="sale">Satılık</option>
          <option value="rent">Kiralık</option>
        </select>
        <select
          className="form-select w-full h-12 rounded-lg text-white bg-white/10 border-white/20 focus:border-white/50 focus:ring-0"
          value={roomCount}
          onChange={(e) => setRoomCount(e.target.value)}
        >
          <option value="all">Oda Sayısı</option>
          <option value="1+1">1+1</option>
          <option value="2+1">2+1</option>
          <option value="3+1">3+1</option>
          <option value="4+1">4+1 ve üzeri</option>
        </select>
        <button
          type="submit"
          className="flex w-full h-12 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-midnight-blue hover:bg-opacity-90 text-white text-base font-bold transition-colors"
        >
          <span className="truncate">Ara</span>
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
