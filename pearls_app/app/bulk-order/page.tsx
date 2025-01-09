"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthModal from "../components/AuthModal";
import {
  handleLoginAction,
  handleRegisterAction,
  handleLoginStateChangeAction,
  handleCloseAction,
} from "@/app/actions/authActions";

export default function BulkOrder() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [bulkProducts, setBulkProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check token and fetch products on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.setItem('isLoggedIn', 'true')
      setIsLoggedIn(true);
    }

    const fetchBulkProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/bulkProducts");
        if (!response.ok) {
          throw new Error("Failed to fetch bulk products");
        }
        const data = await response.json();
        setBulkProducts(data);
      } catch (err) {
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBulkProducts();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    await handleLoginAction(email, password);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    await handleRegisterAction(name, email, password);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLoginStateChange = async (loggedIn: boolean) => {
    await handleLoginStateChangeAction(loggedIn);
    setIsLoggedIn(loggedIn);
  };

  const handleClose = async () => {
    await handleCloseAction();
    setIsAuthModalOpen(false);
  };

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bulk Order Products</h1>
      {isLoggedIn ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bulkProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
              <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">Origin: {product.origin}</p>
              <p className="text-2xl font-bold text-gray-800 mb-2">₹{product.price}/carat</p>
              <p className="text-gray-700 mb-4">Minimum Quantity: {product.minQuantity}</p>
              <Link href={`/bulk-order/${product._id}`}>
                <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-4">Please log in to view bulk order products.</p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            Log In / Register
          </button>
        </div>
      )}
      <AuthModal
        isOpen={isAuthModalOpen}
        onCloseAction={handleClose}
        onLoginAction={handleLogin}
        onRegisterAction={handleRegister}
        onLoginStateChangeAction={handleLoginStateChange}
      />
    </div>
  );
}
