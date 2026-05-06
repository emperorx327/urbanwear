import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import SkeletonCard from '../components/SkeletonCard';

export default function Home() {
  const { products, loading } = useProducts();

  const mapCategoryToTag = (cat) => {
    const key = cat.toLowerCase();
    if (key.includes('hoodie')) return 'Hoodies';
    if (key.includes('tee')) return 'Tees';
    if (key.includes('sneaker')) return 'Sneakers';
    if (key.includes('accessor')) return 'Accessories';
    return 'All';
  }

  return (
    <>
      <section className="relative w-full min-h-96 sm:min-h-[640px] md:h-[720px] bg-[#111111] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-bg.jpg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />

        <p
          className="absolute left-4 top-12 sm:left-6 md:left-10 lg:left-[80px] md:top-20 lg:top-[180px] text-[#888888] text-[10px] md:text-[12px] font-bold tracking-[0.2em]"
        >
          NEW COLLECTION
        </p>

        <h1
          className="absolute left-4 top-20 sm:left-6 md:left-10 lg:left-[80px] md:top-24 lg:top-[220px] w-[85vw] max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl text-white text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight"
        >
          OWN THE STREET
        </h1>

        <p
          className="absolute left-4 top-40 sm:left-6 md:left-10 lg:left-[80px] md:top-64 lg:top-[400px] w-[80vw] max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed"
        >
          Minimal luxury essentials for everyday dominance.
        </p>

        <div className="absolute left-4 top-56 sm:left-6 md:left-10 lg:left-[80px] md:top-80 lg:top-[480px] flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <Link
            to="/shop"
            className="inline-flex w-52 sm:w-60 md:w-64 h-12 sm:h-14 md:h-16 items-center justify-center bg-white text-[#111111] text-sm sm:text-base md:text-lg font-bold rounded-lg transition-all hover:bg-gray-100"
          >
            SHOP NOW →
          </Link>
          <Link
            to="/shop"
            className="inline-flex w-52 sm:w-60 md:w-64 h-12 sm:h-14 md:h-16 items-center justify-center border-2 border-white bg-transparent text-white text-sm sm:text-base md:text-lg font-bold rounded-lg transition-all hover:bg-white/10"
          >
            NEW DROP
          </Link>
        </div>
      </section>

      <section className="relative w-full bg-[#FFFFFF] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 xl:py-16">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs sm:text-sm font-bold text-black">
                SHOP BY CATEGORY
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                EXPLORE OUR COLLECTIONS
              </h2>
            </div>

            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold text-black whitespace-nowrap hover:underline"
            >
              VIEW ALL →
            </Link>
          </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              'HOODIES',
              'OVERSIZED TEES',
              'SNEAKERS',
              'ACCESSORIES',
            ].map((category) => {
              const tag = mapCategoryToTag(category);
              return (
                <Link key={category} to={`/shop?category=${encodeURIComponent(tag)}`} className="w-full h-64 sm:h-80 md:h-96 rounded-lg bg-[#1A1A1A] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-[72%] w-full bg-gradient-to-br from-[#2A2A2A] to-[#111111]" />
                  <div className="relative h-[28%] px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 flex flex-col justify-end">
                    <p className="text-base sm:text-lg md:text-xl font-bold text-white">{category}</p>
                    <p className="mt-2 text-xs sm:text-sm font-bold text-white underline">
                      SHOP NOW
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#FFFFFF] overflow-hidden py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex flex-col gap-2">
              <p className="text-xs sm:text-sm font-bold text-black">
                TRENDING NOW
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                MOST LOVED PIECES
              </h2>
            </div>

            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold text-black whitespace-nowrap hover:underline"
            >
              VIEW ALL →
            </Link>
          </div>

          {loading ? (
            <div className="flex gap-6">
              {Array(5).fill(0).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {[
                { name: 'Shadow Oversized Hoodie', price: '$79.99' },
                { name: 'Essential Boxy Tee', price: '$39.99' },
                { name: 'Urban Cargo Pants', price: '$89.99' },
                { name: 'Street Runner V2', price: '$129.99' },
                { name: 'Urban Classic Cap', price: '$29.99' },
              ].map((item) => {
                const product = products && products.find((p) => p.name === item.name);
                const to = product ? `/product/${product.id}` : '/shop';
                return (
                  <Link key={item.name} to={to} className="no-underline text-inherit">
                    <div className="w-full h-56 sm:h-64 md:h-72 rounded-lg bg-[#555555] overflow-hidden flex flex-col justify-between p-3 sm:p-4 md:p-5 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex justify-end">
                        <span className="text-[#888888] text-xl sm:text-2xl">♡</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-black">
                          {item.name}
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-black mt-2">
                          {item.price}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[#000000]"></div>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[#D9D9D9]"></div>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[#888888] border border-[#555555]"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row">
        {/* Left side - Photo (with overlays) - responsive */}
        <div className="w-full md:w-1/2 lg:w-[600px] h-64 sm:h-80 md:h-full md:min-h-96 lg:min-h-[500px] relative overflow-hidden flex-shrink-0">
          <img 
            src="/philosophy-model.webp"
            alt="Philosophy Model"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{background: 'rgba(0,0,0,0.3)'}}></div>
          {/* Gradient blend to right */}
          <div className="absolute inset-0" style={{background: 'linear-gradient(to right, transparent 60%, #111111 100%)'}}></div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 bg-[#111111] px-6 pt-8 pb-0 sm:px-8 sm:pt-10 sm:pb-0 md:px-10 md:pt-12 md:pb-0 lg:px-20 lg:pt-16 lg:pb-0 flex flex-col justify-center">
          <p className="text-xs sm:text-sm font-bold text-[#888888] tracking-widest">OUR PHILOSOPHY</p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight w-full max-w-2xl mt-4 md:mt-6">DESIGNED FOR MOVEMENT. BUILT FOR IDENTITY.</h2>

          <p className="text-xs sm:text-sm md:text-base text-[#888888] w-full max-w-lg leading-relaxed mt-4 md:mt-6">UrbanWear is more than clothing. Its a mindset. Inspired by the streets. Crafted with purpose.</p>

          <button className="w-40 sm:w-48 h-10 sm:h-12 md:h-14 bg-white text-[#000000] text-xs sm:text-sm md:text-base font-bold mt-8 md:mt-10 hover:bg-gray-100 transition-colors rounded">LEARN MORE →</button>
        </div>
      </section>
    </>
  );
}
