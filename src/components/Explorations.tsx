import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Card data ───────────────────────────────────────────────── */

const col1 = [
  {
    label: 'Minimal UI',
    sub: 'Clean design systems',
    rotate: -3,
    accent: '#89AACC',
    visual: (
      <div className="w-full px-6 flex flex-col gap-2.5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-white/60" />
          <div className="h-1.5 w-24 rounded-full bg-white/25" />
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/20" />
        <div className="h-1.5 w-4/5 rounded-full bg-white/12" />
        <div className="h-1.5 w-3/5 rounded-full bg-white/08" />
        <div className="mt-2 h-9 w-full rounded-xl bg-white/15 flex items-center justify-between px-3">
          <div className="h-1.5 w-1/3 rounded-full bg-white/40" />
          <div className="w-5 h-5 rounded-full bg-white/30" />
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-7 rounded-lg bg-white/08 border border-white/10" />
          <div className="flex-1 h-7 rounded-lg bg-white/08 border border-white/10" />
        </div>
      </div>
    ),
  },
  {
    label: 'Dark Mode',
    sub: 'Light & dark systems',
    rotate: 2,
    accent: '#4E85BF',
    visual: (
      <div className="w-full px-5 flex gap-2.5">
        {/* Light panel */}
        <div className="flex-1 rounded-xl bg-white/85 flex flex-col gap-1.5 p-2.5">
          <div className="h-1.5 w-3/4 rounded-full bg-black/25" />
          <div className="h-1.5 w-1/2 rounded-full bg-black/12" />
          <div className="h-1.5 w-2/3 rounded-full bg-black/18" />
          <div className="mt-1 h-6 rounded-lg bg-black/10 flex items-center justify-center">
            <div className="h-1 w-1/2 rounded-full bg-black/20" />
          </div>
        </div>
        {/* Dark panel */}
        <div className="flex-1 rounded-xl bg-black/50 border border-white/10 flex flex-col gap-1.5 p-2.5">
          <div className="h-1.5 w-3/4 rounded-full bg-white/25" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/12" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/18" />
          <div className="mt-1 h-6 rounded-lg bg-white/10 flex items-center justify-center">
            <div className="h-1 w-1/2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Typography',
    sub: 'Type as visual language',
    rotate: -2,
    accent: '#89AACC',
    visual: (
      <div className="text-center px-4 w-full">
        <p className="text-6xl font-display italic text-white/90 leading-none tracking-tight">Aa</p>
        <div className="mt-3 flex flex-col gap-1 items-start px-2">
          <span className="text-[10px] font-light text-white/30 tracking-widest uppercase">Light 300</span>
          <span className="text-[10px] font-normal text-white/50 tracking-widest uppercase">Regular 400</span>
          <span className="text-[10px] font-medium text-white/70 tracking-widest uppercase">Medium 500</span>
          <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase">Bold 700</span>
        </div>
      </div>
    ),
  },
  {
    label: 'Color',
    sub: 'Palette & harmony',
    rotate: -1,
    accent: '#5b6ee1',
    visual: (
      <div className="w-full px-5 flex flex-col gap-2">
        <div className="flex gap-1.5">
          {['#0a0a0e', '#1a1a2e', '#89AACC', '#4E85BF', '#5b6ee1', '#fff'].map(c => (
            <div key={c} className="flex-1 h-10 rounded-lg" style={{ background: c, border: c === '#fff' ? '1px solid rgba(255,255,255,0.15)' : undefined }} />
          ))}
        </div>
        <div className="flex gap-1.5">
          {[0.08, 0.16, 0.28, 0.42, 0.60, 0.80].map((o, i) => (
            <div key={i} className="flex-1 h-6 rounded-md" style={{ background: `rgba(137,170,204,${o})` }} />
          ))}
        </div>
      </div>
    ),
  },
]

const col2 = [
  {
    label: 'Motion',
    sub: 'Animation & easing',
    rotate: 3,
    accent: '#5b6ee1',
    visual: (
      <div className="flex items-end justify-center gap-1.5 h-16 px-4">
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <div
            key={i}
            className="w-4 rounded-t-full"
            style={{
              background: `rgba(137,170,204,${0.3 + i * 0.1})`,
              animation: `barPulse 1.4s ease-in-out ${i * 0.12}s infinite alternate`,
              height: '40%',
            }}
          />
        ))}
      </div>
    ),
  },
  {
    label: 'Systems',
    sub: 'Structure & logic',
    rotate: -1,
    accent: '#4E85BF',
    visual: (
      <div className="w-full px-5">
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md aspect-square"
              style={{
                background: `rgba(137,170,204,${0.04 + ((i * 7) % 9) * 0.04})`,
                border: `1px solid rgba(255,255,255,${0.04 + ((i * 3) % 5) * 0.02})`,
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Interaction',
    sub: 'Micro-interactions',
    rotate: 2,
    accent: '#89AACC',
    visual: (
      <div className="w-full px-5 flex flex-col gap-2.5">
        <div className="flex items-center gap-2 h-9 rounded-xl bg-white/12 px-3 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-[#89AACC]/60" />
          <div className="h-1 flex-1 rounded-full bg-white/15" />
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center justify-center h-8 rounded-lg bg-white/20 text-[10px] text-white/70 font-medium">
            Cancel
          </div>
          <div className="flex-1 flex items-center justify-center h-8 rounded-lg bg-[#89AACC]/40 text-[10px] text-white font-semibold border border-[#89AACC]/30">
            Confirm
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 rounded-full bg-[#89AACC]/50 flex items-center px-0.5">
            <div className="w-3 h-3 rounded-full bg-white ml-auto" />
          </div>
          <div className="h-1 w-16 rounded-full bg-white/15" />
        </div>
      </div>
    ),
  },
  {
    label: 'Depth & Layers',
    sub: 'Shadow & hierarchy',
    rotate: -2,
    accent: '#89AACC',
    visual: (
      <div className="relative w-full flex items-center justify-center h-24">
        {[3, 2, 1, 0].map(layer => (
          <div
            key={layer}
            className="absolute rounded-xl border border-white/10"
            style={{
              width: `${55 + layer * 18}%`,
              height: `${36 + layer * 12}px`,
              background: `rgba(255,255,255,${0.03 + layer * 0.04})`,
              transform: `translateY(${layer * 10}px)`,
              boxShadow: `0 ${layer * 4}px ${layer * 12}px rgba(0,0,0,${0.1 + layer * 0.08})`,
            }}
          />
        ))}
      </div>
    ),
  },
]

/* ─── Card component ─────────────────────────────────────────── */

interface CardData {
  label: string
  sub: string
  rotate: number
  accent: string
  visual: React.ReactNode
}

function ExploreCard({ label, sub, rotate, accent, visual }: CardData) {
  return (
    <div
      className="w-full max-w-[260px] bg-surface/60 border border-stroke rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 hover:border-white/20 hover:bg-surface/80"
      style={{
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Accent top bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${accent}60, transparent)` }} />

      {/* Visual area */}
      <div className="pt-5 pb-3 flex items-center justify-center min-h-[120px]">
        {visual}
      </div>

      {/* Label */}
      <div className="px-5 pb-5">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-[11px] text-muted mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

/* ─── Section ────────────────────────────────────────────────── */

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: contentRef.current,
          pinSpacing: false,
        })
      }

      if (col1Ref.current && sectionRef.current) {
        gsap.to(col1Ref.current, {
          y: -280,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }

      if (col2Ref.current && sectionRef.current) {
        gsap.to(col2Ref.current, {
          y: 280,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @keyframes barPulse {
          from { height: 20%; }
          to   { height: 80%; }
        }
      `}</style>

      <section ref={sectionRef} className="relative min-h-[320vh]">
        {/* Pinned center heading */}
        <div ref={contentRef} className="relative z-10 h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
              <div className="w-8 h-px bg-stroke" />
            </div>
            <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary mb-4">
              Visual{' '}
              <em className="font-display italic not-italic font-normal">playground</em>
            </h2>
            <p className="text-sm text-muted max-w-xs mx-auto mb-6">
              Experiments, side projects, and things I made just for fun.
            </p>
            <a
              href="https://github.com/dhruv-coder-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text-primary transition-colors"
            >
              View on GitHub ↗
            </a>
          </div>
        </div>

        {/* Parallax columns */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-start justify-center pt-[8vh]">
          <div className="w-full max-w-[1400px] px-8 md:px-16 grid grid-cols-2 gap-8 md:gap-32">
            {/* Col 1 — slides up */}
            <div ref={col1Ref} className="pointer-events-auto flex flex-col gap-6 items-start">
              {col1.map(item => (
                <ExploreCard key={item.label} {...item} />
              ))}
            </div>
            {/* Col 2 — slides down */}
            <div ref={col2Ref} className="pointer-events-auto flex flex-col gap-6 items-end mt-40">
              {col2.map(item => (
                <ExploreCard key={item.label} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
