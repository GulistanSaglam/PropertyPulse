import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '@/assets/images/logo-white.png';

const Footer = () => {
  
    const currentYear = new Date().getFullYear();
    return (
    <footer className="bg-black py-4 mt-24">
    <div
      className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"
    >
      <div
        className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0"
      >
        <ul className="flex space-x-4 text-white">
          <li><Link href="/properties">Properties</Link></li>
          <li><Link href="/terms">Terms of Service</Link></li>
        </ul>
      </div>
      <div>
        <p className="text-sm text-white mt-2 md:mt-0">
          &copy; {currentYear} RentalApp. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer