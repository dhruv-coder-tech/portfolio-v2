import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Full-screen fixed background:
 *  Layer 1 (bottom) — scroll-scrubbed astronaut video
 *  Layer 2          — dark overlay so content stays readable
 *  Layer 3          — animated gradient mesh orbs
 *  Layer 4 (top)    — noise grain texture
 */
export default function Background() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const setupScrub = () => {
      if (!video.duration) return

      const st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 5,
        onUpdate: (self) => {
          video.currentTime = self.progress * video.duration * 0.88
        },
      })

      return () => st.kill()
    }

    let cleanup: (() => void) | undefined

    if (video.readyState >= 1) {
      cleanup = setupScrub()
    } else {
      const onReady = () => { cleanup = setupScrub() }
      video.addEventListener('loadedmetadata', onReady, { once: true })
      return () => video.removeEventListener('loadedmetadata', onReady)
    }

    return () => cleanup?.()
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" aria-hidden>

      {/* ── Layer 1: Astronaut video (scroll-scrubbed) ── */}
      <video
        ref={videoRef}
        src="/scroll-video-scrub.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute w-full h-full object-cover"
        style={{ objectPosition: 'center 70%', filter: 'brightness(1)', opacity: 0.75 }}
      />

      {/* ── Layer 2: Dark veil ── */}
      <div className="absolute inset-0" style={{ background: 'rgba(10, 10, 14, 0.35)' }} />

      {/* ── Top cover: fade from top so navbar area stays clean ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[20vh]"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--bg)) 0%, transparent 100%)' }}
      />

      {/* ── Bottom fade: dissolves into footer instead of cutting out ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40vh]"
        style={{ background: 'linear-gradient(to top, hsl(var(--bg)) 0%, transparent 100%)' }}
      />

      {/* ── Layer 3: Gradient mesh orbs ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: '60vw', height: '60vw',
          top: '-20vw', left: '-15vw',
          background: 'radial-gradient(circle, #89AACC 0%, transparent 70%)',
          opacity: 0.12, filter: 'blur(80px)',
          animation: 'orb1 28s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '50vw', height: '50vw',
          top: '-10vw', right: '-15vw',
          background: 'radial-gradient(circle, #4E85BF 0%, transparent 70%)',
          opacity: 0.10, filter: 'blur(90px)',
          animation: 'orb2 34s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '40vw', height: '40vw',
          top: '35vh', left: '30vw',
          background: 'radial-gradient(circle, #5b6ee1 0%, transparent 70%)',
          opacity: 0.07, filter: 'blur(100px)',
          animation: 'orb3 40s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '55vw', height: '55vw',
          bottom: '-20vw', left: '-10vw',
          background: 'radial-gradient(circle, #4E85BF 0%, transparent 70%)',
          opacity: 0.09, filter: 'blur(85px)',
          animation: 'orb4 32s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '45vw', height: '45vw',
          bottom: '-15vw', right: '-10vw',
          background: 'radial-gradient(circle, #89AACC 0%, transparent 70%)',
          opacity: 0.08, filter: 'blur(95px)',
          animation: 'orb5 38s ease-in-out infinite alternate',
        }}
      />

      {/* ── Layer 4: Film grain ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.03,
          mixBlendMode: 'overlay',
        }}
      />

      <style>{`
        @keyframes orb1 {
          0%   { transform: translate(0,    0)    scale(1);    }
          50%  { transform: translate(8vw,  6vh)  scale(1.12); }
          100% { transform: translate(3vw,  12vh) scale(0.95); }
        }
        @keyframes orb2 {
          0%   { transform: translate(0,    0)   scale(1);    }
          50%  { transform: translate(-6vw, 8vh) scale(1.08); }
          100% { transform: translate(-2vw, 3vh) scale(1.15); }
        }
        @keyframes orb3 {
          0%   { transform: translate(0,    0)    scale(1);   }
          50%  { transform: translate(5vw,  -8vh) scale(1.2); }
          100% { transform: translate(-4vw, 5vh)  scale(0.9); }
        }
        @keyframes orb4 {
          0%   { transform: translate(0,   0)     scale(1);    }
          50%  { transform: translate(7vw, -5vh)  scale(1.1);  }
          100% { transform: translate(2vw, -10vh) scale(0.95); }
        }
        @keyframes orb5 {
          0%   { transform: translate(0,    0)    scale(1);    }
          50%  { transform: translate(-8vw, -4vh) scale(1.15); }
          100% { transform: translate(-3vw, -8vh) scale(1.05); }
        }
      `}</style>
    </div>
  )
}
