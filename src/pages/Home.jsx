import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CellCanvas from '../components/home/CellCanvas'
import InflammatoryTransition from '../components/home/InflammatoryTransition'
import { ImmuneNetwork } from '../components/common/LabLogos'

export default function Home() {
  const [phase, setPhase] = useState('landing') // 'landing' | 'transitioning' | 'lab'
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 })

  const handleEnter = useCallback((e) => {
    const rect = e.target.getBoundingClientRect()
    setClickPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    setPhase('transitioning')
  }, [])

  const handleTransitionComplete = useCallback(() => {
    setPhase('lab')
  }, [])

  return (
    <div className="relative">
      {/* Inflammatory shockwave overlay */}
      {phase === 'transitioning' && (
        <InflammatoryTransition
          originX={clickPos.x}
          originY={clickPos.y}
          onComplete={handleTransitionComplete}
        />
      )}

      {phase !== 'lab' ? (
        /* ============================================================
           LANDING — Tissue visualization + Enter the Lab
           ============================================================ */
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #faf7f4, #f5f0ec, #faf7f4)',
            visibility: phase === 'transitioning' ? 'hidden' : 'visible',
          }}
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

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(192, 72, 58, 0.35)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnter}
              disabled={phase === 'transitioning'}
              className="px-10 py-4 rounded-full font-semibold text-lg text-white cursor-pointer transition-all duration-300"
              style={{ backgroundColor: '#c0483a', letterSpacing: '0.05em' }}
            >
              Enter the Lab →
            </motion.button>
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
      ) : (
        /* ============================================================
           LAB INTERIOR — Revealed after inflammatory cascade
           ============================================================ */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Mission — Immune Network Logo */}
          <section className="min-h-screen flex items-center py-20 px-6" style={{ background: 'linear-gradient(to bottom, #f5f0ec, #faf7f4)' }}>
            <div className="max-w-5xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-16"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: '#8b5c4a' }}>
                  Our Approach
                </p>
                <h2 className="text-3xl md:text-5xl mb-6" style={{ color: '#2a1f1a' }}>
                  Modeling Immunity as a
                  <br />
                  <span className="italic" style={{ color: '#c0483a' }}>Computational Network</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex justify-center mb-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.015, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                  <ImmuneNetwork size={300} />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="max-w-2xl mx-auto text-center"
              >
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#5a4a3a' }}>
                  The immune system processes signals like a neural network — dendritic cells sample antigens,
                  T-cells decide the response, and cytokines carry the signal.
                </p>
                <p className="leading-relaxed" style={{ color: '#8b7b6b' }}>
                  Our lab uses machine learning to decode these decisions — from predicting treatment
                  response in atopic dermatitis to identifying molecular subtypes in psoriasis.
                </p>
              </motion.div>
            </div>
          </section>

          {/* PI Section */}
          <section className="py-24 px-6" style={{ background: '#faf7f4' }}>
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="w-56 h-56 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: '3px solid #d8c8b8', background: 'linear-gradient(135deg, rgba(192,72,58,0.08), rgba(44,158,140,0.08))' }}
                >
                  <span style={{ color: '#8b7b6b' }} className="text-sm">Photo</span>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: '#c0483a' }}>
                    Principal Investigator
                  </p>
                  <h2 className="text-3xl md:text-4xl mb-4" style={{ color: '#2a1f1a' }}>
                    Mayte Suárez-Fariñas, <span className="italic" style={{ color: '#6b5548' }}>PhD</span>
                  </h2>
                  <p className="leading-relaxed mb-4" style={{ color: '#5a4a3a' }}>
                    Professor of Population Health Science & Policy, Genetics & Genomic Sciences,
                    and Artificial Intelligence & Human Health at the Icahn School of Medicine at Mount Sinai.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#8b7b6b' }}>
                    Dr. Suárez-Fariñas specializes in developing statistical and computational
                    methods to analyze complex high-throughput biological data. Her work has
                    pioneered molecular phenotyping approaches in inflammatory skin diseases.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {['236+ Publications', 'Systems Biology', 'Machine Learning', 'Translational Medicine'].map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full"
                        style={{ background: 'rgba(192,72,58,0.08)', color: '#8b5040', border: '1px solid rgba(192,72,58,0.15)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Research Highlights */}
          <section className="py-24 px-6 relative bg-primary-950">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <p className="text-teal-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                  What We Do
                </p>
                <h2 className="text-3xl md:text-5xl text-warm-100 mb-4">
                  Research <span className="italic text-teal-400">Areas</span>
                </h2>
                <p className="text-warm-500 max-w-xl mx-auto">
                  From skin to gut, from genes to therapies — our lab bridges
                  computational methods with clinical impact.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Atopic Dermatitis & Psoriasis',
                    desc: 'Molecular phenotyping and treatment response prediction in inflammatory skin diseases. Developing genomic biomarkers that transform patient care.',
                    color: 'from-coral-500/20 to-coral-700/5',
                    accent: 'text-coral-400',
                    border: 'hover:border-coral-500/30',
                    icon: '🧬',
                  },
                  {
                    title: 'Inflammatory Bowel Disease',
                    desc: 'Systems biology approaches to understand Crohn\'s disease and ulcerative colitis at the molecular level. Bridging multi-omics data with clinical outcomes.',
                    color: 'from-teal-500/20 to-teal-700/5',
                    accent: 'text-teal-400',
                    border: 'hover:border-teal-500/30',
                    icon: '🔬',
                  },
                  {
                    title: 'Genomics & Biostatistics',
                    desc: 'Novel statistical methods for RNA-seq, single-cell, proteomics, and metabolomics. Building robust analytical frameworks for translational medicine.',
                    color: 'from-amber-500/20 to-amber-700/5',
                    accent: 'text-amber-400',
                    border: 'hover:border-amber-500/30',
                    icon: '📊',
                  },
                ].map((area, i) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className={`bg-gradient-to-b ${area.color} border border-primary-800/50 ${area.border} rounded-2xl p-8 transition-all duration-500 group cursor-pointer hover:-translate-y-1`}
                  >
                    <div className="text-4xl mb-4">{area.icon}</div>
                    <h3 className={`font-[family-name:var(--font-display)] text-xl mb-3 ${area.accent}`}>
                      {area.title}
                    </h3>
                    <p className="text-warm-400 text-sm leading-relaxed">{area.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  )
}
