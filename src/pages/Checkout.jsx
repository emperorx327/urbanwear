import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import PageTransition from '../components/PageTransition';

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
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
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';

    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.zip) errors.zip = 'ZIP code is required';
    else if (!/^\d+$/.test(formData.zip)) errors.zip = 'ZIP must be numeric';
    if (!formData.country) errors.country = 'Country is required';

    if (!formData.cardNumber) errors.cardNumber = 'Card number is required';
    else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      errors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.expiry) errors.expiry = 'Expiry date is required';
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) errors.expiry = 'Expiry must be MM/YY format';

    if (!formData.cvv) errors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = 'CVV must be 3-4 digits';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!user || cartItems.length === 0) return;
    if (!validateForm()) return;

    setLoading(true);

    try {
      const tax = cartTotal * 0.08;
      const total = cartTotal + tax;
      const timestamp = serverTimestamp();
      const ordersRef = collection(db, 'users', user.uid, 'orders');

      const orderPayload = {
        items: cartItems,
        subtotal: cartTotal,
        tax,
        total,
        status: 'Processing',
        date: timestamp,
        createdAt: timestamp,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          country: formData.country,
        },
      };

      await addDoc(ordersRef, orderPayload);
      await clearCart();
      showToast('Order placed successfully!', 'success')
      navigate('/order-confirmation', { state: { order: orderPayload } });
    } catch (err) {
      console.error(err);
      showToast('Failed to place order', 'error')
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartTotal;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <PageTransition>
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
                className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] ${formErrors.email ? 'border-red-500' : 'border-[#DDDDDD]'}`}
              />
              {formErrors.email ? <p className="mt-1 text-xs text-red-500">{formErrors.email}</p> : null}
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
                  className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] ${formErrors.firstName ? 'border-red-500' : 'border-[#DDDDDD]'}`}
                />
                {formErrors.firstName ? <p className="mt-1 text-xs text-red-500">{formErrors.firstName}</p> : null}
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] ${formErrors.lastName ? 'border-red-500' : 'border-[#DDDDDD]'}`}
                />
                {formErrors.lastName ? <p className="mt-1 text-xs text-red-500">{formErrors.lastName}</p> : null}
              </div>

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] mb-3 md:mb-3 lg:mb-3 ${formErrors.address ? 'border-red-500' : 'border-[#DDDDDD]'}`}
              />
              {formErrors.address ? <p className="-mt-2 mb-3 text-xs text-red-500">{formErrors.address}</p> : null}

              <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-3">
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] ${formErrors.city ? 'border-red-500' : 'border-[#DDDDDD]'}`}
                  />
                  {formErrors.city ? <p className="mt-1 text-xs text-red-500">{formErrors.city}</p> : null}
                </div>
                <div>
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] ${formErrors.zip ? 'border-red-500' : 'border-[#DDDDDD]'}`}
                  />
                  {formErrors.zip ? <p className="mt-1 text-xs text-red-500">{formErrors.zip}</p> : null}
                </div>
                <div>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] ${formErrors.country ? 'border-red-500' : 'border-[#DDDDDD]'}`}
                  />
                  {formErrors.country ? <p className="mt-1 text-xs text-red-500">{formErrors.country}</p> : null}
                </div>
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
                className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] mb-3 md:mb-3 lg:mb-3 ${formErrors.cardNumber ? 'border-red-500' : 'border-[#DDDDDD]'}`}
              />
              {formErrors.cardNumber ? <p className="-mt-2 mb-3 text-xs text-red-500">{formErrors.cardNumber}</p> : null}

              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-3">
                <div>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] ${formErrors.expiry ? 'border-red-500' : 'border-[#DDDDDD]'}`}
                  />
                  {formErrors.expiry ? <p className="mt-1 text-xs text-red-500">{formErrors.expiry}</p> : null}
                </div>
                <div>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={`w-full h-11 sm:h-12 md:h-12 lg:h-12 border rounded px-3 text-xs sm:text-sm lg:text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-[#111111] ${formErrors.cvv ? 'border-red-500' : 'border-[#DDDDDD]'}`}
                  />
                  {formErrors.cvv ? <p className="mt-1 text-xs text-red-500">{formErrors.cvv}</p> : null}
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <motion.button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading || !user || cartItems.length === 0}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full h-12 sm:h-14 md:h-16 lg:h-14 rounded-[4px] bg-[#111111] text-xs sm:text-sm lg:text-[15px] font-bold text-white hover:bg-gray-900 transition-colors mt-8 md:mt-10 lg:mt-8 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
            </motion.button>
          </section>

          {/* Right Side - Order Summary */}
          <aside className="w-full lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-[8px] bg-[#F5F5F5] p-5 sm:p-6 md:p-6 lg:p-6">
              <h2 className="text-sm md:text-base lg:text-[16px] font-bold text-black mb-4 md:mb-5 lg:mb-5">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 md:space-y-3 mb-4 md:mb-4">
                {cartItems.map((item) => {
                  const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : Number(item.price || 0);
                  const quantity = item.quantity || 1;
                  const itemTotal = price * quantity;

                  return (
                    <div key={item.id} className="flex items-start justify-between text-xs sm:text-sm lg:text-[13px] text-black gap-4">
                      <div>
                        <p className="font-medium break-words">{item.name}</p>
                        <p className="text-[#888888] text-xs">Qty: {quantity}</p>
                      </div>
                      <span className="font-medium whitespace-nowrap">${itemTotal.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="h-px w-full bg-[#E5E5E5] my-4" />

              <div className="space-y-2 md:space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm lg:text-[13px] text-black">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm lg:text-[13px] text-black">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm lg:text-[13px] text-black">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="mt-4 h-px w-full bg-[#E5E5E5]" />

                <div className="flex items-center justify-between text-sm md:text-base lg:text-[16px] font-bold text-black mt-3">
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
