import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-black">Please login to view your cart</h2>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-4 h-12 rounded-full bg-black px-6 text-sm font-bold text-white hover:bg-gray-900 transition-colors"
        >
          Login
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-black">Your cart is empty</h2>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="mt-4 h-12 rounded-full bg-black px-6 text-sm font-bold text-white hover:bg-gray-900 transition-colors"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 md:px-8 lg:px-20 py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <section className="w-full lg:w-[60%]">
            <h1 className="text-[26px] sm:text-[28px] md:text-[32px] font-bold text-black">YOUR CART ({cartCount})</h1>
            <div className="mt-4 h-px w-full bg-[#EEEEEE]" />

            <div className="mt-6 flex flex-col">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 py-5 sm:py-6">
                    <div className="w-full sm:w-[120px] h-[120px] rounded-[8px] bg-[#F5F5F5] flex-shrink-0 flex items-center justify-center">
                      <span className="text-[#BBBBBB] text-xs">Image</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-h-[120px]">
                      <div>
                        <h2 className="text-[15px] font-bold text-black">{item.name}</h2>
                        <p className="mt-1 text-[13px] text-[#888888]">
                          Size: {item.size} | Color: {item.color}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <p className="text-[15px] font-bold text-black">
                          ${((typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : Number(item.price || 0)) * (item.quantity || 1)).toFixed(2)}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => { updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1)); showToast('Quantity updated', 'info') }}
                              className="w-[30px] h-[30px] border border-[#DDDDDD] text-black text-sm flex items-center justify-center"
                            >
                              −
                            </button>
                            <div className="w-[30px] h-[30px] border-t border-b border-[#DDDDDD] text-[13px] flex items-center justify-center">
                              {item.quantity}
                            </div>
                            <button
                              type="button"
                              onClick={() => { updateQuantity(item.id, (item.quantity || 1) + 1); showToast('Quantity updated', 'info') }}
                              className="w-[30px] h-[30px] border border-[#DDDDDD] text-black text-sm flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => { removeFromCart(item.id); showToast('Item removed from cart', 'info') }}
                            className="text-[12px] text-[#888888] underline underline-offset-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < cartItems.length - 1 && <div className="h-px w-full bg-[#EEEEEE]" />}
                </div>
              ))}
            </div>
          </section>

          <aside className="w-full lg:w-[40%]">
            <div className="rounded-[8px] bg-[#F5F5F5] p-6 sm:p-6 md:p-6 lg:p-6">
              <h2 className="text-[16px] font-bold text-black">ORDER SUMMARY</h2>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-[13px] text-black">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-black">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-black">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="mt-4 h-px w-full bg-[#E5E5E5]" />

                <div className="flex items-center justify-between text-[16px] font-bold text-black">
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="mt-6 h-[52px] w-full rounded-[4px] bg-[#111111] text-[13px] font-bold text-white hover:bg-black transition-colors"
              >
                PROCEED TO CHECKOUT
              </button>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="h-[44px] flex-1 rounded-[4px] border border-[#DDDDDD] bg-white px-3 text-[13px] text-black outline-none placeholder:text-[#888888]"
                />
                <button className="h-[44px] w-full sm:w-[120px] rounded-[4px] border border-[#111111] text-[13px] font-bold text-[#111111] hover:bg-black hover:text-white transition-colors">
                  APPLY
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
