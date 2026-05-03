import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative w-full bg-[#111111] px-5 md:px-[60px]">
      <div className="flex h-20 items-center justify-between">
        <Link to="/" className="shrink-0">
          <h1
            className="text-white font-bold text-[20px] md:text-[28px]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            URBANWEAR
          </h1>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 transform items-center gap-8 md:flex">
          <Link to="/new-arrivals" className="text-white text-base">
            New Arrivals
          </Link>
          <Link to="/" className="text-white text-base">
            HOME
          </Link>
          <Link to="/shop" className="text-white text-base">
            SHOP
          </Link>
          <Link to="/about" className="text-white text-base">
            ABOUT
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <Link to="/cart" className="text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2 8m-12 0h16M9 21h6"
              />
            </svg>
          </Link>

          <Link to="/login" className="text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>

          <button
            type="button"
            className="text-white text-2xl leading-none md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            ☰
          </button>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} border-t border-white/10 pb-4 md:hidden`}>
        <div className="flex flex-col gap-4 pt-4 text-white text-base">
          <Link to="/new-arrivals" className="text-white text-base" onClick={() => setIsMenuOpen(false)}>
            New Arrivals
          </Link>
          <Link to="/" className="text-white text-base" onClick={() => setIsMenuOpen(false)}>
            HOME
          </Link>
          <Link to="/shop" className="text-white text-base" onClick={() => setIsMenuOpen(false)}>
            SHOP
          </Link>
          <Link to="/about" className="text-white text-base" onClick={() => setIsMenuOpen(false)}>
            ABOUT
          </Link>
        </div>
      </div>
    </nav>
  );
}
