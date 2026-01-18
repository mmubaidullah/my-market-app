import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-white text-2xl font-black mb-6">NextMarket</h3>
          <p className="text-sm leading-relaxed">Experience the best shopping with our dynamic, high-performance marketplace platform.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Shop</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/items" className="hover:text-blue-400">All Products</Link></li>
            <li><Link href="/cart" className="hover:text-blue-400">Shopping Cart</Link></li>
            <li><Link href="/user-dashboard" className="hover:text-blue-400">Order Tracking</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/admin" className="hover:text-blue-400">Seller Center</Link></li>
            <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-400 cursor-pointer">Terms of Service</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
          <p className="text-sm mb-2">Email: support@nextmarket.com</p>
          <p className="text-sm">Phone: +880 123 456 789</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-16 pt-8 text-center text-xs text-gray-500">
        © 2026 NextMarket Inc. All rights reserved.
      </div>
    </footer>
  );
}