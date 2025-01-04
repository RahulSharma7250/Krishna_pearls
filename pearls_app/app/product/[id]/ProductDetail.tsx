"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

const products = [
  { id: 1, name: "Natural Fresh Water Pearls", origin: "India", price: 80, image: "/images/a1.jpg", description: "Exquisite freshwater pearls with a lustrous sheen, perfect for elegant jewelry designs." },
  { id: 2, name: "Natural Fresh Water Pearls", origin: "Indonesia", price: 90, image: "/images/a2.jpg", description: "Stunning Indonesian pearls known for their unique colors and exceptional quality." },
  { id: 3, name: "Natural Fresh Water Pearls", origin: "Indonesia", price: 80, image: "/images/a3.jpg", description: "Rare freshwater pearls with a mesmerizing glow, ideal for statement pieces." },
  { id: 4, name: "Natural Fresh Water Pearls", origin: "India", price: 80, image: "/images/a4.jpg", description: "Classic Indian pearls with a timeless appeal, perfect for both traditional and modern jewelry." },
  { id: 5, name: "Natural Fresh Water Pearls", origin: "India", price: 90, image: "/images/a5.jpg", description: "Premium quality pearls with excellent luster and a smooth surface." },
  { id: 6, name: "Natural Fresh Water Pearls", origin: "Indonesia", price: 100, image: "/images/a6.jpg", description: "Exotic Indonesian pearls with unique shapes and colors, ideal for avant-garde designs." },
]

interface Product {
  id: number
  name: string
  origin: string
  price: number
  image: string
  description: string
  quantity?: number
}

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const productId = parseInt(id)
    if (!isNaN(productId)) {
      const foundProduct = products.find(p => p.id === productId)
      setProduct(foundProduct || null)
    } else {
      setProduct(null)
    }
  }, [id])

  const addToCart = () => {
    if (!product) return

    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[]
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + quantity
    } else {
      cart.push({ ...product, quantity })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    router.push('/cart')
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto pt-16">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 md:flex">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
        </div>
        <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4 text-primary">{product.name}</h1>
          <p className="text-gray-600 mb-2">Origin: {product.origin}</p>
          <p className="text-2xl font-bold text-primary mb-4">₹{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="bg-white text-black border border-gray-300 px-2 py-1 rounded-md w-16"
            />
          </div>
          <button
            onClick={addToCart}
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors duration-300 text-lg font-semibold flex items-center justify-center"
          >
            <ShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

