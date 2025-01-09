import Link from 'next/link'

interface Product {
  id: number
  name: string
  origin: string
  price: number
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  console.log(product);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-primary-light">
      <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-primary">{product.name}</h3>
        <p className="text-gray-600 mb-2">Origin: {product.origin}</p>
        <p className="text-2xl font-bold text-primary">₹{product.price}</p>
        <Link href={`/product/${product._id}`} passHref>
          <button className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}
