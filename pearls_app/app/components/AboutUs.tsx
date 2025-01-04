"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white text-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Moti Niketan</h2>
          <p className="text-xl text-gray-600">Crafting elegance since 2022</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-700 mb-6">
              At Moti Niketan, we believe pearls are more than just gems; they are a symbol of grace, purity, and timeless elegance. Our mission has been to provide the finest quality pearls, combining traditional craftsmanship with modern designs.
            </p>
            <p className="text-gray-700 mb-6">
              Every pearl we select is carefully sourced to meet the highest standards of luster, color, and quality. From classic strands to contemporary designs, we cater to every style and occasion.
            </p>
            <Link href="/about">
              <button className="bg-primary text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors duration-300 flex items-center">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img
                src="/images/pearl-jewelry.jpg"
                alt="Pearl jewelry"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-light rounded-full opacity-50 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

