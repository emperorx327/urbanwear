import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const product = {
    name: 'Shadow Oversized Hoodie',
    price: '$79.99',
    rating: 4.2,
    reviews: 128,
    image: '',
    colors: [
      { name: 'Black', value: '#111111' },
      { name: 'Gray', value: '#555555' },
      { name: 'White', value: '#EEEEEE' },
    ],
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      navigate('/cart');
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [navigate, success]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      setError('Please select a size');
      return;
    }

    setError('');

    await addToCart({
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.image,
      productId: id,
    });

    setSuccess(true);
  };

  return (
    <div className="w-full bg-white px-5 sm:px-8 md:px-10 lg:px-20 pt-8 sm:pt-10 md:pt-12 lg:pt-16">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 pb-12 sm:pb-16 md:pb-20">
        
        {/* Left Side - Images */}
        <div className="w-full lg:w-auto flex-shrink-0">
          {/* Main Image */}
          <div className="w-full lg:w-[600px] h-64 sm:h-96 md:h-[500px] lg:h-[700px] bg-[#F5F5F5] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-[#BBBBBB] text-sm sm:text-base">Product Image</span>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 sm:gap-4 md:gap-8 lg:gap-[55px] mt-3 sm:mt-4 md:mt-5 lg:mt-4">
            {[1, 2, 3].map((thumb) => (
              <div
                key={thumb}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px] bg-[#EEEEEE] rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-300 transition"
              >
                <span className="text-[#BBBBBB] text-xs">Thumb {thumb}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full flex flex-col">
          {/* Breadcrumb */}
          <div className="text-xs sm:text-sm text-[#888888] mb-3 sm:mb-4 md:mb-5 lg:mb-4">
            <RouterLink to="/" className="hover:underline">Home</RouterLink> &gt; <RouterLink to="/shop" className="hover:underline">Shop</RouterLink> &gt; <span>Hoodies</span>
          </div>

          {/* Product Name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[32px] font-bold text-black mb-2 md:mb-3 lg:mb-2">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-black mb-2 md:mb-3 lg:mb-2">
            {product.price}
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-2 sm:gap-2 md:gap-3 lg:gap-2 mb-5 sm:mb-6 md:mb-8 lg:mb-6">
            <div className="flex text-xs sm:text-sm md:text-base lg:text-[13px] text-[#F5A623] gap-0.5">
              ★★★★☆
            </div>
            <span className="text-xs sm:text-sm lg:text-[13px] text-[#888888]">
              ({product.rating}) · {product.reviews} reviews
            </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#EEEEEE] mb-5 sm:mb-6 md:mb-8 lg:mb-6"></div>

          {/* Color Selector */}
          <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-6">
            <label className="text-xs sm:text-sm lg:text-[13px] font-medium text-black block mb-2 md:mb-3 lg:mb-2">
              Color: {selectedColor}
            </label>
            <div className="flex gap-2 md:gap-3 lg:gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-7 lg:h-7 rounded-full border-2 transition ${
                    selectedColor === color.name ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Color ${color.name}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-6">
            <label className="text-xs sm:text-sm lg:text-[13px] font-medium text-black block mb-2 md:mb-3 lg:mb-2">
              Size:
            </label>
            <div className="flex gap-1.5 md:gap-2 lg:gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-12 lg:h-12 border text-xs sm:text-sm font-medium transition ${
                    selectedSize === size
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-white border-[#DDDDDD] text-black hover:border-[#111111]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-6">
            <label className="text-xs sm:text-sm lg:text-[13px] font-medium text-black block mb-2 md:mb-3 lg:mb-2">
              Quantity:
            </label>
            <div className="flex border border-[#DDDDDD] w-fit">
              <button
                type="button"
                onClick={decrementQuantity}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-10 lg:h-10 flex items-center justify-center text-lg font-light hover:bg-gray-100 transition"
              >
                −
              </button>
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-10 lg:h-10 flex items-center justify-center border-l border-r border-[#DDDDDD] text-sm sm:text-base">
                {quantity}
              </div>
              <button
                type="button"
                onClick={incrementQuantity}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-10 lg:h-10 flex items-center justify-center text-lg font-light hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* ADD TO CART Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full md:w-96 h-12 sm:h-14 md:h-16 lg:h-14 bg-[#111111] text-white text-sm sm:text-base lg:text-[15px] font-bold rounded hover:bg-gray-900 transition mt-5 sm:mt-6 md:mt-8 lg:mt-6"
          >
            ADD TO CART
          </button>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          {success ? <p className="mt-3 text-sm text-green-600">Added to cart!</p> : null}

          {/* ADD TO WISHLIST Button */}
          <button className="w-full md:w-96 h-12 sm:h-14 md:h-16 lg:h-14 border border-[#111111] text-[#111111] text-sm sm:text-base lg:text-[15px] font-bold rounded hover:bg-gray-100 transition mt-2 sm:mt-3 md:mt-4 lg:mt-3">
            ADD TO WISHLIST
          </button>

          {/* Description Text */}
          <p className="text-xs sm:text-sm lg:text-[13px] text-[#666666] max-w-sm mt-3 sm:mt-4 md:mt-6 lg:mt-4 leading-relaxed">
            This oversized hoodie combines comfort and style. Made from premium cotton blend fabric. Perfect for casual wear or layering.
          </p>

          {/* Shipping Info */}
          <div className="flex flex-col gap-2 mt-3 sm:mt-4 md:mt-6 lg:mt-4">
            <div className="text-xs sm:text-sm lg:text-[12px] text-[#666666] flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="text-xs sm:text-sm lg:text-[12px] text-[#666666] flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Free returns within 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
