import Footer from "../components/Footer";
export default function HomePage() {
  return (
  <main className="min-h-screen bg-white text-gray-800 font-sans">
    {/* Hero Section */}
    <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 rounded-3xl shadow-2xl relative overflow-hidden">
      
      {/* Left Content */}
      <div className="text-center sm:text-left max-w-xl mb-20 sm:mb-0 z-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
          Travel Smarter Together
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed">
          Share rides with friends or make new ones. Whether you are a driver or a passenger, RidePool is here to make your travel affordable and eco-friendly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-5">
          <a
            href="/auth/user/login"
            className="bg-white text-blue-700 hover:bg-blue-100 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            Find a Ride
          </a>
          <a
            href="/auth/driver/login"
            className="border border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            Offer a Ride
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full sm:w-1/2 relative z-10">
        <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
          <img
            src="https://img.freepik.com/free-vector/carpool-concept-illustration_114360-9238.jpg?semt=ais_hybrid&w=740"
            alt="Ride sharing illustration"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-10 rounded-2xl pointer-events-none"></div>
      </div>

      {/* Subtle background circles */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
    </section>

    {/* Features Section */}
    <section className="py-24 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto grid gap-16 md:grid-cols-3 text-center">
        {[
          {
            title: "Easy Booking",
            text: "Browse and book rides with just a few clicks.",
            icon: "🚗",
          },
          {
            title: "Verified Drivers",
            text: "Travel safely with trusted, verified ride providers.",
            icon: "🛡️",
          },
          {
            title: "Save Money",
            text: "Split costs and make your travel more affordable.",
            icon: "💸",
          },
        ].map(({ title, text, icon }, idx) => (
          <div
            key={idx}
            className="p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-600"
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-2xl font-bold text-blue-700 mb-3">{title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>

    <Footer />
  </main>
);


}
