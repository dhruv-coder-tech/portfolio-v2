import { motion } from 'framer-motion'

// ─── Project mockup visuals ───────────────────────────────────────────────────

const SwiftKeysMockup = () => (
  <div className="w-full h-full flex flex-col p-6 md:p-8">
    {/* Window chrome */}
    <div className="flex items-center gap-1.5 mb-5">
      <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
      <span className="ml-3 text-[10px] text-white/25 uppercase tracking-widest">swiftkeys</span>
    </div>

    {/* Stats row */}
    <div className="flex items-end gap-6 mb-5">
      <div>
        <p className="text-5xl md:text-6xl font-display italic text-white/90 leading-none">94</p>
        <p className="text-[10px] text-white/35 uppercase tracking-[0.2em] mt-1">wpm</p>
      </div>
      <div className="flex-1 flex flex-col gap-2 pb-1">
        {[{ label: 'acc', val: '97%', w: '97%' }, { label: 'raw', val: '78', w: '78%' }, { label: 'time', val: '60s', w: '100%' }].map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="text-[9px] text-white/25 w-6">{s.label}</span>
            <div className="flex-1 h-1 rounded-full bg-white/8">
              <div className="h-full rounded-full bg-[#89AACC]/50" style={{ width: s.w }} />
            </div>
            <span className="text-[9px] text-white/40 w-6 text-right">{s.val}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Typing text */}
    <div className="font-mono text-xs leading-relaxed mb-4 bg-white/3 rounded-lg px-3 py-2 border border-white/6">
      <span className="text-[#89AACC]/70">the quick brown fox </span>
      <span className="text-white/85">jumps over</span>
      <span className="text-[#89AACC] animate-pulse">|</span>
      <span className="text-white/18"> the lazy dog and then</span>
    </div>

    {/* Keyboard */}
    <div className="flex gap-1 justify-center mt-auto">
      {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
        <div key={k} className="flex-1 aspect-square rounded bg-white/6 border border-white/8 flex items-center justify-center text-[8px] text-white/30 font-mono">{k}</div>
      ))}
    </div>
    <div className="flex gap-1 justify-center mt-1 px-3">
      {['A','S','D','F','G','H','J','K','L'].map(k => (
        <div key={k} className="flex-1 aspect-square rounded bg-white/5 border border-white/6 flex items-center justify-center text-[8px] text-white/20 font-mono">{k}</div>
      ))}
    </div>
  </div>
)

const DailyTrackerMockup = () => {
  const tasks = [
    { done: true,  label: 'Design system audit',  p: 'high' },
    { done: true,  label: 'Fix nav responsive',    p: 'med'  },
    { done: true,  label: 'Push to GitHub',        p: 'low'  },
    { done: false, label: 'Write blog post',       p: 'high' },
    { done: false, label: 'Review pull requests',  p: 'med'  },
  ]
  const done = tasks.filter(t => t.done).length

  return (
    <div className="w-full h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-[10px] text-white/40 uppercase tracking-widest">Today</p>
        <p className="text-[10px] text-[#4E85BF]">{done}/{tasks.length} done</p>
      </div>

      {/* Progress */}
      <div className="h-1 w-full rounded-full bg-white/8 mb-4">
        <div className="h-full rounded-full bg-[#4E85BF]/60 transition-all" style={{ width: `${(done / tasks.length) * 100}%` }} />
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-0.5 flex-1">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center gap-2.5 py-2 border-b border-white/4 last:border-0">
            <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${task.done ? 'bg-[#4E85BF]/30 border-[#4E85BF]/50' : 'border-white/15'}`}>
              {task.done && <div className="w-1.5 h-1.5 rounded-full bg-white/70" />}
            </div>
            <span className={`text-[11px] flex-1 leading-tight ${task.done ? 'text-white/25 line-through decoration-white/20' : 'text-white/70'}`}>
              {task.label}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${task.p === 'high' ? 'bg-red-400/60' : task.p === 'med' ? 'bg-yellow-400/50' : 'bg-green-400/50'}`} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[9px] text-white/20">May 31, 2026</span>
        <div className="flex gap-1">
          {['#ff6b6b','#ffd93d','#6bcb77'].map(c => (
            <div key={c} className="w-4 h-4 rounded-full" style={{ background: c, opacity: 0.5 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

const ObsidianMockup = () => (
  <div className="w-full h-full flex items-center justify-center p-4 relative">
    <svg viewBox="0 0 200 170" className="w-full h-full" style={{ maxHeight: 180 }}>
      {/* Outer ring connections */}
      {[
        [100,85, 38,38], [100,85, 162,38], [100,85, 170,100],
        [100,85, 140,145],[100,85, 60,145], [100,85, 30,100],
        [38,38, 20,80],   [162,38, 180,80],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={i < 6 ? 'rgba(137,170,204,0.35)' : 'rgba(137,170,204,0.15)'}
          strokeWidth="1"
          strokeDasharray={i >= 6 ? '3 3' : undefined}
        />
      ))}

      {/* Center node */}
      <circle cx="100" cy="85" r="14" fill="rgba(137,170,204,0.2)" stroke="rgba(137,170,204,0.8)" strokeWidth="1.5" />
      <text x="100" y="89" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.85)" fontWeight="500">Claude</text>

      {/* Primary nodes */}
      {[
        { cx:38,  cy:38,  r:9, label:'Notes',  dy:16, color:'rgba(78,133,191,0.7)' },
        { cx:162, cy:38,  r:9, label:'MCP',    dy:16, color:'rgba(78,133,191,0.7)' },
        { cx:170, cy:100, r:8, label:'API',    dy:15, color:'rgba(91,110,225,0.7)' },
        { cx:140, cy:145, r:8, label:'Memory', dy:14, color:'rgba(91,110,225,0.7)' },
        { cx:60,  cy:145, r:8, label:'Vault',  dy:14, color:'rgba(78,133,191,0.7)' },
        { cx:30,  cy:100, r:8, label:'Tags',   dy:15, color:'rgba(91,110,225,0.7)' },
      ].map(({ cx, cy, r, label, dy, color }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r={r} fill="rgba(137,170,204,0.12)" stroke={color} strokeWidth="1" />
          <text x={cx} y={cy + dy} textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.45)">{label}</text>
        </g>
      ))}

      {/* Outer tiny nodes */}
      {[[20,80],[180,80]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="rgba(137,170,204,0.1)" stroke="rgba(137,170,204,0.3)" strokeWidth="1" />
      ))}

      {/* Floating labels */}
      <text x="100" y="15" textAnchor="middle" fontSize="6.5" fill="rgba(137,170,204,0.4)" letterSpacing="2">AI SECOND BRAIN</text>
    </svg>
  </div>
)

const UIRefactorMockup = () => (
  <div className="w-full h-full flex flex-col p-6 md:p-8">
    {/* Header */}
    <div className="flex items-center gap-2 mb-5">
      <div className="w-1 h-4 rounded-full bg-[#89AACC]/60" />
      <span className="text-[10px] text-white/30 uppercase tracking-[0.25em]">Design Refactor</span>
    </div>

    {/* Before → After panels */}
    <div className="flex gap-3 flex-1">
      {/* Before */}
      <div className="flex-1 rounded-xl bg-white/4 border border-white/8 p-3 flex flex-col gap-2">
        <span className="text-[8px] text-white/20 uppercase tracking-widest">Before</span>
        <div className="h-4 w-3/4 rounded bg-white/6 border border-white/8" />
        <div className="h-2 w-full rounded bg-white/4" />
        <div className="h-2 w-5/6 rounded bg-white/4" />
        <div className="h-2 w-2/3 rounded bg-white/3" />
        <div className="mt-auto">
          <div className="h-7 w-full rounded bg-gray-600/30 border border-gray-500/20 flex items-center px-2">
            <div className="h-1.5 w-1/2 rounded bg-white/15" />
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex items-center self-center text-white/20 text-sm">→</div>

      {/* After */}
      <div className="flex-1 rounded-xl bg-[#89AACC]/8 border border-[#89AACC]/20 p-3 flex flex-col gap-2">
        <span className="text-[8px] text-[#89AACC]/50 uppercase tracking-widest">After</span>
        <div className="h-4 w-3/4 rounded-md bg-[#89AACC]/20 border border-[#89AACC]/15" />
        <div className="h-2 w-full rounded-sm bg-white/8" />
        <div className="h-2 w-5/6 rounded-sm bg-white/6" />
        <div className="h-2 w-2/3 rounded-sm bg-white/4" />
        <div className="mt-auto">
          <div className="h-7 w-full rounded-full bg-[#89AACC]/25 border border-[#89AACC]/30 flex items-center px-3">
            <div className="h-1.5 w-1/2 rounded-full bg-[#89AACC]/50" />
          </div>
        </div>
      </div>
    </div>

    {/* Token row */}
    <div className="flex gap-1.5 mt-4">
      {[
        { label: 'Aa', bg: 'bg-white/8' },
        { label: '', bg: 'bg-[#89AACC]/30', w: 'w-5', h: 'h-5' },
        { label: '', bg: 'bg-[#4E85BF]/30', w: 'w-5', h: 'h-5' },
        { label: '', bg: 'bg-[#5b6ee1]/30', w: 'w-5', h: 'h-5' },
        { label: '', bg: 'bg-white/10',  w: 'w-5', h: 'h-5' },
      ].map((t, i) => (
        <div key={i} className={`${t.bg} rounded ${t.w ?? 'px-2'} ${t.h ?? ''} h-5 flex items-center justify-center border border-white/8`}>
          {t.label && <span className="text-[9px] text-white/40 font-medium">{t.label}</span>}
        </div>
      ))}
      <div className="flex-1 h-5 rounded bg-white/4 border border-white/6 flex items-center px-1.5">
        <div className="h-1 w-full rounded-full bg-white/15" />
      </div>
    </div>
  </div>
)

// ─── Project data ─────────────────────────────────────────────────────────────

const projects = [
  {
    title: 'SwiftKeys',
    subtitle: 'Typing & Performance',
    span: 'md:col-span-7',
    accent: '#89AACC',
    tags: ['Electron', 'React', 'Supabase', 'Vite'],
    desc: 'Desktop typing test inspired by Monkeytype — WPM tracking, adaptive learning, focus mode & cloud auth.',
    mockup: <SwiftKeysMockup />,
  },
  {
    title: 'Daily Tracker',
    subtitle: 'Task Management',
    span: 'md:col-span-5',
    accent: '#4E85BF',
    tags: ['HTML', 'CSS', 'JavaScript'],
    desc: 'Priority-based daily task manager with progress visualization and urgency ranking.',
    mockup: <DailyTrackerMockup />,
  },
  {
    title: 'Obsidian AI Brain',
    subtitle: 'AI Knowledge Base',
    span: 'md:col-span-5',
    accent: '#89AACC',
    tags: ['Claude API', 'MCP', 'Obsidian', 'Node.js'],
    desc: 'Personal second brain — Obsidian vault wired to Claude via MCP for persistent AI memory.',
    mockup: <ObsidianMockup />,
  },
  {
    title: 'UI/UX Refactor',
    subtitle: 'Design Systems',
    span: 'md:col-span-7',
    accent: '#4E85BF',
    tags: ['HTML', 'CSS', 'Design'],
    desc: 'Complete visual overhaul of a web app — layout, typography, color system, and interactions.',
    mockup: <UIRefactorMockup />,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function SelectedWorks() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-body font-light text-text-primary">
              Featured{' '}
              <em className="font-display italic not-italic font-normal">projects</em>
            </h2>
            <p className="text-sm text-muted mt-2 max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <a
            href="https://github.com/dhruv-coder-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary transition-colors rounded-full border border-stroke px-5 py-2.5 shrink-0"
          >
            View all work →
          </a>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              className={`${p.span} group relative rounded-3xl overflow-hidden cursor-pointer bg-surface border border-stroke`}
              style={{ minHeight: 280 }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Radial accent bg */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `radial-gradient(ellipse at 30% 40%, ${p.accent}18 0%, transparent 70%), hsl(var(--surface))`,
                }}
              />

              {/* Halftone texture */}
              <div
                className="absolute inset-0 opacity-[0.12] mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Mockup visual — top portion */}
              <div className="absolute inset-0 bottom-[35%]">
                {p.mockup}
              </div>

              {/* Bottom info strip */}
              <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 py-5 bg-gradient-to-t from-surface via-surface/90 to-transparent pt-10">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-stroke/50 text-muted bg-bg/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-muted uppercase tracking-[0.2em] mb-0.5">{p.subtitle}</p>
                <h3 className="text-base font-medium text-text-primary">{p.title}</h3>
                <p className="text-[11px] text-muted leading-relaxed mt-0.5 max-w-xs">{p.desc}</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md flex items-center justify-center">
                <div className="relative">
                  <span className="absolute rounded-full accent-gradient" style={{ inset: '-2px' }} />
                  <span className="relative z-10 flex items-center gap-2 bg-white text-bg text-sm font-medium px-5 py-2.5 rounded-full">
                    View <em className="font-display not-italic italic font-normal">{p.title}</em>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
