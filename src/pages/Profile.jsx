import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

function formatOrderDate(order) {
  const orderDate = order.date || order.createdAt;

  if (!orderDate?.toDate) {
    return 'Just now';
  }

  return orderDate.toDate().toLocaleString();
}

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const ordersRef = collection(db, 'users', user.uid, 'orders');
    const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(
        snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }))
      );
    });

    return unsubscribe;
  }, [user]);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-10 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="rounded-[24px] bg-[#111111] px-5 py-6 sm:px-8 sm:py-8 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold">Profile</h1>
          <p className="mt-2 text-sm sm:text-base text-white/70 break-words">
            {user?.displayName || 'UrbanWear Customer'}
          </p>
          <p className="mt-1 text-sm sm:text-base text-white/70 break-words">{user?.email}</p>
        </header>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-black">Order History</h2>
            <span className="text-sm text-[#888888]">{orders.length} order{orders.length === 1 ? '' : 's'}</span>
          </div>

          <div className="mt-5 space-y-4">
            {orders.length === 0 ? (
              <div className="rounded-[20px] border border-dashed border-[#DDDDDD] bg-[#FAFAFA] px-5 py-12 text-center">
                <p className="text-lg font-semibold text-black">No orders yet</p>
                <p className="mt-2 text-sm text-[#666666]">Your completed purchases will appear here.</p>
              </div>
            ) : (
              orders.map((order) => (
                <article key={order.id} className="rounded-[20px] border border-[#EAEAEA] bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm text-[#888888]">Order date</p>
                      <p className="font-medium text-black">{formatOrderDate(order)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#888888]">Status</p>
                      <p className="font-medium text-black">{order.status || 'Processing'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#888888]">Total</p>
                      <p className="font-medium text-black">${Number(order.total || 0).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm text-[#888888]">Items</p>
                    <div className="mt-2 flex flex-col gap-2">
                      {(order.items || []).map((item) => (
                        <div key={item.id} className="flex flex-col gap-1 rounded-[12px] bg-[#F7F7F7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-medium text-black">{item.name}</p>
                            <p className="text-xs text-[#888888]">Qty: {item.quantity || 1}</p>
                          </div>
                          <p className="text-sm font-medium text-black">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}