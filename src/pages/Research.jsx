import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const researchAreas = [
  {
    title: 'Systems Biology of Immune-Mediated Diseases',
    subtitle: 'Molecular maps of psoriasis, atopic dermatitis & beyond',
    color: '#c0483a',
    description: 'We established integrative computational frameworks to dissect immune-mediated skin diseases. Our cross-study meta-analytic approaches generated the first robust molecular maps of psoriasis and atopic dermatitis, identifying key pathways like IL-17/TNF in psoriasis and Th2-driven inflammation in AD — directly supporting targeted biologic development.',
    questions: [
      'Can early molecular changes forecast long-term treatment outcomes?',
      'How does disease heterogeneity across IgE status, age, and ethnicity define treatment endotypes?',
      'What is the "molecular scar" — persistent inflammatory pathways after treatment?',
    ],
    methods: ['Transcriptomics', 'Meta-Analysis', 'Mixed-Effects Models', 'Genomic Biomarkers'],
    keyPaper: { title: 'Immunology of Psoriasis', citations: '1,627' },
    projects: [
      { name: 'Treatment-Agnostic Universal Predictor', status: 'Ongoing', desc: 'Validated predictor of long-term treatment outcomes across cohorts and diseases' },
      { name: 'Ethnic Endotype Mapping', status: 'Ongoing', desc: 'Characterizing immune signatures across IgE status, age, and ethnicity in AD' },
      { name: 'Molecular Scar Analysis', status: 'Ongoing', desc: 'Identifying persistent inflammatory pathways after biologic treatment' },
    ],
  },
  {
    title: 'Food Allergy Diagnostics',
    subtitle: 'Epitope-resolved precision diagnostics',
    color: '#6a7fa8',
    description: 'In collaboration with Dr. Hugh Sampson, we developed the bead-based epitope assay (BBEA) — a high-throughput platform for profiling allergen-specific antibody responses. Our ML approaches identify predictive signatures of allergy reactivity, severity, and response to oral immunotherapy, consistently outperforming traditional serum IgE biomarkers.',
    questions: [
      'Can epitope-resolved profiling predict food allergy severity and natural resolution?',
      'How do immune trajectories during early allergen exposure drive tolerance?',
      'Can we improve upon oral food challenge with computational diagnostics?',
    ],
    methods: ['BBEA Platform', 'Machine Learning', 'Longitudinal Modeling', 'bbeaR Package'],
    keyPaper: { title: 'Epitope-based diagnostic for peanut allergy', citations: '200+' },
    projects: [
      { name: 'Commercial Peanut Allergy Test', status: 'Completed', desc: 'Diagnostic test improving upon oral food challenge — now commercially available' },
      { name: 'LEAP Study Analysis', status: 'Completed', desc: 'Longitudinal epitope-specific immune trajectories during early allergen exposure' },
      { name: 'Basophil Activation Integration', status: 'Ongoing', desc: 'Integrating basophil activation assays with ML for enhanced diagnostics' },
    ],
  },
  {
    title: 'Digital Health & Wearables',
    subtitle: 'Extracting clinical signals from continuous wearable data',
    color: '#2c9e8c',
    description: 'We develop statistical and ML methods to extract clinically meaningful signals from wearable devices. Our Warrior Watch study demonstrated that wearable-derived signals can detect early, asymptomatic SARS-CoV-2 infection. We integrate wearable data with causal inference to identify mechanistic relationships in IBD and rheumatoid arthritis.',
    questions: [
      'Can wearables detect disease flares before clinical symptoms appear?',
      'What is the causal link between sleep disruption and inflammatory activity?',
      'How can transformer-based models capture complex temporal dependencies?',
    ],
    methods: ['Cosinor Mixed-Effects', 'Transformers', 'Causal Inference', 'CosinorRMixedEffect R Package'],
    keyPaper: { title: 'Warrior Watch: Wearable detection of SARS-CoV-2', citations: '150+' },
    projects: [
      { name: 'IBD Wearable Monitoring', status: 'Ongoing', desc: 'Real-time disease activity monitoring through wearable-derived biomarkers' },
      { name: 'Sleep-Inflammation Causal Model', status: 'Ongoing', desc: 'Causal framework linking sleep disruption to inflammatory activity in IBD' },
    ],
  },
  {
    title: 'Inflammatory Bowel Disease & Multi-Omics',
    subtitle: 'Molecular inflammation scores and spatial biology',
    color: '#d4961a',
    description: 'We developed molecular inflammation scores from transcriptomic data in biopsies (bMIS) and blood (cirMIS) that outperform traditional clinical and histological indices. Through integration of bulk and single-cell transcriptomics, CyTOF, microbiome, and spatial data, we define immune and epithelial programs driving IBD.',
    questions: [
      'Can molecular inflammation scores replace invasive clinical endpoints?',
      'How does GALT attrition determine therapeutic response?',
      'What drives the plasmablast-skewed humoral response in active disease?',
    ],
    methods: ['scRNA-seq', 'CyTOF', 'Spatial Transcriptomics', 'Microbiome Analysis', 'bMIS/cirMIS'],
    keyPaper: { title: 'Molecular inflammation scores in IBD (Nature Medicine)', citations: '100+' },
    projects: [
      { name: 'Spatial IBD Atlas', status: 'Ongoing', desc: 'Spatial transcriptomic mapping of immune programs along the GI tract' },
      { name: 'cirMIS Blood Biomarker', status: 'Ongoing', desc: 'Non-invasive blood-based molecular inflammation scoring for IBD monitoring' },
    ],
  },
  {
    title: 'Biostatistics & AI Methods',
    subtitle: 'Causal inference meets machine learning',
    color: '#8b5c4a',
    description: 'We develop statistical and computational methods for high-dimensional biomedical data. From early meta-analysis frameworks and the TGDR algorithm to modern transformer-based causal architectures, our work ensures ML models are not only predictive but also causal, mechanistically informative, and clinically actionable.',
    questions: [
      'How can we integrate causal inference with ML for actionable clinical insights?',
      'Can transformer architectures improve treatment effect estimation?',
      'How do we ensure ML models generalize across populations?',
    ],
    methods: ['Causal Inference', 'TMLE', 'Instrumental Variables', 'Transformers', 'Meta-TGDR'],
    keyPaper: { title: 'TGDR: Threshold Gradient Descent Regularization', citations: '300+' },
    projects: [
      { name: 'Causal ML for CPAP in OSA', status: 'Ongoing', desc: 'Identifying heterogeneous treatment effects of CPAP using causal frameworks' },
      { name: 'Transformer Causal Estimation', status: 'Ongoing', desc: 'Transformer-based architectures for robust treatment effect estimation' },
      { name: 'Harshlight & bbeaR Packages', status: 'Completed', desc: 'R packages for microarray artifact detection and epitope data analysis' },
    ],
  },
]

const bookStyles = {
  cuban: {
    cover: '#8b3028',
    pageBg: '#faf5ed',
    pageAccent: '#f2ebe0',
    spine: '#5a1f18',
    titleFont: '"Playfair Display", Georgia, serif',
    bodyFont: 'Georgia, serif',
    titleColor: '#3a1a10',
    bodyColor: '#4a3020',
    accentColor: '#c0483a',
    borderDecor: 'cuban',
    paperTexture: true,
  },
}

function CubanBorder({ color = '#c0483a' }) {
  // Authentic Cuban hydraulic tile border — interlocking arcs and petals
  const tileW = 32
  const tiles = 25
  const h = 28
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${tileW * tiles} ${h}`} preserveAspectRatio="none" style={{ opacity: 0.35 }}>
      <defs>
        <pattern id="cubanTile" x="0" y="0" width={tileW} height={h} patternUnits="userSpaceOnUse">
          {/* Background */}
          <rect width={tileW} height={h} fill="#f5ebe0" opacity="0.5" />
          {/* 8-pointed star motif using overlapping shapes */}
          {/* Center diamond */}
          <polygon points={`${tileW/2},2 ${tileW-2},${h/2} ${tileW/2},${h-2} 2,${h/2}`} fill={color} opacity="0.6" />
          {/* Petal arcs — top */}
          <path d={`M ${tileW/2 - 6} 0 Q ${tileW/2} ${h/2 - 4} ${tileW/2 + 6} 0`} fill="#2c9e8c" opacity="0.5" />
          {/* Petal arcs — bottom */}
          <path d={`M ${tileW/2 - 6} ${h} Q ${tileW/2} ${h/2 + 4} ${tileW/2 + 6} ${h}`} fill="#2c9e8c" opacity="0.5" />
          {/* Petal arcs — left */}
          <path d={`M 0 ${h/2 - 5} Q ${tileW/2 - 4} ${h/2} 0 ${h/2 + 5}`} fill="#d4961a" opacity="0.45" />
          {/* Petal arcs — right */}
          <path d={`M ${tileW} ${h/2 - 5} Q ${tileW/2 + 4} ${h/2} ${tileW} ${h/2 + 5}`} fill="#d4961a" opacity="0.45" />
          {/* Inner star — smaller rotated square */}
          <polygon points={`${tileW/2},${h/2 - 5} ${tileW/2 + 5},${h/2} ${tileW/2},${h/2 + 5} ${tileW/2 - 5},${h/2}`} fill="#faf5ed" opacity="0.7" />
          {/* Center dot */}
          <circle cx={tileW/2} cy={h/2} r="2" fill={color} opacity="0.5" />
          {/* Corner accents */}
          <circle cx="0" cy="0" r="3" fill={color} opacity="0.25" />
          <circle cx={tileW} cy="0" r="3" fill={color} opacity="0.25" />
          <circle cx="0" cy={h} r="3" fill={color} opacity="0.25" />
          <circle cx={tileW} cy={h} r="3" fill={color} opacity="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height={h} fill="url(#cubanTile)" />
      {/* Top and bottom border lines */}
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="0" y1={h - 0.5} x2="100%" y2={h - 0.5} stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

function IndexSpread({ areas, onGoTo, style: bookStyle }) {
  const s = bookStyles[bookStyle]
  return (
    <div className="flex" style={{ width: '100%', height: '100%' }}>
      {/* LEFT — Title page */}
      <div className="w-1/2 relative overflow-hidden flex flex-col items-center justify-center"
        style={{ background: s.pageBg, borderRight: '1px solid rgba(0,0,0,0.08)', boxShadow: 'inset -8px 0 15px rgba(0,0,0,0.03)' }}
      >
        {s.paperTexture && <div className="absolute inset-0 pointer-events-none" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\' fill=\'%23000000\' fill-opacity=\'0.02\'/%3E%3C/svg%3E")', opacity: 0.5 }} />}
        {s.borderDecor === 'cuban' && <div className="absolute top-0 left-0 right-0"><CubanBorder /></div>}
        {s.borderDecor === 'cuban' && <div className="absolute bottom-0 left-0 right-0"><CubanBorder /></div>}

        <div className="relative z-10 text-center" style={{ padding: '40px' }}>
          <div style={{ width: '60px', height: '2px', background: '#c0483a', margin: '0 auto 20px', borderRadius: '1px' }} />
          <p style={{ fontFamily: s.bodyFont, color: '#a09080', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Suárez-Fariñas Lab
          </p>
          <h2 style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '32px', lineHeight: '1.2', marginBottom: '10px' }}>
            Research
          </h2>
          <h2 style={{ fontFamily: s.titleFont, color: '#c0483a', fontSize: '32px', fontStyle: 'italic', lineHeight: '1.2', marginBottom: '20px' }}>
            Journal
          </h2>
          <p style={{ fontFamily: s.bodyFont, color: s.bodyColor, fontSize: '12px', lineHeight: '1.7', maxWidth: '220px', margin: '0 auto' }}>
            Computational Biology &amp; Systems Immunology at Mount Sinai
          </p>
          <div style={{ width: '60px', height: '2px', background: '#c0483a', margin: '24px auto 0', borderRadius: '1px' }} />
        </div>
      </div>

      {/* RIGHT — Table of Contents */}
      <div className="w-1/2 relative overflow-hidden"
        style={{ background: s.pageAccent, boxShadow: 'inset 8px 0 15px rgba(0,0,0,0.03)' }}
      >
        {s.paperTexture && <div className="absolute inset-0 pointer-events-none" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\' fill=\'%23000000\' fill-opacity=\'0.02\'/%3E%3C/svg%3E")', opacity: 0.5 }} />}
        {s.borderDecor === 'cuban' && <div className="absolute top-0 left-0 right-0"><CubanBorder /></div>}
        {s.borderDecor === 'cuban' && <div className="absolute bottom-0 left-0 right-0"><CubanBorder /></div>}

        <div className="relative z-10" style={{ padding: '60px 40px' }}>
          <h3 style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '18px', marginBottom: '8px' }}>
            Table of Contents
          </h3>
          <div style={{ width: '40px', height: '2px', background: '#c0483a', marginBottom: '36px', borderRadius: '1px' }} />

          {areas.map((area, i) => (
            <div
              key={i}
              onClick={() => onGoTo(i + 1)}
              className="transition-all duration-200"
              style={{ marginBottom: '28px', cursor: 'pointer', paddingLeft: '12px', borderLeft: `3px solid transparent` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = area.color; e.currentTarget.style.paddingLeft = '16px' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = 'transparent'; e.currentTarget.style.paddingLeft = '12px' }}
            >
              <div className="flex items-baseline justify-between" style={{ marginBottom: '4px' }}>
                <p style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '15px', fontWeight: '600' }}>
                  {area.title}
                </p>
                <span style={{ fontFamily: s.bodyFont, color: '#a09080', fontSize: '12px', marginLeft: '12px' }}>
                  {(i + 1) * 2 - 1}
                </span>
              </div>
              <p style={{ fontFamily: s.bodyFont, color: area.color, fontSize: '11px', fontStyle: 'italic' }}>
                {area.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Page number */}
        <p className="absolute right-10" style={{ bottom: '38px', color: 'rgba(0,0,0,0.25)', fontSize: '11px', fontFamily: s.bodyFont, zIndex: 5 }}>
          ii
        </p>
      </div>
    </div>
  )
}

function BookSpread({ area, pageNum, totalPages, style: bookStyle }) {
  const s = bookStyles[bookStyle]

  return (
    <div className="flex" style={{ width: '100%', height: '100%' }}>
      {/* LEFT PAGE */}
      <div
        className="w-1/2 relative overflow-hidden"
        style={{
          background: s.pageBg,
          padding: '40px 35px 40px 45px',
          borderRight: `1px solid rgba(0,0,0,0.08)`,
          boxShadow: 'inset -8px 0 15px rgba(0,0,0,0.03)',
        }}
      >
        {/* Paper texture overlay */}
        {s.paperTexture && (
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\' fill=\'%23000000\' fill-opacity=\'0.02\'/%3E%3C/svg%3E")', opacity: 0.5 }} />
        )}

        {/* Cuban decorative border */}
        {s.borderDecor === 'cuban' && (
          <div className="absolute top-0 left-0 right-0">
            <CubanBorder color={area.color} />
          </div>
        )}

        <div className="relative z-10">
          {/* Chapter number */}
          <p style={{ color: area.color, fontSize: '11px', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Chapter {pageNum}
          </p>

          {/* Title */}
          <h2 style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '26px', lineHeight: '1.3', marginBottom: '6px' }}>
            {area.title}
          </h2>
          <p style={{ fontFamily: s.bodyFont, color: area.color, fontSize: '13px', fontStyle: 'italic', marginBottom: '24px' }}>
            {area.subtitle}
          </p>

          {/* Description */}
          <p style={{ fontFamily: s.bodyFont, color: s.bodyColor, fontSize: '13px', lineHeight: '1.8', marginBottom: '28px' }}>
            {area.description}
          </p>

          {/* Key Questions */}
          <h3 style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
            Key Questions
          </h3>
          {area.questions.map((q, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{ color: area.color, fontWeight: 'bold', fontSize: '14px', lineHeight: '1.4', width: '16px', flexShrink: 0, textAlign: 'center' }}>•</span>
              <p style={{ fontFamily: s.bodyFont, color: s.bodyColor, fontSize: '12px', lineHeight: '1.6', flex: 1 }}>{q}</p>
            </div>
          ))}
        </div>

        {/* Page number */}
        <p className="absolute left-10" style={{ bottom: '38px', color: 'rgba(0,0,0,0.25)', fontSize: '11px', fontFamily: s.bodyFont, zIndex: 5 }}>
          {pageNum * 2 - 1}
        </p>

        {/* Cuban bottom border */}
        {s.borderDecor === 'cuban' && (
          <div className="absolute bottom-0 left-0 right-0">
            <CubanBorder color={area.color} />
          </div>
        )}
      </div>

      {/* RIGHT PAGE */}
      <div
        className="w-1/2 relative overflow-hidden"
        style={{
          background: s.pageAccent,
          padding: '40px 45px 40px 35px',
          boxShadow: 'inset 8px 0 15px rgba(0,0,0,0.03)',
        }}
      >
        {s.paperTexture && (
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\' fill=\'%23000000\' fill-opacity=\'0.02\'/%3E%3C/svg%3E")', opacity: 0.5 }} />
        )}

        {s.borderDecor === 'cuban' && (
          <div className="absolute top-0 left-0 right-0">
            <CubanBorder color={area.color} />
          </div>
        )}

        <div className="relative z-10">
          {/* Methods */}
          <h3 style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
            Methods & Tools
          </h3>
          <div className="flex flex-wrap gap-2" style={{ marginBottom: '20px' }}>
            {area.methods.map((m) => (
              <span key={m} style={{
                padding: '4px 10px', fontSize: '10px', borderRadius: '9999px',
                backgroundColor: `${area.color}15`, color: area.color,
                border: `1px solid ${area.color}30`, fontWeight: '500',
              }}>
                {m}
              </span>
            ))}
          </div>

          {/* Active Projects */}
          <h3 style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
            Active Projects
          </h3>
          <div style={{ marginBottom: '20px' }}>
            {area.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: `3px solid ${proj.status === 'Ongoing' ? area.color : '#c8b8a8'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <p style={{ fontFamily: s.bodyFont, color: s.titleColor, fontSize: '13px', fontWeight: '600' }}>
                    {proj.name}
                  </p>
                  <span style={{
                    padding: '2px 8px', fontSize: '9px', borderRadius: '9999px',
                    background: proj.status === 'Ongoing' ? `${area.color}20` : 'rgba(0,0,0,0.05)',
                    color: proj.status === 'Ongoing' ? area.color : '#a09080',
                    fontWeight: '600',
                  }}>
                    {proj.status}
                  </span>
                </div>
                <p style={{ fontFamily: s.bodyFont, color: s.bodyColor, fontSize: '12px', lineHeight: '1.6' }}>
                  {proj.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Key Paper */}
          <h3 style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
            Featured Publication
          </h3>
          <div style={{
            padding: '12px 14px', borderRadius: '8px', background: 'white',
            border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}>
            <p style={{ fontFamily: s.bodyFont, color: s.titleColor, fontSize: '11px', fontWeight: '600', lineHeight: '1.4', marginBottom: '6px' }}>
              {area.keyPaper.title}
            </p>
            <div className="flex items-center gap-2">
              <span style={{ color: area.color, fontSize: '14px', fontWeight: 'bold' }}>{area.keyPaper.citations}</span>
              <span style={{ color: '#a09080', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>citations</span>
            </div>
          </div>

        </div>

        {/* Page number */}
        <p className="absolute right-10" style={{ bottom: '38px', color: 'rgba(0,0,0,0.25)', fontSize: '11px', fontFamily: s.bodyFont, zIndex: 5 }}>
          {pageNum * 2}
        </p>

        {s.borderDecor === 'cuban' && (
          <div className="absolute bottom-0 left-0 right-0">
            <CubanBorder color={area.color} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Research() {
  const [currentPage, setCurrentPage] = useState(0)
  const bookStyle = 'cuban'
  const s = bookStyles[bookStyle]

  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDir, setFlipDir] = useState(0)

  const [nextPageTarget, setNextPageTarget] = useState(0)

  const doFlip = (dir) => {
    if (isFlipping) return
    const next = currentPage + dir
    const totalPages = researchAreas.length + 1
    if (next < 0 || next >= totalPages) return
    setFlipDir(dir)
    setNextPageTarget(next)
    setIsFlipping(true)
  }

  // Called when flip animation completes via onAnimationComplete
  const onFlipDone = () => {
    setCurrentPage(nextPageTarget)
    // Small delay to ensure React renders the new currentPage before removing overlay
    requestAnimationFrame(() => {
      setIsFlipping(false)
    })
  }

  const goNext = () => doFlip(1)
  const goPrev = () => doFlip(-1)

  const totalPages = researchAreas.length + 1
  // Current and next spread data (page 0 = index, 1-3 = research areas)
  const currentArea = currentPage > 0 ? researchAreas[currentPage - 1] : null
  const nextPageIdx = currentPage + flipDir
  const nextArea = nextPageIdx > 0 && nextPageIdx <= researchAreas.length ? researchAreas[nextPageIdx - 1] : null

  const goToPage = (page) => {
    if (isFlipping || page === currentPage) return
    doFlip(page > currentPage ? 1 : -1)
    // For multi-page jumps, we'd need sequential flips — for now just go one step
  }

  return (
    <div style={{ background: '#e8e0d5', minHeight: '100vh', paddingTop: '110px', paddingBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      {/* Title */}
      <div className="max-w-4xl mx-auto text-center" style={{ marginBottom: '30px', padding: '0 20px' }}>
        <p style={{ color: '#8b7b6b', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
          What We Study
        </p>
        <h1 style={{ color: '#2a1f1a', fontSize: '32px', fontFamily: 'var(--font-display)' }}>
          Research <span style={{ fontStyle: 'italic', color: '#c0483a' }}>Journal</span>
        </h1>
      </div>

      {/* Book */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '80vw', padding: '0', perspective: '1800px' }}
      >
        <div style={{ position: 'relative', height: 'calc(100vh - 200px)', minHeight: '500px', maxHeight: '750px' }}>


          {/* Stacked pages — visible on left and right outer edges */}
          {[8, 7, 6, 5, 4, 3, 2, 1].map((i) => (
            <div
              key={`page-${i}`}
              className="absolute"
              style={{
                top: `${i * 1}px`,
                left: `${-i * 1.5}px`,
                right: `${-i * 1.5}px`,
                height: '100%',
                borderRadius: '6px 14px 14px 6px',
                background: `hsl(35, ${18 - i}%, ${97 - i * 1.2}%)`,
                boxShadow: i === 5 ? '0 20px 60px rgba(0,0,0,0.2)' : `0 ${i * 0.5}px ${i}px rgba(0,0,0,0.03)`,
                borderLeft: `1px solid rgba(160, 140, 120, ${0.08 + i * 0.03})`,
                borderRight: `1px solid rgba(160, 140, 120, ${0.08 + i * 0.03})`,
                borderBottom: `1px solid rgba(160, 140, 120, ${0.05 + i * 0.02})`,
              }}
            />
          ))}

          {/* Main book (top page) */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              borderRadius: '4px 14px 14px 4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              height: '100%',
              background: s.pageBg,
              overflow: 'hidden',
              zIndex: 5,
            }}
          >
          {/* Spine line */}
          <div className="absolute top-0 bottom-0" style={{ left: '50%', width: '6px', marginLeft: '-3px', background: `linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.03), rgba(0,0,0,0.1))`, zIndex: 20 }} />

          {/* Page holes + Spiral coil */}
          {(() => {
            const loops = 45
            const spacing = 27
            const startY = 18
            const holeR = 4 // hole radius in pages
            const coilR = 10 // how far the coil loops out
            const bookW = 900 // approximate book width (will use %)
            const spineX = 50 // percentage from left

            return (
              <>
                {/* Holes punched in LEFT page */}
                <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `calc(50% - ${holeR + 8}px)`, width: `${holeR * 2 + 4}px`, zIndex: 22 }}>
                  {Array.from({ length: loops }).map((_, i) => {
                    const totalH = startY + loops * spacing + 20
                    const pct = ((startY + i * spacing - holeR) / totalH) * 100
                    return (
                    <div key={`hl${i}`} className="absolute" style={{
                      top: `${pct}%`,
                      left: '0',
                      width: `${holeR * 2 + 4}px`,
                      height: `${holeR * 2}px`,
                    }}>
                      <div style={{
                        width: `${holeR * 2}px`, height: `${holeR * 2}px`,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 40% 40%, #d8d0c8, #b8b0a5)',
                        boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.25), inset -0.5px -0.5px 1px rgba(255,255,255,0.3)',
                        border: '0.5px solid rgba(0,0,0,0.1)',
                      }} />
                    </div>
                    )
                  })}
                </div>

                {/* Holes punched in RIGHT page */}
                <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `calc(50% + ${4}px)`, width: `${holeR * 2 + 4}px`, zIndex: 22 }}>
                  {Array.from({ length: loops }).map((_, i) => {
                    const totalH = startY + loops * spacing + 20
                    const pct = ((startY + i * spacing - holeR) / totalH) * 100
                    return (
                    <div key={`hr${i}`} className="absolute" style={{
                      top: `${pct}%`,
                      left: '0',
                      width: `${holeR * 2 + 4}px`,
                      height: `${holeR * 2}px`,
                    }}>
                      <div style={{
                        width: `${holeR * 2}px`, height: `${holeR * 2}px`,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 40% 40%, #d8d0c8, #b8b0a5)',
                        boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.25), inset -0.5px -0.5px 1px rgba(255,255,255,0.3)',
                        border: '0.5px solid rgba(0,0,0,0.1)',
                      }} />
                    </div>
                    )
                  })}
                </div>

                {/* The coil wire — SVG overlay */}
                <svg
                  className="absolute pointer-events-none"
                  style={{ left: 'calc(50% - 20px)', top: '0', width: '40px', height: '100%', zIndex: 30 }}
                  viewBox={`0 0 40 ${startY + loops * spacing + 20}`}
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="coilMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a09488" />
                      <stop offset="30%" stopColor="#c8bcb0" />
                      <stop offset="50%" stopColor="#d8cec2" />
                      <stop offset="70%" stopColor="#c0b4a8" />
                      <stop offset="100%" stopColor="#908478" />
                    </linearGradient>
                  </defs>

                  {/* One continuous wire path */}
                  {Array.from({ length: loops }).map((_, i) => {
                    const y = startY + i * spacing
                    const ny = y + spacing
                    const cx = 20 // center of SVG
                    const holeLeft = 12 // CSS hole center: 50% - 8px → SVG x=12
                    const holeRight = 28 // CSS hole center: 50% + 8px → SVG x=28

                    return (
                      <g key={`coil${i}`}>
                        {/* Wire behind pages: from right hole going down to left hole of next loop */}
                        {i < loops - 1 && (
                          <line
                            x1={holeRight} y1={y + 1}
                            x2={holeLeft} y2={ny - 1}
                            stroke="#8a7e74" strokeWidth="1.8" opacity="0.25"
                          />
                        )}

                        {/* Shadow of front loop */}
                        <path
                          d={`M ${holeLeft} ${y} C ${holeLeft - coilR} ${y}, ${holeLeft - coilR} ${y}, ${cx} ${y - coilR - 2} C ${holeRight + coilR} ${y}, ${holeRight + coilR} ${y}, ${holeRight} ${y}`}
                          stroke="rgba(0,0,0,0.08)" strokeWidth="4"
                          transform="translate(1, 2)"
                        />

                        {/* Front loop: wire comes out left hole → loops outward (upward) → enters right hole */}
                        <path
                          d={`M ${holeLeft} ${y} C ${holeLeft - coilR} ${y - 4}, ${holeLeft - coilR} ${y - coilR}, ${cx} ${y - coilR - 2} C ${holeRight + coilR} ${y - coilR}, ${holeRight + coilR} ${y - 4}, ${holeRight} ${y}`}
                          stroke="url(#coilMetal)" strokeWidth="2.5" strokeLinecap="round"
                        />

                        {/* Shine highlight */}
                        <path
                          d={`M ${holeLeft + 2} ${y - 1} C ${holeLeft - coilR + 3} ${y - 5}, ${holeLeft - coilR + 3} ${y - coilR + 2}, ${cx} ${y - coilR}`}
                          stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"
                        />
                      </g>
                    )
                  })}
                </svg>
              </>
            )
          })()}

          {/* Layer 1: Current page */}
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            {(() => {
              const idx = currentPage
              const area = idx > 0 ? researchAreas[idx - 1] : null
              if (idx === 0) return <IndexSpread areas={researchAreas} onGoTo={goToPage} style={bookStyle} />
              if (area) return <BookSpread area={area} pageNum={idx} totalPages={researchAreas.length} style={bookStyle} />
              return null
            })()}
          </div>

          {/* During flip: cover left half with old page's left side so it doesn't change */}
          {isFlipping && (
            <>
              {/* Target page underneath (revealed as flip moves) */}
              <div className="absolute inset-0" style={{ zIndex: 2 }}>
                {(() => {
                  const idx = nextPageTarget
                  const area = idx > 0 ? researchAreas[idx - 1] : null
                  if (idx === 0) return <IndexSpread areas={researchAreas} onGoTo={goToPage} style={bookStyle} />
                  if (area) return <BookSpread area={area} pageNum={idx} totalPages={researchAreas.length} style={bookStyle} />
                  return null
                })()}
              </div>
              {/* Cover the side that shouldn't change during flip */}
              {flipDir === 1 ? (
                /* Going forward: freeze the LEFT page (old content) */
                <div className="absolute top-0 bottom-0 left-0" style={{ width: '50%', zIndex: 14, overflow: 'hidden' }}>
                  <div style={{ width: '200%', height: '100%' }}>
                    {(() => {
                      const idx = currentPage
                      const area = idx > 0 ? researchAreas[idx - 1] : null
                      if (idx === 0) return <IndexSpread areas={researchAreas} onGoTo={goToPage} style={bookStyle} />
                      if (area) return <BookSpread area={area} pageNum={idx} totalPages={researchAreas.length} style={bookStyle} />
                      return null
                    })()}
                  </div>
                </div>
              ) : (
                /* Going backward: freeze the RIGHT page (old content) */
                <div className="absolute top-0 bottom-0 right-0" style={{ width: '50%', zIndex: 14, overflow: 'hidden' }}>
                  <div style={{ width: '200%', height: '100%', marginLeft: '-100%' }}>
                    {(() => {
                      const idx = currentPage
                      const area = idx > 0 ? researchAreas[idx - 1] : null
                      if (idx === 0) return <IndexSpread areas={researchAreas} onGoTo={goToPage} style={bookStyle} />
                      if (area) return <BookSpread area={area} pageNum={idx} totalPages={researchAreas.length} style={bookStyle} />
                      return null
                    })()}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Flipping page — the right page that turns over */}
          {isFlipping && flipDir === 1 && (
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -180 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              onAnimationComplete={onFlipDone}
              className="absolute top-0 bottom-0"
              style={{
                right: 0,
                width: '50%',
                zIndex: 15,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Front of flipping page (current right page) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  background: s.pageAccent,
                  borderLeft: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '-5px 0 20px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ padding: '40px 45px 40px 35px' }}>
                  {currentArea ? (
                    <>
                      <p style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px' }}>
                        Methods & Tools
                      </p>
                      <div className="flex flex-wrap gap-2" style={{ marginBottom: '24px' }}>
                        {currentArea.methods.map((m) => (
                          <span key={m} style={{
                            padding: '5px 12px', fontSize: '11px', borderRadius: '9999px',
                            backgroundColor: `${currentArea.color}15`, color: currentArea.color,
                            border: `1px solid ${currentArea.color}30`,
                          }}>{m}</span>
                        ))}
                      </div>
                      <p style={{ fontFamily: s.bodyFont, color: s.bodyColor, fontSize: '13px', lineHeight: '1.7' }}>
                        {currentArea.description.slice(0, 120)}...
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p style={{ fontFamily: s.bodyFont, color: '#a09080', fontSize: '13px', fontStyle: 'italic' }}>
                        Table of Contents
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Back of flipping page (shows as it turns) */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: `linear-gradient(to right, ${s.pageBg}, ${s.pageAccent})`,
                  boxShadow: '5px 0 20px rgba(0,0,0,0.15)',
                }}
              />
            </motion.div>
          )}

          {/* Flipping page — going backward */}
          {isFlipping && flipDir === -1 && (
            <motion.div
              initial={{ rotateY: -180 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              onAnimationComplete={onFlipDone}
              className="absolute top-0 bottom-0"
              style={{
                right: 0,
                width: '50%',
                zIndex: 15,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Front — the previous right page being revealed */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  background: s.pageAccent,
                  borderLeft: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '-5px 0 20px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ padding: '40px 45px 40px 35px' }}>
                  {nextArea ? (
                    <>
                      <p style={{ fontFamily: s.titleFont, color: s.titleColor, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px' }}>
                        Methods & Tools
                      </p>
                      <div className="flex flex-wrap gap-2" style={{ marginBottom: '24px' }}>
                        {nextArea.methods.map((m) => (
                          <span key={m} style={{
                            padding: '5px 12px', fontSize: '11px', borderRadius: '9999px',
                            backgroundColor: `${nextArea.color}15`, color: nextArea.color,
                            border: `1px solid ${nextArea.color}30`,
                          }}>{m}</span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p style={{ fontFamily: s.bodyFont, color: '#a09080', fontSize: '13px', fontStyle: 'italic' }}>
                        Table of Contents
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: `linear-gradient(to left, ${s.pageBg}, ${s.pageAccent})`,
                  boxShadow: '5px 0 20px rgba(0,0,0,0.15)',
                }}
              />
            </motion.div>
          )}

        </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center" style={{ marginTop: '24px', padding: '0 10px' }}>
          <button
            onClick={goPrev}
            disabled={currentPage === 0 || isFlipping}
            className="transition-all duration-200"
            style={{
              padding: '10px 24px', fontSize: '13px', borderRadius: '9999px',
              background: currentPage === 0 ? '#d0c8c0' : '#c0483a',
              color: 'white', border: 'none', cursor: currentPage === 0 ? 'default' : 'pointer',
              opacity: currentPage === 0 || isFlipping ? 0.4 : 1,
            }}
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: i === currentPage ? '#c0483a' : '#c8b8a8',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className="transition-all duration-200"
            style={{
              padding: '10px 24px', fontSize: '13px', borderRadius: '9999px',
              background: currentPage === totalPages - 1 ? '#d0c8c0' : '#c0483a',
              color: 'white', border: 'none',
              cursor: currentPage === totalPages - 1 ? 'default' : 'pointer',
              opacity: currentPage === totalPages - 1 || isFlipping ? 0.4 : 1,
            }}
          >
            Next →
          </button>
        </div>
      </motion.div>
    </div>
  )
}
