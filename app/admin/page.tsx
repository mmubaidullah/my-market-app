"use client";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://my-market-app-server.vercel.app/api/items');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const loadingToast = toast.loading("Deleting product...");
      try {
        const res = await fetch(`https://my-market-app-server.vercel.app/api/items/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success("Product deleted successfully!", { id: loadingToast });
          fetchProducts();
        } else {
          throw new Error();
        }
      } catch (err) {
        toast.error("Error deleting product", { id: loadingToast });
      }
    }
  };

  if (loading) return <div className="pt-32 text-center text-black font-bold">Loading Seller Center...</div>;

  return (
    <div className="min-h-screen pt-24 pb-10 px-6 max-w-6xl mx-auto text-black">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-black text-gray-900">Seller Dashboard</h1>
        <Link href="/add-item" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
          + Add New Product
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-5 font-bold text-gray-700 uppercase text-xs">Product</th>
              <th className="p-5 font-bold text-gray-700 uppercase text-xs">Price</th>
              <th className="p-5 font-bold text-gray-700 uppercase text-xs text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map((item) => (
              <tr key={item._id} className="border-b hover:bg-blue-50/30 transition">
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border shadow-sm" />
                    <span className="font-semibold text-gray-800">{item.name}</span>
                  </div>
                </td>
                <td className="p-5 font-bold text-blue-600">${item.price}</td>
                <td className="p-5">
                  <div className="flex justify-center gap-4">
                    <Link 
                      href={`/admin/edit/${item._id}`} 
                      className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg font-bold hover:bg-amber-200 transition"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(item._id)} 
                      className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-400">No products found in inventory.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}