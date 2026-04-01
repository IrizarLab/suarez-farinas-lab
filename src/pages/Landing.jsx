import { motion } from 'framer-motion'
import CellCanvas from '../components/home/CellCanvas'

export default function Landing({ onEnter }) {
  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect()
    onEnter(rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #faf7f4, #f5f0ec, #faf7f4)' }}
    >
      <CellCanvas />

      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(250,247,244,0.4) 0%, rgba(250,247,244,0.75) 70%, rgba(245,240,236,0.9) 100%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm font-semibold uppercase tracking-[0.3em] mb-6"
          style={{ color: '#8b5c4a' }}
        >
          Icahn School of Medicine at Mount Sinai
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-8"
          style={{ color: '#2a1f1a' }}
        >
          Decoding{' '}
          <span className="italic" style={{ color: '#c0483a' }}>Inflammation</span>
          <br />
          Through Data
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg md:text-xl leading-relaxed mb-14 text-center font-[family-name:var(--font-sans)]"
          style={{ color: '#6b5548' }}
        >
          We combine computational biology, systems immunology, and genomics to unravel
          <br className="hidden md:block" />
          the molecular mechanisms of inflammatory diseases and discover new therapeutic targets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative inline-block"
        >
          {/* Pulsing glow ring behind button */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0px rgba(192, 72, 58, 0)',
                '0 0 40px rgba(192, 72, 58, 0.3)',
                '0 0 0px rgba(192, 72, 58, 0)',
              ],
              scale: [1, 1.03, 1],
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full"
          />
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(192, 72, 58, 0.45)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="relative text-white cursor-pointer transition-all duration-300 font-semibold"
            style={{ padding: '10px 28px', fontSize: '20px', borderRadius: '9999px', backgroundColor: '#c0483a', letterSpacing: '0.06em' }}
          >
            Enter the Lab →
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <p className="text-xs tracking-widest" style={{ color: '#b8a89a' }}>
          SUÁREZ-FARIÑAS LAB
        </p>
      </motion.div>
    </section>
  )
}
