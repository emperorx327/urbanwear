import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const TAGS = ['All', 'Hoodies', 'Tees', 'Pants', 'Sneakers', 'Accessories'];

export default function Shop() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const [activeFilter, setActiveFilter] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const { products, loading, error } = useProducts();

  const filtered = products.filter((product) => {
    if (searchQuery) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (activeFilter === 'All') return true;
    return product.category === activeFilter;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  const title = searchQuery ? `Search results for: ${searchQuery}` : 'ALL PRODUCTS';

  useEffect(() => {
    setPage(1);
  }, [searchQuery, activeFilter]);

  function handleTagClick(tag) {
    setActiveFilter(tag);
    setPage(1);
  }

  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  function nextPage() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  return (
    <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-4">
      <main className="w-full max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Error loading products: {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex justify-center">
                <article className="w-full h-full bg-[#F5F5F5] rounded-2xl md:rounded-3xl relative p-3 sm:p-4 md:p-5 flex flex-col animate-pulse">
                  <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 bg-[#E0E0E0] rounded-xl md:rounded-2xl flex-shrink-0" />
                  <div className="flex-1 flex flex-col mt-2 sm:mt-3 md:mt-4">
                    <div className="h-4 bg-[#E0E0E0] rounded w-3/4" />
                    <div className="h-4 bg-[#E0E0E0] rounded w-1/2 mt-2" />
                    <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-200">
                      <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E0E0E0]" />
                      <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E0E0E0]" />
                      <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E0E0E0]" />
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <>
        <header className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black break-words">{title}</h1>
          <p className="text-xs sm:text-sm text-[#888888] mt-2 md:mt-3">
            {searchQuery
              ? filtered.length > 0
                ? `Showing ${paginated.length} of ${filtered.length} results`
                : `No products found for ${searchQuery}`
              : `Showing ${paginated.length} of ${filtered.length} products`}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 md:gap-4 mt-6 sm:mt-8 md:mt-10">
            <span className="text-xs sm:text-sm font-bold text-[#888888] whitespace-nowrap">FILTER BY:</span>

            {TAGS.map((tag) => {
              const isActive = activeFilter === tag;
              const base = 'flex items-center justify-center rounded-full text-xs sm:text-sm font-medium transition-all';
              if (tag === 'All') {
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`${base} px-3 py-1.5 sm:px-4 sm:py-2 ${isActive ? 'bg-[#111111] text-white' : 'bg-[#111111] text-white/70 hover:text-white'}`}
                  >
                    ALL
                  </button>
                );
              }

              return (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`${base} px-3 py-1.5 sm:px-4 sm:py-2 ${isActive ? 'bg-[#111111] text-white border border-[#111111]' : 'bg-transparent border border-[#DDDDDD] text-black hover:border-[#111111]'}`}
                >
                  {tag}
                </button>
              );
            })}

            <select className="w-full sm:w-auto sm:ml-auto text-xs sm:text-sm px-3 py-2 border border-[#DDDDDD] rounded bg-white text-black">
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </header>

        <section className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-[#FAFAFA] px-4 py-12 text-center text-sm text-[#666666] sm:px-6 sm:py-16">
              No products found for {searchQuery}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <Link to={`/product/${product.id}`} className="no-underline text-inherit w-full">
                    <article className="w-full h-full bg-[#F5F5F5] rounded-2xl md:rounded-3xl relative p-3 sm:p-4 md:p-5 flex flex-col">
                      <button 
                        className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 p-1.5 hover:bg-white rounded-full transition-colors" 
                        aria-label="Favorite"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="#888888" className="w-4 h-4 sm:w-5 sm:h-5 hover:stroke-red-500">
                          <path d="M12 21s-7-4.35-9-7.27C1 10.36 3.24 6 7 6c2.11 0 3.11 1.09 5 3 1.89-1.91 2.89-3 5-3 3.76 0 6 4.36 4 7.73-2 2.92-9 7.27-9 7.27z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 bg-[#E0E0E0] rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-[#BBBBBB] text-xs sm:text-sm">Image</span>
                      </div>

                      <div className="flex-1 flex flex-col mt-2 sm:mt-3 md:mt-4">
                        <h3 className="text-xs sm:text-sm font-medium text-black line-clamp-2">{product.name}</h3>
                        <p className="text-xs sm:text-sm font-bold text-black mt-1 md:mt-2">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>

                        <div className="flex items-center gap-1.5 mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-200">
                          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black" />
                          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-400" />
                          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white border border-gray-300" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-12 sm:mt-16 md:mt-20 pb-8">
          <button onClick={prevPage} disabled={page === 1 || filtered.length === 0} className="text-xs sm:text-sm md:text-base text-black disabled:opacity-50 px-2 py-1.5">
            ←
          </button>

          <div className="flex gap-1 sm:gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`text-xs sm:text-sm px-2 py-1.5 rounded transition-all ${pageNum === page ? 'bg-black text-white border-b-2 border-black' : 'text-black hover:bg-gray-100'}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button onClick={nextPage} disabled={page === totalPages || filtered.length === 0} className="text-xs sm:text-sm md:text-base text-black disabled:opacity-50 px-2 py-1.5">
            →
          </button>
        </div>
          </>
        )}
      </main>
    </div>
  );
}
