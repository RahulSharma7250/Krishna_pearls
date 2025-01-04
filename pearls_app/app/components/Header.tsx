"use client"

import { useState, useEffect, useTransition } from 'react'
import { ShoppingCart, User, Package } from 'lucide-react'
import Link from 'next/link'
import AuthModal from './AuthModal'
import { handleLoginAction, handleRegisterAction, handleLoginStateChangeAction, handleCloseAction } from '@/app/actions/authActions'

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoginStateChange = async (loggedIn: boolean) => {
    await handleLoginStateChangeAction(loggedIn)
    setIsLoggedIn(loggedIn)
  }

  const handleLogin = async (email: string, password: string) => {
    await handleLoginAction(email, password)
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    setIsAuthModalOpen(false)
  }

  const handleRegister = async (name: string, email: string, password: string) => {
    await handleRegisterAction(name, email, password)
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  const handleClose = async () => {
    await handleCloseAction()
    setIsAuthModalOpen(false)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${isScrolled ? 'bg-white text-primary shadow-md' : 'bg-primary text-white'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="/images/pearl.png" alt="Krishana Pearls Logo" className="w-8 h-8" />
              <h1 className="text-xl font-bold">Krishana Pearls</h1>
            </div>
          </Link>
          <nav className="flex space-x-4">
            <Link href="/bulk-order" className={`hover:text-primary-light transition-colors duration-200 flex items-center ${isScrolled ? 'text-primary hover:text-primary-dark' : 'text-white'}`}>
              <Package className="w-5 h-5 mr-1" />
              Bulk Order
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`hover:text-primary-light transition-colors duration-200 flex items-center ${isScrolled ? 'text-primary hover:text-primary-dark' : 'text-white'}`}
              >
                <User className="w-5 h-5 mr-1" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={`hover:text-primary-light transition-colors duration-200 flex items-center ${isScrolled ? 'text-primary hover:text-primary-dark' : 'text-white'}`}
              >
                <User className="w-5 h-5 mr-1" />
                Login
              </button>
            )}
            <Link href="/cart" className={`hover:text-primary-light transition-colors duration-200 flex items-center ${isScrolled ? 'text-primary hover:text-primary-dark' : 'text-white'}`}>
              <ShoppingCart className="w-5 h-5 mr-1" />
              Cart
            </Link>
          </nav>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onCloseAction={handleClose}
        onLoginAction={handleLogin}
        onRegisterAction={handleRegister}
        onLoginStateChangeAction={handleLoginStateChange}
      />
    </>
  )
}

