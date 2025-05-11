import Footer from "../components/Footer";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section with Image and Gradient Background */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-600 via-blue-300-to-blue-100 rounded-xl shadow-xl relative overflow-hidden">
        
        {/* Left Content (Text Section) */}
        <div className="text-center sm:text-left max-w-lg mb-12 sm:mb-0 z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
           Travel Smarter Together
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-xl mx-auto sm:mx-0">
            Share rides with friends or make new ones. Whether you are a driver or a passenger, RidePool is here to make your travel affordable and eco-friendly.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
            <a
              href="/auth/user/login"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Find a Ride
            </a>
            <a
              href="/auth/driver/login"
              className="border border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Offer a Ride
            </a>
          </div>
        </div>

        {/* Right Image with Overlay */}
        <div className="w-full sm:w-1/2 relative">
          <img
            src="../media/illus-removebg-preview.png" // Replace with your own image
            alt="Ride sharing illustration"
            className="w-full h-full object-cover rounded-xl shadow-md opacity-80 hover:opacity-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-sm">Browse and book rides with just a few clicks.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Verified Drivers</h3>
            <p className="text-gray-600 text-sm">Travel safely with trusted, verified ride providers.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Save Money</h3>
            <p className="text-gray-600 text-sm">Split costs and make your travel more affordable.</p>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
