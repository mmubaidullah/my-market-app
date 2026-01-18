"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, category: '', image: '' });

  useEffect(() => {
    fetch(`https://my-market-app-server.vercel.app/api/items/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`https://my-market-app-server.vercel.app/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Product updated!");
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 max-w-2xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6">Update Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4 bg-white p-8 rounded-2xl border shadow-sm">
        <input value={formData.name} className="w-full p-4 border rounded-xl" onChange={e => setFormData({...formData, name: e.target.value})} />
        <select value={formData.category} className="w-full p-4 border rounded-xl" onChange={e => setFormData({...formData, category: e.target.value})}>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home">Home</option>
        </select>
        <input type="number" value={formData.price} className="w-full p-4 border rounded-xl" onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
        <textarea value={formData.description} className="w-full p-4 border rounded-xl h-32" onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        <input value={formData.image} className="w-full p-4 border rounded-xl" onChange={e => setFormData({...formData, image: e.target.value})} />
        <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold">Save Changes</button>
      </form>
    </div>
  );
}