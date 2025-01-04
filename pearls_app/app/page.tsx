import HeroSection from './components/HeroSection'
import AboutUs from './components/AboutUs'
import Policies from './components/Policies'
import Testimonials from './components/Testimonials'
import ProductGrid from './components/ProductGrid'

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <AboutUs />
      <div className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          Our Exclusive Collection
        </h2>
        <ProductGrid />
      </div>
      <Policies />
      <Testimonials />
    </div>
  )
}

