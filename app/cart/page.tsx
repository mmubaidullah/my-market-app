"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item: any) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  const totalPrice = cart.reduce((acc: number, item: any) => acc + item.price, 0);

  return (
    <div className="min-h-screen pt-24 pb-10 px-6 max-w-5xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.length})</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 mb-6">Your cart is empty!</p>
          <Link href="/items" className="bg-blue-600 text-white px-6 py-3 rounded-xl">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item: any) => (
              <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:underline">Remove</button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl h-fit border">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => toast.success("Checkout feature coming soon!")}
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}