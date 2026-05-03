import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    const cartRef = collection(db, 'users', user.uid, 'cart');
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((snapshotDoc) => ({
        id: snapshotDoc.id,
        ...snapshotDoc.data(),
      }));

      setCartItems(items);
    });

    return unsubscribe;
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return;

    const cartRef = collection(db, 'users', user.uid, 'cart');
    await addDoc(cartRef, product);
  };

  const removeFromCart = async (itemId) => {
    if (!user) return;

    await deleteDoc(doc(db, 'users', user.uid, 'cart', itemId));
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!user) return;

    await updateDoc(doc(db, 'users', user.uid, 'cart', itemId), { quantity });
  };

  const clearCart = async () => {
    if (!user) return;

    await Promise.all(cartItems.map((item) => removeFromCart(item.id)));
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : Number(item.price || 0);
    return total + price * (item.quantity || 1);
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
