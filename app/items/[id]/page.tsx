"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);
  const [reviewForm, setReviewForm] = useState({ user: '', rating: 5, comment: '' });

  const fetchItem = () => {
    fetch(`https://my-market-app-server.vercel.app/api/items/${id}`)
      .then(res => res.json())
      .then(data => setItem(data));
  };

  useEffect(() => { fetchItem(); }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`https://my-market-app-server.vercel.app/api/items/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewForm),
    });
    if (res.ok) {
      toast.success("Review submitted!");
      setReviewForm({ user: '', rating: 5, comment: '' });
      fetchItem(); // রিভিউ রিফ্রেশ হবে
    }
  };

  if (!item) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-6xl mx-auto text-black bg-white">
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <img src={item.image} className="w-full rounded-3xl shadow-lg" alt={item.name} />
        <div>
          <h1 className="text-4xl font-black mb-4">{item.name}</h1>
          <p className="text-2xl text-blue-600 font-bold mb-6">${item.price}</p>
          <p className="text-gray-600 mb-8">{item.description}</p>
          <button className="w-full bg-black text-white py-4 rounded-xl font-bold">Add to Cart</button>
        </div>
      </div>

      {/* Review Section */}
      <div className="border-t pt-12">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews ({item.reviews?.length || 0})</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Review List */}
          <div className="space-y-6">
            {item.reviews?.map((rev: any, i: number) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{rev.user}</span>
                  <span className="text-yellow-500">{"⭐".repeat(rev.rating)}</span>
                </div>
                <p className="text-gray-600">{rev.comment}</p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleReviewSubmit} className="bg-white border p-8 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xl font-bold">Leave a Review</h3>
            <input required placeholder="Your Name" className="w-full p-4 border rounded-xl" 
              value={reviewForm.user} onChange={e => setReviewForm({...reviewForm, user: e.target.value})} />
            <select className="w-full p-4 border rounded-xl" 
              value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: Number(e.target.value)})}>
              <option value="5">5 Stars (Excellent)</option>
              <option value="4">4 Stars (Good)</option>
              <option value="3">3 Stars (Average)</option>
              <option value="2">2 Stars (Poor)</option>
              <option value="1">1 Star (Very Bad)</option>
            </select>
            <textarea required placeholder="Write your comment..." className="w-full p-4 border rounded-xl h-24"
              value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
}