import { Facebook, Twitter, Instagram, CreditCard } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-light text-white py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p>Email: info@krishanapearls.com</p>
          <p>Phone: +123456789</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary transition-colors duration-200">
              <Facebook />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              <Twitter />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              <Instagram />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">We Accept</h3>
          <div className="flex space-x-4">
            <CreditCard />
            <span>All major credit cards</span>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 Krishana Pearls. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

