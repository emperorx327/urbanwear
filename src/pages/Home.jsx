import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import SkeletonCard from '../components/SkeletonCard';
import PageTransition from '../components/PageTransition';

const MotionLink = motion(Link);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const { products, loading } = useProducts();

  const mapCategoryToTag = (cat) => {
    const key = cat.toLowerCase();
    if (key.includes('hoodie')) return 'Hoodies';
    if (key.includes('tee')) return 'Tees';
    if (key.includes('sneaker')) return 'Sneakers';
    if (key.includes('accessor')) return 'Accessories';
    return 'All';
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <motion.section
        className="relative w-full min-h-96 sm:min-h-[640px] md:h-[720px] bg-[#111111] overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-bg.jpg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />

        <motion.p
          className="absolute left-4 top-12 sm:left-6 md:left-10 lg:left-[80px] md:top-20 lg:top-[180px] text-[#888888] text-[10px] md:text-[12px] font-bold tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          NEW COLLECTION
        </motion.p>

        <motion.h1
          className="absolute left-4 top-20 sm:left-6 md:left-10 lg:left-[80px] md:top-24 lg:top-[220px] w-[85vw] max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl text-white text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          OWN THE STREET
        </motion.h1>

        <motion.p
          className="absolute left-4 top-40 sm:left-6 md:left-10 lg:left-[80px] md:top-64 lg:top-[400px] w-[80vw] max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Minimal luxury essentials for everyday dominance.
        </motion.p>

        <motion.div
          className="absolute left-4 top-56 sm:left-6 md:left-10 lg:left-[80px] md:top-80 lg:top-[480px] flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MotionLink
            to="/shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="inline-flex w-52 sm:w-60 md:w-64 h-12 sm:h-14 md:h-16 items-center justify-center bg-white text-[#111111] text-sm sm:text-base md:text-lg font-bold rounded-lg transition-all hover:bg-gray-100"
          >
            SHOP NOW →
          </MotionLink>

          <MotionLink
            to="/shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="inline-flex w-52 sm:w-60 md:w-64 h-12 sm:h-14 md:h-16 items-center justify-center border-2 border-white bg-transparent text-white text-sm sm:text-base md:text-lg font-bold rounded-lg transition-all hover:bg-white/10"
          >
            NEW DROP
          </MotionLink>
        </motion.div>

        {/* optional slide indicators could go here */}
      </motion.section>

      {/* Explore Our Collections Section */}
      <section className="w-full bg-white py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold text-black mb-2">SHOP BY CATEGORY</p>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-black">EXPLORE OUR COLLECTIONS</h2>
            <Link to="/shop" className="text-sm font-bold text-black whitespace-nowrap">VIEW ALL →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {/* Hoodies */}
            <Link to="/shop?category=Hoodies" className="relative w-full h-[380px] rounded-2xl overflow-hidden cursor-pointer group block">
              <img src="/Rectangle 12.png" alt="Hoodies" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-lg font-bold">HOODIES</h3>
                <p className="text-white text-xs font-bold underline mt-2">SHOP NOW</p>
              </div>
            </Link>

            {/* Oversized Tees */}
            <Link to="/shop?category=Tees" className="relative w-full h-[380px] rounded-2xl overflow-hidden cursor-pointer group block">
              <img src="/Rectangle 13.png" alt="Oversized Tees" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-lg font-bold">OVERSIZED TEES</h3>
                <p className="text-white text-xs font-bold underline mt-2">SHOP NOW</p>
              </div>
            </Link>

            {/* Sneakers */}
            <Link to="/shop?category=Sneakers" className="relative w-full h-[380px] rounded-2xl overflow-hidden cursor-pointer group block">
              <img src="/Rectangle 14.png" alt="Sneakers" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-lg font-bold">SNEAKERS</h3>
                <p className="text-white text-xs font-bold underline mt-2">SHOP NOW</p>
              </div>
            </Link>

            {/* Accessories */}
            <Link to="/shop?category=Accessories" className="relative w-full h-[380px] rounded-2xl overflow-hidden cursor-pointer group block">
              <img src="/Rectangle 15.png" alt="Accessories" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-lg font-bold">ACCESSORIES</h3>
                <p className="text-white text-xs font-bold underline mt-2">SHOP NOW</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending / Most Loved Pieces */}
      <motion.section
        className="relative w-full bg-[#FFFFFF] overflow-hidden py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex flex-col gap-2">
              <p className="text-xs sm:text-sm font-bold text-black">TRENDING NOW</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black">MOST LOVED PIECES</h2>
            </div>

            <Link to="/shop" className="text-xs sm:text-sm font-bold text-black whitespace-nowrap hover:underline">VIEW ALL →</Link>
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
                    <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.2 }} className="w-full h-56 sm:h-64 md:h-72 rounded-lg bg-[#555555] overflow-hidden flex flex-col justify-between p-3 sm:p-4 md:p-5 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex justify-end">
                        <span className="text-[#888888] text-xl sm:text-2xl">♡</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-black">{item.name}</p>
                        <p className="text-xs sm:text-sm font-bold text-black mt-2">{item.price}</p>
                        <div className="mt-3 flex gap-2">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[#000000]"></div>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[#D9D9D9]"></div>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[#888888] border border-[#555555]"></div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Philosophy / Right Content Section */}
      <motion.section className="w-full flex flex-col md:flex-row" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="w-full md:w-1/2 lg:w-[600px] h-64 sm:h-80 md:h-full md:min-h-96 lg:min-h-[500px] relative overflow-hidden flex-shrink-0">
          <img src="/philosophy-model.webp" alt="Philosophy Model" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }}></div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #111111 100%)' }}></div>
        </div>

        <div className="flex-1 bg-[#111111] px-6 pt-8 pb-0 sm:px-8 sm:pt-10 sm:pb-0 md:px-10 md:pt-12 md:pb-0 lg:px-20 lg:pt-16 lg:pb-0 flex flex-col justify-center">
          <p className="text-xs sm:text-sm font-bold text-[#888888] tracking-widest">OUR PHILOSOPHY</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight w-full max-w-2xl mt-4 md:mt-6">DESIGNED FOR MOVEMENT. BUILT FOR IDENTITY.</h2>
          <p className="text-xs sm:text-sm md:text-base text-[#888888] w-full max-w-lg leading-relaxed mt-4 md:mt-6">UrbanWear is more than clothing. Its a mindset. Inspired by the streets. Crafted with purpose.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }} className="w-40 sm:w-48 h-10 sm:h-12 md:h-14 bg-white text-[#000000] text-xs sm:text-sm md:text-base font-bold mt-8 md:mt-10 hover:bg-gray-100 transition-colors rounded">LEARN MORE →</motion.button>
        </div>
      </motion.section>
    </PageTransition>
  );
}
