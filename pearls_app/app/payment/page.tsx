"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Calendar, Lock } from 'lucide-react'

export default function Payment() {
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem('currentOrder')
    const checkoutItems = localStorage.getItem('checkoutItems')
    
    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails))
    } else if (checkoutItems) {
      const items = JSON.parse(checkoutItems)
      const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
      setOrderDetails({ items, total })
    } else {
      router.push('/')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment
    alert('Payment processed successfully!')
    localStorage.removeItem('currentOrder')
    localStorage.removeItem('checkoutItems')
    localStorage.removeItem('cart')
    router.push('/')
  }

  if (!orderDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {orderDetails.product ? (
          <>
            <p><strong>Product:</strong> {orderDetails.product.name}</p>
            <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
            <p><strong>Total:</strong> ₹{orderDetails.product.price * orderDetails.quantity}</p>
          </>
        ) : (
          <>
            {orderDetails.items.map((item: any) => (
              <div key={item.id} className="mb-2">
                <p><strong>{item.name}</strong> x {item.quantity}</p>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}
            <p className="mt-4"><strong>Total:</strong> ₹{orderDetails.total}</p>
          </>
        )}
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="cardNumber"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="expiryDate"
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="MM/YY"
                required
              />
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="cvv"
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 text-lg font-semibold"
        >
          Pay ₹{orderDetails.product ? orderDetails.product.price * orderDetails.quantity : orderDetails.total}
        </button>
      </form>
    </div>
  )
}

