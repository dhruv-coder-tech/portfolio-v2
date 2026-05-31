import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
}

const words = ['Design', 'Create', 'Inspire']
const DURATION_MS = 2700

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  // Counter 0 → 100 over DURATION_MS using rAF
  useEffect(() => {
    const start = performance.now()
    let rafId: number

    const frame = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1)
      setCount(Math.floor(progress * 100))
      if (progress < 1) {
        rafId = requestAnimationFrame(frame)
      } else {
        setTimeout(onComplete, 400)
      }
    }

    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [onComplete])

  // Cycle words every 900ms
  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % words.length), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Top-left label */}
      <motion.p
        className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em] select-none"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Portfolio
      </motion.p>

      {/* Centered cycling word */}
      <div className="flex-1 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 select-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {words[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <p className="absolute bottom-12 right-8 text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums select-none leading-none">
        {String(count).padStart(3, '0')}
      </p>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <motion.div
          className="h-full accent-gradient origin-left"
          animate={{ scaleX: count / 100 }}
          transition={{ duration: 0, ease: 'linear' }}
          style={{ boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)' }}
        />
      </div>
    </motion.div>
  )
}
