import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    showToast('Logged out successfully', 'success')
    navigate('/');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`fixed left-0 top-0 z-50 w-full px-5 md:px-[60px] transition-all duration-300 ${scrolled ? 'bg-[#111111] shadow-lg backdrop-blur-sm' : 'bg-[#111111]/90'}`}>
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
          <button
            type="button"
            className="text-white"
            aria-label="Open search"
            onClick={() => {
              setIsSearchOpen((current) => !current);
              setIsMenuOpen(false);
            }}
          >
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

          {user ? (
            <div className="flex items-center gap-2 text-white">
              <Link to="/profile" className="text-white" aria-label="Profile">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
              <span className="text-sm hidden sm:inline">{user.displayName || user.email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-white" aria-label="Login">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          )}

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

      <div
        className={`absolute left-0 top-full z-20 w-full overflow-hidden border-t border-white/10 bg-[#111111] transition-all duration-300 ease-out ${
          isSearchOpen ? 'max-h-24 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-4 md:px-[60px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search products..."
            className="flex-1 border-b border-white/70 bg-transparent py-2 text-sm text-white outline-none placeholder:text-gray-400 sm:text-base md:text-lg"
            autoFocus
          />
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-white transition-colors hover:bg-white/10"
            aria-label="Close search"
          >
            ✕
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
