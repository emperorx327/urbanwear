import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;
  const items = order?.items || [];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center rounded-[24px] bg-[#F7F7F7] px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-black/5 text-4xl sm:h-24 sm:w-24 sm:text-5xl">
          🎉
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">Order Placed Successfully!</h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#666666]">
          Your order has been received and is now being processed. You can review the details below or head to your profile to track all your orders.
        </p>

        <div className="mt-8 w-full rounded-[20px] bg-white p-5 sm:p-6 md:p-8 text-left shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-black">Order Details</h2>
          <div className="mt-4 grid gap-3 text-sm text-black sm:grid-cols-2">
            <div>
              <p className="text-[#888888]">Status</p>
              <p className="font-medium">{order?.status || 'Processing'}</p>
            </div>
            <div>
              <p className="text-[#888888]">Total</p>
              <p className="font-medium">{order?.total ? `$${Number(order.total).toFixed(2)}` : '$0.00'}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[#888888]">Shipping Address</p>
              <p className="font-medium">
                {order?.shippingAddress
                  ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}, ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.zip}, ${order.shippingAddress.country}`
                  : 'Unavailable'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[#888888] text-sm">Items</p>
            <div className="mt-3 space-y-3">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 border-b border-[#EEEEEE] pb-3 text-sm text-black last:border-b-0 last:pb-0">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-[#888888]">Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="whitespace-nowrap font-medium">{item.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#666666]">No item details available for this order.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="h-12 rounded-full bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-gray-900 sm:w-auto"
          >
            Continue Shopping
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="h-12 rounded-full border border-black bg-white px-6 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white sm:w-auto"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}