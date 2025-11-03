'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-midnight-blue shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/20 px-6 sm:px-10 py-3">
          <Link href="/" className="flex items-center gap-4 text-white">
            <div className="size-6 text-electric-teal">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">MTD Gayrimenkul</h2>
          </Link>
          <nav className="hidden lg:flex flex-1 justify-end items-center gap-8 text-white">
            <Link href="/" className="text-sm font-medium leading-normal hover:text-gray-300 transition-colors">Ana Sayfa</Link>
            <Link href="/satilik" className="text-sm font-medium leading-normal hover:text-gray-300 transition-colors">Satılık</Link>
            <Link href="/kiralik" className="text-sm font-medium leading-normal hover:text-gray-300 transition-colors">Kiralık</Link>
            <Link href="/projeler" className="text-sm font-medium leading-normal hover:text-gray-300 transition-colors">Projeler</Link>
            <Link href="/blog" className="text-sm font-medium leading-normal hover:text-gray-300 transition-colors">Blog / Bölge Rehberi</Link>
            <Link href="/hakkimizda" className="text-sm font-medium leading-normal hover:text-gray-300 transition-colors">Hakkımızda</Link>
            <Link href="/iletisim" className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-white/20 text-white text-sm font-bold hover:bg-white/30 transition-colors">İletişim</Link>
          </nav>
          <button className="lg:hidden text-white" aria-label="Menüyü aç">
            {/* Placeholder for menu icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
