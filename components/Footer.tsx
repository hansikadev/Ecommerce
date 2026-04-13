export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-gray-900 mb-4 block">
              Luxe<span className="text-indigo-600">Cart</span>
            </span>
            <p className="text-gray-500 max-w-xs mt-4">
              Providing premium quality products directly to your doorstep. Fast shipping, secure payments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition">New Arrivals</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition">Best Sellers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition">Categories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition">Returns & Exchanges</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} LuxeCart Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
