import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ColorKey =
  | 'color1'  | 'color2'  | 'color3'  | 'color4'  | 'color5'
  | 'color6'  | 'color7'  | 'color8'  | 'color9'  | 'color10'
  | 'color11' | 'color12' | 'color13' | 'color14' | 'color15'
  | 'color16' | 'color17'

export type Colors = Record<ColorKey, string>

const svgOrder = ['svg1', 'svg2', 'svg3', 'svg4', 'svg3', 'svg2', 'svg1'] as const
type SvgKey = (typeof svgOrder)[number]

type Stop = { offset: number; stopColor: string }
type SvgState = { gradientTransform: string; stops: Stop[] }
type SvgStates = Record<SvgKey, SvgState>

// ─── Portfolio accent colours ─────────────────────────────────────────────────

export const PORTFOLIO_COLORS: Colors = {
  color1:  '#FFFFFF',
  color2:  '#89AACC',
  color3:  '#4E85BF',
  color4:  '#FCFCFE',
  color5:  '#F0F4F8',
  color6:  '#89AACC',
  color7:  '#2D6EA8',
  color8:  '#1E5A96',
  color9:  '#4E85BF',
  color10: '#89AACC',
  color11: '#2B5F9E',
  color12: '#A8C4E0',
  color13: '#1A4F8A',
  color14: '#B0C8E8',
  color15: '#C0D4EC',
  color16: '#3A74B3',
  color17: '#3F6CB0',
}

// ─── Gradient SVG ─────────────────────────────────────────────────────────────

const createStopsArray = (
  svgStates: SvgStates,
  svgOrder: readonly SvgKey[],
  maxStops: number
): Stop[][] =>
  Array.from({ length: maxStops }, (_, i) =>
    svgOrder.map(key => {
      const { stops } = svgStates[key]
      return stops[i] ?? stops[stops.length - 1]
    })
  )

const GradientSvg: React.FC<{ className: string; isHovered: boolean; colors: Colors }> = ({
  className, isHovered, colors,
}) => {
  const svgStates: SvgStates = {
    svg1: {
      gradientTransform: 'translate(287.5 280) rotate(-29.0546) scale(689.807 1000)',
      stops: [
        { offset: 0,        stopColor: colors.color1  },
        { offset: 0.188423, stopColor: colors.color2  },
        { offset: 0.260417, stopColor: colors.color3  },
        { offset: 0.328792, stopColor: colors.color4  },
        { offset: 0.328892, stopColor: colors.color5  },
        { offset: 0.328992, stopColor: colors.color1  },
        { offset: 0.442708, stopColor: colors.color6  },
        { offset: 0.537556, stopColor: colors.color7  },
        { offset: 0.631738, stopColor: colors.color1  },
        { offset: 0.725645, stopColor: colors.color8  },
        { offset: 0.817779, stopColor: colors.color9  },
        { offset: 0.84375,  stopColor: colors.color10 },
        { offset: 0.90569,  stopColor: colors.color1  },
        { offset: 1,        stopColor: colors.color11 },
      ],
    },
    svg2: {
      gradientTransform: 'translate(126.5 418.5) rotate(-64.756) scale(533.444 773.324)',
      stops: [
        { offset: 0,        stopColor: colors.color1  },
        { offset: 0.104167, stopColor: colors.color12 },
        { offset: 0.182292, stopColor: colors.color13 },
        { offset: 0.28125,  stopColor: colors.color1  },
        { offset: 0.328792, stopColor: colors.color4  },
        { offset: 0.328892, stopColor: colors.color5  },
        { offset: 0.453125, stopColor: colors.color6  },
        { offset: 0.515625, stopColor: colors.color7  },
        { offset: 0.631738, stopColor: colors.color1  },
        { offset: 0.692708, stopColor: colors.color8  },
        { offset: 0.75,     stopColor: colors.color14 },
        { offset: 0.817708, stopColor: colors.color9  },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1,        stopColor: colors.color1  },
      ],
    },
    svg3: {
      gradientTransform: 'translate(264.5 339.5) rotate(-42.3022) scale(946.451 1372.05)',
      stops: [
        { offset: 0,        stopColor: colors.color1  },
        { offset: 0.188423, stopColor: colors.color2  },
        { offset: 0.307292, stopColor: colors.color1  },
        { offset: 0.328792, stopColor: colors.color4  },
        { offset: 0.328892, stopColor: colors.color5  },
        { offset: 0.442708, stopColor: colors.color15 },
        { offset: 0.537556, stopColor: colors.color16 },
        { offset: 0.631738, stopColor: colors.color1  },
        { offset: 0.725645, stopColor: colors.color17 },
        { offset: 0.817779, stopColor: colors.color9  },
        { offset: 0.84375,  stopColor: colors.color10 },
        { offset: 0.90569,  stopColor: colors.color1  },
        { offset: 1,        stopColor: colors.color11 },
      ],
    },
    svg4: {
      gradientTransform: 'translate(860.5 420) rotate(-153.984) scale(957.528 1388.11)',
      stops: [
        { offset: 0.109375, stopColor: colors.color11 },
        { offset: 0.171875, stopColor: colors.color2  },
        { offset: 0.260417, stopColor: colors.color13 },
        { offset: 0.328792, stopColor: colors.color4  },
        { offset: 0.328892, stopColor: colors.color5  },
        { offset: 0.328992, stopColor: colors.color1  },
        { offset: 0.442708, stopColor: colors.color6  },
        { offset: 0.515625, stopColor: colors.color7  },
        { offset: 0.631738, stopColor: colors.color1  },
        { offset: 0.692708, stopColor: colors.color8  },
        { offset: 0.817708, stopColor: colors.color9  },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1,        stopColor: colors.color11 },
      ],
    },
  }

  const maxStops = Math.max(...Object.values(svgStates).map(s => s.stops.length))
  const stopsArray = createStopsArray(svgStates, svgOrder, maxStops)
  const gradientTransforms = svgOrder.map(k => svgStates[k].gradientTransform)

  const variants = {
    hovered:    { gradientTransform: gradientTransforms, transition: { duration: 30, repeat: Infinity, ease: 'linear' as const } },
    notHovered: { gradientTransform: gradientTransforms, transition: { duration: 12, repeat: Infinity, ease: 'linear' as const } },
  }

  return (
    <svg className={className} width="1030" height="280" viewBox="0 0 1030 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1030" height="280" rx="140" fill="url(#paint0_radial_liquid)" />
      <defs>
        <motion.radialGradient
          id="paint0_radial_liquid"
          cx="0" cy="0" r="1"
          gradientUnits="userSpaceOnUse"
          animate={isHovered ? variants.hovered : variants.notHovered}
        >
          {stopsArray.map((stopConfigs, i) => (
            <AnimatePresence key={i}>
              <motion.stop
                initial={{ offset: stopConfigs[0].offset, stopColor: stopConfigs[0].stopColor }}
                animate={{
                  offset: stopConfigs.map(c => c.offset),
                  stopColor: stopConfigs.map(c => c.stopColor),
                }}
                transition={{ duration: 0, ease: 'linear', repeat: Infinity }}
              />
            </AnimatePresence>
          ))}
        </motion.radialGradient>
      </defs>
    </svg>
  )
}

// ─── Liquid layers ────────────────────────────────────────────────────────────

export const Liquid: React.FC<{ isHovered: boolean; colors: Colors }> = ({ isHovered, colors }) => (
  <>
    {Array.from({ length: 7 }).map((_, i) => (
      <div
        key={i}
        className={`absolute ${i < 3 ? 'w-[443px] h-[121px]' : 'w-[756px] h-[207px]'} ${
          i === 0 ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference'
          : i === 1 ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[164.971deg] mix-blend-difference'
          : i === 2 ? 'top-1/2 left-1/2 -translate-x-[53%] -translate-y-[53%] rotate-[-11.61deg] mix-blend-difference'
          : i === 3 ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-[57%] rotate-[-179.012deg] mix-blend-difference'
          : i === 4 ? 'top-1/2 left-1/2 -translate-x-[57%] -translate-y-1/2 rotate-[-29.722deg] mix-blend-difference'
          : i === 5 ? 'top-1/2 left-1/2 -translate-x-[62%] -translate-y-[24%] rotate-[160.227deg] mix-blend-difference'
          : 'top-1/2 left-1/2 -translate-x-[67%] -translate-y-[29%] rotate-180 mix-blend-hard-light'
        }`}
      >
        <GradientSvg className="w-full h-full" isHovered={isHovered} colors={colors} />
      </div>
    ))}
  </>
)

// ─── Public button component ──────────────────────────────────────────────────

interface LiquidButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  colors?: Colors
  className?: string
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  href,
  onClick,
  colors = PORTFOLIO_COLORS,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const inner = (
    <span
      className={`relative inline-flex items-center justify-center h-[44px] cursor-pointer ${className}`}
      style={{ minWidth: 140 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Outer glow */}
      <span className="absolute w-[110%] h-[140%] top-[5%] left-1/2 -translate-x-1/2 filter blur-[18px] opacity-60 rounded-full overflow-hidden pointer-events-none">
        <span className="absolute inset-0 rounded-full bg-[#89AACC]/40 blur-[6px]" />
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <Liquid isHovered={isHovered} colors={colors} />
        </span>
      </span>

      {/* Dark halo */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[42%] w-[95%] h-[120%] rounded-full bg-[#04091f] blur-[7px] pointer-events-none" />

      {/* Main surface */}
      <span className="relative w-full h-full rounded-full overflow-hidden">
        <span className="absolute inset-0 rounded-full bg-[#89AACC]/20" />
        <span className="absolute inset-0 rounded-full bg-[#04091f]" />
        <Liquid isHovered={isHovered} colors={colors} />
        {[1, 2, 3, 4, 5].map(i => (
          <span
            key={i}
            className={`absolute inset-0 rounded-full border-[2px] border-white/30 mix-blend-overlay ${
              i <= 2 ? 'blur-[3px]' : i === 3 ? 'blur-[5px]' : 'blur-[4px]'
            }`}
          />
        ))}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[60%] h-[40%] rounded-full blur-[14px] bg-[#006]" />
      </span>

      {/* Label */}
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white tracking-wide z-10 pointer-events-none select-none">
        {children}
      </span>
    </span>
  )

  return href ? (
    <a href={href} className="inline-flex">
      {inner}
    </a>
  ) : (
    inner
  )
}
