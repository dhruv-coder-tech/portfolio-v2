import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Hls from 'hls.js'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const MARQUEE_TEXT = 'BUILDING THE FUTURE • '
const socials = [
  { label: 'GitHub', href: 'https://github.com/dhruv-coder-tech' },
]

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  // HLS video (flipped)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let hls: Hls | null = null

    if (Hls.isSupported()) {
      hls = new Hls({ startLevel: -1 })
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }

    return () => hls?.destroy()
  }, [])

  // GSAP infinite marquee
  useEffect(() => {
    if (!marqueeRef.current) return
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })
    return () => { tween.kill() }
  }, [])

  return (
    <footer className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden border-t border-stroke">
      {/* Flipped background video */}
      <div className="absolute inset-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
          style={{ transform: 'translate(-50%, -50%) scaleY(-1)', opacity: 0.18 }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Marquee */}
        <div className="overflow-hidden mb-14 -mx-6 md:-mx-10 lg:-mx-16 select-none">
          <div ref={marqueeRef} className="whitespace-nowrap inline-flex">
            {Array.from({ length: 20 }, (_, i) => (
              <span key={i} className="text-3xl md:text-5xl font-display italic text-stroke mr-6 leading-none">
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA email */}
        <div className="text-center mb-14">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Let's work together</p>
          <a
            href="mailto:dhruvbhatia4244@gmail.com"
            className="relative group inline-flex"
          >
            <span
              className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient"
              style={{ inset: '-2px' }}
            />
            <span className="relative z-10 block text-2xl md:text-4xl font-display italic text-text-primary bg-bg rounded-full px-8 py-5 border border-stroke group-hover:border-transparent transition-colors duration-300">
              dhruvbhatia4244@gmail.com ↗
            </span>
          </a>
        </div>

        {/* Footer bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stroke pt-6">
          <p className="text-xs text-muted order-last sm:order-first">
            © 2026 Dhruv Bhatia
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted">Available for projects</span>
          </div>

          <div className="flex items-center gap-5">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
