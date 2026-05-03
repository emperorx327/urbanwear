import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    zip: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    navigate('/');
  };

  return (
    <div className="w-full bg-white px-5 sm:px-8 md:px-10 lg:px-20 pt-8 sm:pt-10 md:pt-12 lg:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12 xl:gap-16 pb-12 md:pb-16 lg:pb-20">
          
          {/* Left Side - Form */}
          <section className="w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[32px] font-bold text-black mb-6 md:mb-8 lg:mb-8">
              CHECKOUT
            </h1>

            {/* Contact Information */}
            <div className="mb-8 md:mb-10 lg:mb-10">
              <h2 className="text-sm md:text-base lg:text-[16px] font-bold text-black mb-4 md:mb-5 lg:mb-4">
                Contact Information
              </h2>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111]"
              />
            </div>

            {/* Shipping Address */}
            <div className="mb-8 md:mb-10 lg:mb-10">
              <h2 className="text-sm md:text-base lg:text-[16px] font-bold text-black mb-4 md:mb-5 lg:mb-4">
                Shipping Address
              </h2>

              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-3 mb-3 md:mb-3 lg:mb-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111]"
                />
              </div>

              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={formData.street}
                onChange={handleInputChange}
                className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] mb-3 md:mb-3 lg:mb-3"
              />

              <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111]"
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111]"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111]"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8 md:mb-10 lg:mb-10">
              <h2 className="text-sm md:text-base lg:text-[16px] font-bold text-black mb-4 md:mb-5 lg:mb-4">
                Payment Information
              </h2>

              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] mb-3 md:mb-3 lg:mb-3"
              />

              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-3">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/DD/YY"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111]"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-full h-11 sm:h-12 md:h-12 lg:h-12 border border-[#DDDDDD] rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111]"
                />
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full h-12 sm:h-14 md:h-16 lg:h-14 rounded-[4px] bg-[#111111] text-xs sm:text-sm lg:text-[15px] font-bold text-white hover:bg-gray-900 transition-colors mt-8 md:mt-10 lg:mt-8"
            >
              PLACE ORDER
            </button>
          </section>

          {/* Right Side - Order Summary */}
          <aside className="w-full lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-[8px] bg-[#F5F5F5] p-5 sm:p-6 md:p-6 lg:p-6">
              <h2 className="text-sm md:text-base lg:text-[16px] font-bold text-black mb-4 md:mb-5 lg:mb-5">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 md:space-y-3 mb-4 md:mb-4">
                <div className="flex items-start justify-between text-xs sm:text-sm lg:text-[13px] text-black">
                  <div>
                    <p className="font-medium">Shadow Oversized Hoodie</p>
                    <p className="text-[#888888] text-xs">Qty: 1</p>
                  </div>
                  <span className="font-medium">$79.99</span>
                </div>

                <div className="flex items-start justify-between text-xs sm:text-sm lg:text-[13px] text-black">
                  <div>
                    <p className="font-medium">Essential Boxy Tee</p>
                    <p className="text-[#888888] text-xs">Qty: 2</p>
                  </div>
                  <span className="font-medium">$79.98</span>
                </div>

                <div className="flex items-start justify-between text-xs sm:text-sm lg:text-[13px] text-black">
                  <div>
                    <p className="font-medium">Urban Cargo Pants</p>
                    <p className="text-[#888888] text-xs">Qty: 1</p>
                  </div>
                  <span className="font-medium">$89.99</span>
                </div>
              </div>

              <div className="h-px w-full bg-[#E5E5E5] my-4" />

              <div className="space-y-2 md:space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm lg:text-[13px] text-black">
                  <span>Subtotal</span>
                  <span>$249.96</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm lg:text-[13px] text-black">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm lg:text-[13px] text-black">
                  <span>Tax</span>
                  <span>$19.99</span>
                </div>

                <div className="mt-4 h-px w-full bg-[#E5E5E5]" />

                <div className="flex items-center justify-between text-sm md:text-base lg:text-[16px] font-bold text-black mt-3">
                  <span>TOTAL</span>
                  <span>$269.95</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
