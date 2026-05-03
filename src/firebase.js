import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBJTaV_dMkf8prbLet_Lwd49kpYql1nsHc",
  authDomain: "urbanwear-1baa2.firebaseapp.com",
  projectId: "urbanwear-1baa2",
  storageBucket: "urbanwear-1baa2.firebasestorage.app",
  messagingSenderId: "856631725059",
  appId: "1:856631725059:web:516c7282e6d01f4400d236"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app