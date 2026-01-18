"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Product Interface
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function LandingPage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ব্যাকএন্ড থেকে লেটেস্ট ৪টি পণ্য নিয়ে আসা
    fetch('https://my-market-app-server.vercel.app/api/items')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data.slice(0, 4)); // প্রথম ৪টি পণ্য দেখাবে
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching landing page data:", err);
        setLoading(false);
      });
  }, []);

  // Newsletter সেকশনের সাবমিট হ্যান্ডলার
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailInput = (e.target as any).email.value;
    
    try {
      const res = await fetch('https://my-market-app-server.vercel.app/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput }),
      });

      if (res.ok) {
        toast.success("Thank you for subscribing!");
        (e.target as any).reset();
      } else {
        const error = await res.json();
        toast.error(error.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error("Server error, try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in">
            Premium Quality <br /> Modern Lifestyle
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Explore our curated collection of high-end electronics, fashion, and home essentials.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/items" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              Shop Now
            </Link>
            <Link href="/login" className="border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Feature Highlights */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-blue-600 text-4xl mb-4">🚀</div>
            <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
            <p className="text-gray-500">Free shipping on all orders over $100.</p>
          </div>
          <div>
            <div className="text-blue-600 text-4xl mb-4">🛡️</div>
            <h3 className="font-bold text-xl mb-2">Secure Payments</h3>
            <p className="text-gray-500">100% secure payment processing for your safety.</p>
          </div>
          <div>
            <div className="text-blue-600 text-4xl mb-4">🔄</div>
            <h3 className="font-bold text-xl mb-2">Easy Returns</h3>
            <p className="text-gray-500">30-day money back guarantee for any reason.</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Products (Dynamic from MongoDB) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Arrivals</h2>
            <div className="h-1 w-20 bg-blue-600 mt-2"></div>
          </div>
          <Link href="/items" className="text-blue-600 font-semibold hover:underline">
            View All Products →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product._id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 h-64 mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link href={`/items/${product._id}`} className="bg-white text-black px-4 py-2 rounded-lg font-bold shadow-md">
                      View Details
                    </Link>
                  </div>
                </div>
                <h4 className="font-bold text-lg text-gray-800 truncate">{product.name}</h4>
                <p className="text-blue-600 font-bold text-xl">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Promotional Banner */}
      <section className="mx-6 mb-20">
        <div className="max-w-7xl mx-auto bg-gray-900 rounded-3xl p-12 text-white flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">Special Offer!</h2>
            <p className="text-gray-400 text-lg">Use code <span className="text-white font-mono font-bold">NEXT20</span> for 20% discount on electronics.</p>
          </div>
          <button className="bg-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition">
            Claim Discount
          </button>
        </div>
      </section>

      {/* 5. Newsletter Section */}
      <section className="bg-gray-50 py-20 px-6 border-t">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Subscribe to get notifications about new products and special deals.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input 
              name="email"
              type="email" 
              required
              placeholder="Enter your email" 
              className="flex-1 p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}