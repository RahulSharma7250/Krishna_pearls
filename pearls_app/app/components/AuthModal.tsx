"use client"

import { useState, useTransition } from 'react'
import { X } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onCloseAction: () => Promise<void>
  onLoginAction: (email: string, password: string) => Promise<void>
  onRegisterAction: (name: string, email: string, password: string) => Promise<void>
  onLoginStateChangeAction: (isLoggedIn: boolean) => Promise<void>
}

export default function AuthModal({ isOpen, onCloseAction, onLoginAction, onRegisterAction, onLoginStateChangeAction }: AuthModalProps) {
  const [isLoginView, setIsLoginView] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (isLoginView) {
        await onLoginAction(email, password)
      } else {
        await onRegisterAction(name, email, password)
      }
      await onLoginStateChangeAction(true)
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            {isLoginView ? 'Login' : 'Register'}
          </h2>
          <button onClick={() => startTransition(() => onCloseAction())} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-light transition-colors duration-300"
          >
            {isLoginView ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="ml-2 text-black hover:underline"
          >
            {isLoginView ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

