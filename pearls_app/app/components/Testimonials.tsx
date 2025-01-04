"use client"

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      text: "Absolutely love my moti pearl necklace from Moti Niketan. The quality is amazing, and the service was exceptional!",
      image: "/images/testimonial-1.jpg"
    },
    {
      name: "Rahul Mehta",
      text: "The perfect place for customized pearl jewelry. I got exactly what I wanted!",
      image: "/images/testimonial-2.jpg"
    },
    {
      name: "Sneha Patil",
      text: "Moti Niketan made my wedding day extra special with their stunning bridal collection.",
      image: "/images/testimonial-3.jpg"
    }
  ]

  return (
    <section className="py-20 bg-gray-100 text-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-center italic">"{testimonial.text}"</p>
              <p className="font-semibold">- {testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

