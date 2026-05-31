import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SelectedWorks from './components/SelectedWorks'
import Journal from './components/Journal'
import Explorations from './components/Explorations'
import Stats from './components/Stats'
import Footer from './components/Footer'
import Background from './components/Background'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="overflow-x-hidden">
      <Background />
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <SelectedWorks />
            <Journal />
            <Explorations />
            <Stats />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
