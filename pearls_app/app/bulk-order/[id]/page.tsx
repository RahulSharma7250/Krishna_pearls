"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Truck } from "lucide-react";
import AuthModal from "@/app/components/AuthModal";

export default function BulkProductDetail({ params }: { params: { id: string } }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(100);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/bulkProducts/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError("Could not load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleLogin = (email: string, password: string) => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLoginStateChange = (isLoggedIn: boolean) => {
    setIsLoggedIn(isLoggedIn);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderDetails = { product, quantity };
    localStorage.setItem("currentOrder", JSON.stringify(orderDetails));
    router.push("/payment");
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 md:flex">
          <div className="md:w-1/2">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-2">Origin: {product.origin}</p>
            <p className="text-2xl font-bold text-gray-800 mb-4">₹{product.price}/unit</p>
            <p className="text-gray-700 mb-4">Minimum Quantity: {product.minQuantity}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            {!showOrderForm ? (
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 text-lg font-semibold flex items-center justify-center"
              >
                <ShoppingBag className="mr-2" />
                Place Bulk Order
              </button>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity (Minimum {product.minQuantity})
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min={product.minQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 text-lg font-semibold flex items-center justify-center"
                >
                  <Truck className="mr-2" />
                  Confirm Bulk Order
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-4">Please log in to view bulk product details.</p>
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
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLoginStateChange={handleLoginStateChange}
      />
    </div>
  );
}
