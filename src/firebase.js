import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || 'AIzaSyBJTaV_dMkf8prbLet_Lwd49kpYql1nsHc',
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || 'urbanwear-1baa2.firebaseapp.com',
  projectId: import.meta.env.VITE_PROJECT_ID || 'urbanwear-1baa2',
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || 'urbanwear-1baa2.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || '856631725059',
  appId: import.meta.env.VITE_APP_ID || '1:856631725059:web:516c7282e6d01f4400d236',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

export default app