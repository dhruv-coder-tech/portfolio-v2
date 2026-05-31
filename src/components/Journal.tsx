import { motion } from 'framer-motion'

const entries = [
  { title: 'Building SwiftKeys: from idea to Electron app', readTime: '5 min', date: 'May 2026', icon: '⌨️' },
  { title: 'Why I set up an AI second brain with Obsidian + Claude', readTime: '4 min', date: 'May 2026', icon: '🧠' },
  { title: 'Lessons learned from refactoring a UI from scratch', readTime: '3 min', date: 'Apr 2026', icon: '🎨' },
  { title: 'The philosophy behind good daily task management', readTime: '6 min', date: 'Apr 2026', icon: '✅' },
]

export default function Journal() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-body font-light text-text-primary">
              Recent{' '}
              <em className="font-display italic not-italic font-normal">thoughts</em>
            </h2>
            <p className="text-sm text-muted mt-2">Things I've been thinking about and writing down.</p>
          </div>
          <span className="hidden md:inline-flex items-center gap-2 text-sm text-muted rounded-full border border-stroke/40 px-5 py-2.5 shrink-0 opacity-40 select-none">
            Coming soon
          </span>
        </motion.div>

        {/* Entry list */}
        <div className="flex flex-col gap-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.title}
              className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Index number */}
              <span className="hidden sm:flex w-8 h-8 rounded-full border border-stroke items-center justify-center text-[10px] text-muted flex-shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-surface flex-shrink-0 flex items-center justify-center text-lg border border-stroke">
                {entry.icon}
              </div>

              {/* Title */}
              <p className="flex-1 text-sm md:text-base text-text-primary/80 group-hover:text-text-primary transition-colors leading-snug">
                {entry.title}
              </p>

              {/* Meta */}
              <div className="hidden md:flex items-center gap-6 text-xs text-muted flex-shrink-0">
                <span>{entry.readTime} read</span>
                <span>{entry.date}</span>
              </div>

              {/* Arrow */}
              <span className="text-muted group-hover:text-text-primary transition-colors text-sm flex-shrink-0">→</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
