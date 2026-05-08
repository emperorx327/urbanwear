import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useToast } from '../context/ToastContext';
import PageTransition from '../components/PageTransition';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      showToast('Logged in with Google successfully!', 'success')
      navigate('/')
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast('Welcome back! Logged in successfully', 'success')
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
      showToast('Invalid email or password', 'error')
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="relative w-full h-48 sm:h-64 md:h-auto md:w-1/2 lg:w-[600px] md:min-h-screen flex-shrink-0 overflow-hidden bg-gradient-to-b from-black to-[#1a0000]">
        <img
          src="/preview.webp"
          alt="Login background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="flex flex-1 items-start md:items-center justify-center bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-0 md:min-h-screen">
        <div className="w-full max-w-sm md:max-w-xs">
          <Link to="/" className="mb-12 sm:mb-16 md:mb-20 text-base sm:text-lg md:text-xl font-bold text-black inline-block hover:opacity-80">
            URBANWEAR
          </Link>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#888888]">
              Sign in to your account
            </p>
          </div>

          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-black">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 sm:h-12 w-full border border-black bg-transparent px-3 text-sm text-black outline-none placeholder:text-[#AAAAAA] focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••••••••••••••••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 sm:h-12 w-full border border-black bg-transparent px-3 pr-12 text-sm text-black outline-none placeholder:text-[#AAAAAA] focus:border-black"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:opacity-70 transition-opacity"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.81-1.92 2.14-3.65 3.82-5.06" />
                        <path d="M1 1l22 22" />
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M14.12 14.12A3 3 0 0 0 9.88 9.88" />
                      </>
                    ) : (
                      <>
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-6 mt-4 sm:mt-6 flex justify-end">
              <a href="#" className="text-xs sm:text-sm text-[#404040] hover:underline">
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-12 sm:h-14 w-full rounded-full bg-black text-sm sm:text-base font-bold text-white hover:bg-gray-900 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'LOGIN'}
            </motion.button>

            <div className="flex items-center gap-4 w-[340px] my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center">
              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-[340px] h-[50px] border border-gray-300 rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 transition"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">Continue with Google</span>
              </motion.button>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>

          <p className="text-xs sm:text-sm text-[#404040]">
            Dont have an account?{' '}
            <Link to="/signup" className="font-bold underline hover:opacity-70">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
