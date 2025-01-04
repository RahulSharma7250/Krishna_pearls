"use client"

import { useState } from 'react'
import ProductCard from './ProductCard'

const products = [
  { id: 1, name: "Natural Fresh Water Pearls", origin: "India", price: 80, image: "/images/a1.jpg" },
  { id: 2, name: "Natural Fresh Water Pearls", origin: "Indonesia", price: 90, image: "/images/a2.jpg" },
  { id: 3, name: "Natural Fresh Water Pearls", origin: "Indonesia", price: 80, image: "/images/a3.jpg" },
  { id: 4, name: "Natural Fresh Water Pearls", origin: "India", price: 80, image: "/images/a4.jpg" },
  { id: 5, name: "Natural Fresh Water Pearls", origin: "India", price: 90, image: "/images/a5.jpg" },
  { id: 6, name: "Natural Fresh Water Pearls", origin: "Indonesia", price: 100, image: "/images/a6.jpg" },
]

export default function ProductGrid() {
  const [selectedOrigin, setSelectedOrigin] = useState("all")

  const filteredProducts = selectedOrigin === "all"
    ? products
    : products.filter(product => product.origin === selectedOrigin)

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex justify-center">
        <select
          value={selectedOrigin}
          onChange={(e) => setSelectedOrigin(e.target.value)}
          className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="all">All Origins</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

