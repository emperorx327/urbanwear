import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full min-h-[500px] bg-[#0D0D0D] px-6 py-12 md:px-10 md:py-14 lg:px-[80px] lg:py-[60px]">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <h2 className="text-[20px] font-bold text-white">URBANWEAR</h2>
          <p className="mt-3 max-w-[200px] text-[12px] text-[#888888]">
            Minimal luxury streetwear crafted for the new generation.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-white">
              <svg className="h-[35px] w-[35px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.88 1.62a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-white">
              <svg className="h-[35px] w-[35px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 22v-8h2.75l.5-3h-3.25V9.25c0-.92.42-1.75 1.75-1.75H17V4.78A18.91 18.91 0 0 0 14.7 4C12.4 4 10.75 5.4 10.75 8v3H8v3h2.75v8h2.75Z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="text-white">
              <svg className="h-[35px] w-[35px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 3H22l-6.77 7.74L23 21h-6.1l-4.77-6.24L6.67 21H3.55l7.25-8.29L1 3h6.26l4.3 5.68L18.9 3Zm-1.07 16.19h1.69L6.34 4.73H4.52l13.31 14.46Z" />
              </svg>
            </a>
            <a href="#" aria-label="Youtube" className="text-white">
              <svg className="h-[35px] w-[35px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.01s0-3.27-.42-4.85a2.55 2.55 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.78.36a2.55 2.55 0 0 0-1.8 1.8C2 8.74 2 12 2 12s0 3.27.42 4.85a2.55 2.55 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.78-.36a2.55 2.55 0 0 0 1.8-1.8c.42-1.58.42-4.83.42-4.83ZM10 15.5v-7l6 3.5-6 3.5Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[13px] font-bold text-white">SHOP</h3>
          <ul className="mt-3 space-y-3">
            {['All Products', 'Hoodies', 'T-Shirts', 'Pants', 'Accessories'].map((item) => (
              <li key={item}>
                <Link to="/shop" className="text-[12px] text-[#888888]">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold text-white">COMPANY</h3>
          <ul className="mt-3 space-y-3">
            {['About Us', 'Careers', 'Sustainability', 'Blog', 'Contact'].map((item) => (
              <li key={item}>
                <a href="#" className="text-[12px] text-[#888888]">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold text-white">NEWSLETTER</h3>
          <p className="mt-3 text-[12px] text-[#888888]">
            Join our newsletter and get 10% off your first order.
          </p>
          <div className="mt-4 flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-[40px] w-[200px] border border-[#555555] bg-transparent px-2 text-[12px] text-white placeholder:text-[#888888] outline-none"
            />
            <button
              type="button"
              className="h-[40px] w-[40px] bg-white text-[16px] text-black"
              aria-label="Submit email"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-[#333333] pt-5 text-[11px] text-[#666666] md:flex-row md:items-center md:justify-between">
        <p>© 2024 UrbanWear. All Rights Reserved.</p>
        <p>Privacy Policy · Terms of Service · Accessibility</p>
      </div>
    </footer>
  );
}
