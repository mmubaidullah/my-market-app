import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'; // Toast import

// এই লাইনগুলো খুব গুরুত্বপূর্ণ:
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextMarket - Professional Marketplace",
  description: "Built with Next.js 15 and Express.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar /> 
        
        {children}
        
        <Toaster position="top-right" /> 
        
        <Footer />
      </body>
    </html>
  );
}