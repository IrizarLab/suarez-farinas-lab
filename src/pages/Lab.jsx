import { motion } from 'framer-motion'
import { ImmuneNetwork } from '../components/common/LabLogos'
import AnimatedCounter from '../components/common/AnimatedCounter'
import WordCloud from '../components/common/WordCloud'
import useScholarData from '../hooks/useScholarData'

export default function Lab() {
  const { data: scholar } = useScholarData()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero — Approach (left) + PI (right) */}
      <section className="relative flex items-center justify-center pb-16 px-8 md:px-12 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f5f0ec, #faf7f4)', paddingTop: '120px' }}>
        <WordCloud />
        <div className="relative z-10 w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT — Our Approach + Immune Network */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: '#8b5c4a' }}>
                Our Approach
              </p>
              <h2 className="text-3xl md:text-4xl xl:text-5xl mb-6" style={{ color: '#2a1f1a' }}>
                Modeling Immunity as a{' '}
                <span className="italic" style={{ color: '#c0483a' }}>Computational Network</span>
              </h2>

              <div className="flex justify-center my-6">
                <motion.div
                  animate={{ scale: [1, 1.015, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                  <ImmuneNetwork size={220} />
                </motion.div>
              </div>

              <p className="text-lg leading-relaxed mb-4" style={{ color: '#5a4a3a' }}>
                The immune system processes signals like a neural network — dendritic cells sample antigens,
                T-cells decide the response, and cytokines carry the signal.
              </p>
              <p className="leading-relaxed" style={{ color: '#8b7b6b' }}>
                Our lab uses machine learning to decode these decisions — from predicting treatment
                response in atopic dermatitis to identifying molecular subtypes in psoriasis.
              </p>
            </motion.div>

            {/* RIGHT — PI Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center lg:items-start lg:pl-6"
            >
              {/* PI Photo */}
              <div className="w-44 h-44 rounded-full flex items-center justify-center shrink-0 mb-6"
                style={{ border: '3px solid #d8c8b8', background: 'linear-gradient(135deg, rgba(192,72,58,0.08), rgba(44,158,140,0.08))' }}
              >
                <span style={{ color: '#8b7b6b' }} className="text-sm">Photo</span>
              </div>

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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {/* Spacer */}
      <div style={{ height: '60px', background: '#faf7f4' }} />

      <section className="pb-24 px-8 md:px-12 flex justify-center" style={{ background: '#faf7f4' }}>
        <div className="w-full max-w-6xl rounded-2xl py-6 px-8" style={{ background: '#c0483a' }}>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-8 text-center">
            {[
              { target: scholar?.totalWorks || 300, suffix: '+', label: 'Publications' },
              { target: scholar?.totalCitations || 26000, suffix: '+', label: 'Citations' },
              { target: scholar?.hIndex || 82, suffix: '', label: 'H-Index' },
              { target: scholar?.i10Index || 202, suffix: '', label: 'i10-Index' },
              { target: 3, suffix: '', label: 'Departments' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-white mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={2000 + i * 300} />
                </p>
                <p className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: '60px', background: '#faf7f4' }} />

      {/* Featured Publications */}
      <section className="pt-16 px-8 md:px-12 flex justify-center" style={{ background: '#f5f0ec', paddingBottom: '50px' }}>
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#8b5c4a' }}>
              Selected Work
            </p>
            <h2 className="text-3xl md:text-4xl" style={{ color: '#2a1f1a' }}>
              Featured <span className="italic" style={{ color: '#c0483a' }}>Publications</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Immunology of Psoriasis',
                journal: 'Annual Review of Immunology',
                year: '2014',
                citations: '1,627',
                theme: 'Psoriasis',
                color: '#c0483a',
              },
              {
                title: 'Dupilumab treatment in adults with moderate-to-severe atopic dermatitis',
                journal: 'New England Journal of Medicine',
                year: '2014',
                citations: '1,425',
                theme: 'Atopic Dermatitis',
                color: '#2c9e8c',
              },
              {
                title: 'Progressive activation of TH2/TH22 cytokines and selective epidermal proteins characterizes acute and chronic atopic dermatitis',
                journal: 'Journal of Allergy and Clinical Immunology',
                year: '2012',
                citations: '942',
                theme: 'Immunology',
                color: '#d4961a',
              },
            ].map((pub, i) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                style={{ background: 'white', border: '1px solid #e8ddd5', boxShadow: '0 2px 12px rgba(100,80,60,0.06)' }}
                whileHover={{ boxShadow: '0 8px 30px rgba(100,80,60,0.12)' }}
              >
                {/* Colored top accent bar */}
                <div style={{ height: '4px', background: pub.color }} />

                <div style={{ padding: '20px 22px' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full text-white"
                      style={{ backgroundColor: pub.color }}
                    >
                      {pub.theme}
                    </span>
                    <span className="text-xs font-medium" style={{ color: '#a09080' }}>{pub.year}</span>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug mb-3" style={{ color: '#2a1f1a' }}>
                    {pub.title}
                  </h3>
                  <p className="text-xs italic mb-3" style={{ color: '#8b7b6b' }}>
                    {pub.journal}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold" style={{ color: pub.color }}>{pub.citations}</span>
                    <span className="text-xs uppercase tracking-wider" style={{ color: '#a09080' }}>citations</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA to Research page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
            style={{ marginTop: '30px' }}
          >
            <a
              href="#/research"
              className="inline-block font-semibold transition-all duration-300 hover:scale-105"
              style={{ padding: '14px 40px', fontSize: '16px', borderRadius: '9999px', backgroundColor: '#c0483a', color: 'white', textDecoration: 'none', letterSpacing: '0.04em' }}
            >
              Explore Our Research →
            </a>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
