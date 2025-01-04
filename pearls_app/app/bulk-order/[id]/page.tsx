"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Truck } from 'lucide-react'
import AuthModal from "@/app/components/AuthModal"

const bulkProducts = [
  { id: 1, name: "Natural Fresh Water Pearls (Bulk)", origin: "India", price: 60, image: "/images/a1.jpg", minQuantity: 100, description: "High-quality freshwater pearls sourced directly from India. Perfect for creating exquisite jewelry pieces in bulk." },
  { id: 2, name: "Natural Fresh Water Pearls (Bulk)", origin: "Indonesia", price: 70, image: "/images/a2.jpg", minQuantity: 100, description: "Premium Indonesian freshwater pearls known for their lustrous sheen and consistent shape. Ideal for large-scale jewelry production." },
  { id: 3, name: "Natural Fresh Water Pearls (Bulk)", origin: "Indonesia", price: 65, image: "/images/a3.jpg", minQuantity: 100, description: "Elegant freshwater pearls from Indonesia with a unique color variation. Suitable for creating distinctive jewelry collections." },
]

export default function BulkProductDetail({ params }: { params: { id: string } }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(100)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    if (!loggedIn) {
      setIsAuthModalOpen(true)
    }

    const productId = parseInt(params.id)
    const foundProduct = bulkProducts.find(p => p.id === productId)
    setProduct(foundProduct)
  }, [params.id])

  const handleLogin = (email: string, password: string) => {
    console.log('Login:', email, password)
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    setIsAuthModalOpen(false)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register:', name, email, password)
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    setIsAuthModalOpen(false)
  }

  const handleLoginStateChange = (isLoggedIn: boolean) => {
    setIsLoggedIn(isLoggedIn)
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const orderDetails = { product, quantity }
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails))
    router.push('/payment')
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 md:flex">
          <div className="md:w-1/2">
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
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
  )
}

