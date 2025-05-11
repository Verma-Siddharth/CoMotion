export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">

        {/* Brand & Description */}
        <div>
          <h2 className="text-3xl font-bold mb-4">RidePool</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            RidePool helps you share rides and save money<br/> while reducing traffic and emissions.<br/>
            Connect with riders and drivers near you.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline text-blue-100">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:underline text-blue-100">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline text-blue-100">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline text-blue-100">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-sm text-blue-100 mb-2">
            Email: <a href="mailto:support@ridepool.com" className="underline">support@ridepool.com</a>
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Twitter */}
            <a href="#" aria-label="Twitter" className="w-9 h-9 bg-blue-600 hover:bg-white hover:text-blue-700 text-white rounded-full flex items-center justify-center transition">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37c-.83.49-1.75.85-2.73 1.04a4.27 4.27 0 00-7.3 3.9A12.1 12.1 0 013 4.8a4.27 4.27 0 001.32 5.7c-.7-.02-1.37-.21-1.95-.52v.05a4.27 4.27 0 003.42 4.2 4.3 4.3 0 01-1.93.07 4.27 4.27 0 003.98 2.96A8.56 8.56 0 012 19.53 12.1 12.1 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.35 8.35 0 0024 6.57a8.48 8.48 0 01-2.54.7z" /></svg>
            </a>

            {/* GitHub */}
            <a href="#" aria-label="GitHub" className="w-9 h-9 bg-blue-600 hover:bg-white hover:text-blue-700 text-white rounded-full flex items-center justify-center transition">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.87 8.16 6.84 9.49.5.09.68-.22.68-.49v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.7-.1-.25-.45-1.28.1-2.66 0 0 .85-.27 2.8 1.03A9.73 9.73 0 0112 6.8c.86.01 1.74.12 2.55.34 1.95-1.3 2.8-1.03 2.8-1.03.55 1.38.2 2.41.1 2.66.64.71 1.03 1.61 1.03 2.7 0 3.85-2.34 4.7-4.57 4.95.36.3.68.91.68 1.83v2.71c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.5-4.46-9.96-9.96-9.96z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-500 mt-10 pt-6 text-center text-sm text-blue-200">
        © {new Date().getFullYear()} RidePool. All rights reserved.
      </div>
    </footer>
  );
}
