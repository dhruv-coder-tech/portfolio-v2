import { motion } from 'framer-motion'

const stats = [
  { number: '4+', label: 'Projects Built', sub: 'from concept to launch' },
  { number: '100%', label: 'Open to Work', sub: 'available for new projects' },
  { number: '∞', label: 'Ideas in Queue', sub: 'and always counting' },
]

export default function Stats() {
  return (
    <section className="py-16 md:py-24 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-10 md:py-0 md:px-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-5xl md:text-6xl font-display italic text-text-primary mb-2 leading-none">
                {stat.number}
              </p>
              <p className="text-sm font-medium text-text-primary mb-1">{stat.label}</p>
              <p className="text-xs text-muted">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
