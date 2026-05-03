import { useNavigate } from 'react-router-dom';

const cartItems = [
  {
    id: 1,
    name: 'Shadow Oversized Hoodie',
    size: 'M',
    color: 'Black',
    price: '$79.99',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Essential Boxy Tee',
    size: 'L',
    color: 'Gray',
    price: '$39.99',
    quantity: 2,
  },
  {
    id: 3,
    name: 'Urban Cargo Pants',
    size: 'S',
    color: 'Black',
    price: '$89.99',
    quantity: 1,
  },
];

export default function Cart() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 md:px-8 lg:px-20 py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <section className="w-full lg:w-[60%]">
            <h1 className="text-[26px] sm:text-[28px] md:text-[32px] font-bold text-black">YOUR CART (3)</h1>
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
                        <p className="text-[15px] font-bold text-black">{item.price}</p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center">
                            <button className="w-[30px] h-[30px] border border-[#DDDDDD] text-black text-sm flex items-center justify-center">
                              −
                            </button>
                            <div className="w-[30px] h-[30px] border-t border-b border-[#DDDDDD] text-[13px] flex items-center justify-center">
                              {item.quantity}
                            </div>
                            <button className="w-[30px] h-[30px] border border-[#DDDDDD] text-black text-sm flex items-center justify-center">
                              +
                            </button>
                          </div>

                          <button className="text-[12px] text-[#888888] underline underline-offset-2">
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
                  <span>$209.97</span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-black">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-black">
                  <span>Tax</span>
                  <span>$16.80</span>
                </div>

                <div className="mt-4 h-px w-full bg-[#E5E5E5]" />

                <div className="flex items-center justify-between text-[16px] font-bold text-black">
                  <span>TOTAL</span>
                  <span>$226.77</span>
                </div>
              </div>

              <button
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
