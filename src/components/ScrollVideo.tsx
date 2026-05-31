import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// Text overlays that fade in/out at different scroll progress points
const overlays = [
  { progress: 0.15, text: 'Builder.' },
  { progress: 0.45, text: 'Creator.' },
  { progress: 0.75, text: 'Developer.' },
]

export default function ScrollVideo() {
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef(0)
  const rafRef      = useRef<number>(0)

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let ctx: ReturnType<typeof gsap.context> | undefined

    const setupScrub = () => {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            progressRef.current = self.progress

            // Scrub video time
            if (video.duration) {
              video.currentTime = self.progress * video.duration
            }

            // Drive overlay opacity based on proximity to their progress point
            overlayRefs.current.forEach((el, i) => {
              if (!el) return
              const target = overlays[i].progress
              const dist   = Math.abs(self.progress - target)
              // Visible when within 0.10 of the target progress
              const opacity = Math.max(0, 1 - dist / 0.10)
              el.style.opacity = String(opacity)
            })
          },
        })
      })
    }

    if (video.readyState >= 1) {
      setupScrub()
    } else {
      video.addEventListener('loadedmetadata', setupScrub, { once: true })
    }

    return () => {
      ctx?.revert()
      video.removeEventListener('loadedmetadata', setupScrub)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative" style={{ height: '500vh' }}>
      {/* Sticky viewport — pinned while user scrolls through the 500vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg">

        {/* The video — fills the frame, scrubs on scroll */}
        <video
          ref={videoRef}
          src="/scroll-video.mp4"
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark veil so text pops */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Top fade from bg */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bg to-transparent pointer-events-none" />

        {/* Bottom fade into bg */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

        {/* Section label */}
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-8 h-px bg-white/20" />
          <span className="text-xs text-white/40 uppercase tracking-[0.3em]">Scroll to explore</span>
          <div className="w-8 h-px bg-white/20" />
        </motion.div>

        {/* Scroll progress bar — thin line at bottom */}
        <ProgressBar sectionRef={sectionRef} />

        {/* Cycling text overlays */}
        {overlays.map((o, i) => (
          <div
            key={o.text}
            ref={el => { overlayRefs.current[i] = el }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0, transition: 'opacity 0.1s linear' }}
          >
            <p className="text-5xl md:text-7xl lg:text-9xl font-display italic text-white/90 tracking-tight select-none drop-shadow-2xl">
              {o.text}
            </p>
          </div>
        ))}

        {/* Scroll indicator — fades out as you scroll */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
          <p className="text-xs text-white/30 uppercase tracking-[0.2em]">SCROLL</p>
          <div className="w-px h-8 bg-white/20 overflow-hidden relative">
            <div className="absolute inset-0 accent-gradient animate-scroll-down" />
          </div>
        </div>
      </div>
    </section>
  )
}

// Thin accent-gradient progress bar that tracks scroll through the section
function ProgressBar({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bar     = barRef.current
    if (!section || !bar) return

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [sectionRef])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
      <div
        ref={barRef}
        className="h-full accent-gradient origin-left"
        style={{ scaleX: 0, boxShadow: '0 0 6px rgba(137,170,204,0.5)' }}
      />
    </div>
  )
}
