import { useEffect, useState } from 'react'

const navLinks = ['Home', 'Work']

/** SVG filter that creates the liquid-glass distortion effect */
const GlassFilter = () => (
  <svg style={{ display: 'none', position: 'absolute' }} aria-hidden>
    <defs>
      <filter
        id="navbar-glass"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65 0.75"
          numOctaves="1"
          seed="2"
          result="noise"
        />
        <feComponentTransfer in="noise" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="noise" stdDeviation="2" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="4"
          specularConstant="1.2"
          specularExponent="80"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-100" y="-100" z="200" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="8"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (link: string) => {
    setActive(link)
    if (link === 'Work') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    } else if (link === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <GlassFilter />
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
        <div
          className="pointer-events-auto relative inline-flex items-center rounded-full px-2 py-2 transition-all duration-700"
          style={{
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)'
              : '0 4px 16px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1)',
            transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 2.2)',
          }}
        >
          {/* Layer 1 — backdrop blur + glass distortion */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            style={{
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              filter: 'url(#navbar-glass)',
            }}
          />

          {/* Layer 2 — subtle white tint */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.10)' }}
          />

          {/* Layer 3 — edge highlight (inner rim) */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow:
                'inset 1.5px 1.5px 1px rgba(255,255,255,0.45), inset -1px -1px 1px rgba(255,255,255,0.20)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center">
            {/* Logo */}
            <button
              className="w-9 h-9 flex items-center justify-center hover:scale-110 transition-all duration-200"
              onClick={() => handleNav('Home')}
              aria-label="Home"
            >
              <span className="font-display italic text-[13px] text-white leading-none drop-shadow-sm">DB</span>
            </button>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-white/20 mx-1" />

            {/* Nav links */}
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 ${
                  active === link
                    ? 'text-white bg-white/20 shadow-inner'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link}
              </button>
            ))}

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-white/20 mx-1" />

            {/* Say hi */}
            <a
              href="mailto:dhruvbhatia4244@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all duration-200 hover:scale-105"
              style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 2.2)' }}
            >
              Say hi ↗
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
