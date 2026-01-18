"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddItem() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', category: 'Electronics' });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image!");

    setUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      // ১. ছবি আপলোড করা
      const data = new FormData();
      data.append("image", file);

      const uploadRes = await fetch('https://my-market-app-server.vercel.app/api/upload', {
        method: 'POST',
        body: data,
      });
      const uploadData = await uploadRes.json();

      // ২. প্রোডাক্ট ডাটা সেভ করা
      const productRes = await fetch('https://my-market-app-server.vercel.app/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: uploadData.url }),
      });

      if (productRes.ok) {
        toast.success("Product added successfully!", { id: toastId });
        (e.target as any).reset();
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 max-w-2xl mx-auto text-black">
      <h1 className="text-3xl font-black mb-8">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-3xl border shadow-sm">
        <input required placeholder="Product Name" className="w-full p-4 border rounded-xl" onChange={e => setFormData({...formData, name: e.target.value})} />
        
        <div className="flex gap-4">
          <input required type="number" placeholder="Price" className="flex-1 p-4 border rounded-xl" onChange={e => setFormData({...formData, price: e.target.value})} />
          <select className="p-4 border rounded-xl" onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <textarea required placeholder="Description" className="w-full p-4 border rounded-xl h-32" onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        
        <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center">
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
          <p className="text-xs text-gray-400 mt-2">Max size 2MB (JPG, PNG)</p>
        </div>

        <button disabled={uploading} type="submit" className={`w-full py-4 rounded-xl font-bold text-white transition ${uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {uploading ? "Uploading..." : "Publish Product"}
        </button>
      </form>
    </div>
  );
}