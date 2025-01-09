"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-light text-white">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              'radial-gradient(circle, #FF69B4 1px, transparent 1px)',
              'radial-gradient(circle, #FF69B4 1.5px, transparent 1.5px)',
              'radial-gradient(circle, #FF69B4 1px, transparent 1px)',
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="w-screen relative z-10 text-center  sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-primary"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-white">Moti Niketan</span>
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your trusted destination for exquisite pearls and pearl jewelry since 2022. Discover timeless elegance with our curated collection of high-quality pearls.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/products">
            <button className="bg-primary text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors duration-300 flex items-center">
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
          <Link href="#about">
            <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-300">
              Our Story
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Animated pearls */}
      <motion.div
        className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-white opacity-70"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 rounded-full bg-primary opacity-60"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}

