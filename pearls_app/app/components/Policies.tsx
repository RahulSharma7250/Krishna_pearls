"use client"

import { motion } from 'framer-motion'
import { Truck, Lock, RefreshCcw } from 'lucide-react'

export default function Policies() {
  const policies = [
    {
      icon: <Truck className="text-primary w-8 h-8 mb-4" />,
      title: "Shipping Policy",
      description: "Orders are shipped within 5-7 business days. International delivery may vary."
    },
    {
      icon: <Lock className="text-primary w-8 h-8 mb-4" />,
      title: "Privacy Policy",
      description: "Your personal information is secure with us. We do not share or sell your data."
    },
    {
      icon: <RefreshCcw className="text-primary w-8 h-8 mb-4" />,
      title: "Return Policy",
      description: "We do not accept returns. All sales are final."
    }
  ]

  return (
    <section className="py-20 bg-primary-light text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Our Policies
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              {policy.icon}
              <h3 className="text-xl font-semibold mb-2 text-primary">{policy.title}</h3>
              <p className="text-gray-700">{policy.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

