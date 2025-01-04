"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0)
    
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    localStorage.setItem('checkoutItems', JSON.stringify(cartItems))
    router.push('/payment')
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-2xl mb-4">Your cart is empty</p>
          <Link href="/">
            <button className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg p-4 mb-4 flex items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Origin: {item.origin}</p>
                <p className="text-gray-800 font-bold">₹{item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 text-black px-2 py-1 rounded-md mr-2"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 text-black px-2 py-1 rounded-md ml-2"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 text-red-500 hover:text-red-600"
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <div className="mt-8 bg-white rounded-lg overflow-hidden shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-gray-800">₹{totalPrice}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 text-lg font-semibold flex items-center justify-center"
            >
              <ShoppingBag className="mr-2" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

