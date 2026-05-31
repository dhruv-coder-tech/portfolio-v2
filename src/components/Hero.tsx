import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

const roles = ['Builder', 'Creator', 'Developer', 'Founder']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  // Cycle roles every 2s
  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2000)
    return () => clearInterval(id)
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ ease: 'power3.out' })
    tl.fromTo(
      '.hero-name-reveal',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    )
    tl.fromTo(
      '.hero-blur-in',
      { opacity: 0, filter: 'blur(10px)', y: 20 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.12 },
      '-=0.8'
    )
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero content — background comes from the global Background component */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        {/* Eyebrow */}
        <p className="hero-blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 opacity-0">
          COLLECTION '26
        </p>

        {/* Name */}
        <h1 className="hero-name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-8 opacity-0">
          Dhruv Bhatia
        </h1>

        {/* Role line */}
        <p className="hero-blur-in text-sm md:text-base text-muted mb-4 opacity-0">
          A{' '}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary inline-block animate-role-fade-in"
          >
            {roles[roleIndex]}
          </span>{' '}
          building from India.
        </p>

        {/* Sub description */}
        <p className="hero-blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12 opacity-0">
          Designing seamless digital experiences by focusing on the unique nuances that bring systems to life.
        </p>

        {/* CTAs */}
        <div className="hero-blur-in inline-flex gap-4 flex-wrap justify-center opacity-0">
          <a
            href="#projects"
            onClick={e => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="relative group rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg hover:scale-105 transition-all duration-200"
          >
            See Works
          </a>
          <a
            href="mailto:dhruvbhatia4244@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg/60 text-text-primary hover:scale-105 hover:border-transparent transition-all duration-200"
          >
            Reach out...
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <p className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</p>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div className="absolute inset-0 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
