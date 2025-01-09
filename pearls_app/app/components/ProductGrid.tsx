"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"

// Define the Product type
interface Product {
  id: number
  name: string
  origin: string
  price: number
  image: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedOrigin, setSelectedOrigin] = useState("all") // State for filter
  const [loading, setLoading] = useState(true) // State for loading

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/") // Replace with your API endpoint
        const data = await response.json()
        // console.log("Fetched Products:", data); // Log the fetched data
        setProducts(data) // Update state with fetched products
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false) // Set loading to false
      }
    }

    fetchProducts()
  }, []) // Run once on component mount

  // Filter products based on origin
  const filteredProducts = selectedOrigin === "all"
    ? products
    : products.filter(product => product.origin === selectedOrigin)

  // Render loading state
  if (loading) {
    return <div className="text-center">Loading products...</div>
  }

  return (
    <div className="container mx-auto px-4">
      {/* Dropdown for filtering */}
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
