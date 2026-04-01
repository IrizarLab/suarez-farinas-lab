import { useState } from 'react'
import { motion } from 'framer-motion'

function CubanTilePattern({ opacity = 0.08 }) {
  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity }}>
      <defs>
        <pattern id="cubanBg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="20,2 38,20 20,38 2,20" fill="#c0483a" opacity="0.3" />
          <polygon points="20,8 32,20 20,32 8,20" fill="none" stroke="#c0483a" strokeWidth="0.5" opacity="0.3" />
          <circle cx="20" cy="20" r="2" fill="#d4961a" opacity="0.3" />
          <circle cx="0" cy="0" r="2" fill="#2c9e8c" opacity="0.2" />
          <circle cx="40" cy="0" r="2" fill="#2c9e8c" opacity="0.2" />
          <circle cx="0" cy="40" r="2" fill="#2c9e8c" opacity="0.2" />
          <circle cx="40" cy="40" r="2" fill="#2c9e8c" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cubanBg)" />
    </svg>
  )
}

function Stamp() {
  return (
    <div style={{
      width: '70px', height: '85px', border: '2px dashed rgba(192,72,58,0.3)',
      borderRadius: '4px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', transform: 'rotate(3deg)',
      background: 'rgba(250,245,237,0.8)',
    }}>
      <div style={{ width: '50px', height: '55px', borderRadius: '2px', overflow: 'hidden',
        background: 'linear-gradient(135deg, #c0483a 0%, #d4961a 50%, #2c9e8c 100%)', opacity: 0.6,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: 'white', fontSize: '8px', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }}>
          MOUNT<br />SINAI<br />NYC
        </span>
      </div>
      <p style={{ fontSize: '6px', color: '#a09080', marginTop: '3px', letterSpacing: '0.1em' }}>CORREO</p>
    </div>
  )
}

function PostmarkCircle() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', top: '15px', right: '90px', opacity: 0.15, transform: 'rotate(-15deg)' }}>
      <circle cx="40" cy="40" r="35" fill="none" stroke="#2a1f1a" strokeWidth="2" />
      <circle cx="40" cy="40" r="28" fill="none" stroke="#2a1f1a" strokeWidth="1" />
      <text x="40" y="28" textAnchor="middle" fill="#2a1f1a" fontSize="7" fontWeight="bold" fontFamily="Georgia, serif">NEW YORK</text>
      <line x1="8" y1="40" x2="72" y2="40" stroke="#2a1f1a" strokeWidth="1" />
      <text x="40" y="47" textAnchor="middle" fill="#2a1f1a" fontSize="8" fontWeight="bold" fontFamily="Georgia, serif">2026</text>
      <text x="40" y="58" textAnchor="middle" fill="#2a1f1a" fontSize="6" fontFamily="Georgia, serif">MOUNT SINAI</text>
    </svg>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, open mailto
    const mailto = `mailto:mayte.suarez-farinas@mssm.edu?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
    window.open(mailto)
    setSent(true)
  }

  return (
    <div style={{ background: '#e8e0d5', minHeight: '100vh', paddingTop: '110px', paddingBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
        style={{ marginBottom: '30px', padding: '0 20px' }}
      >
        <p style={{ color: '#8b7b6b', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
          Get in Touch
        </p>
        <h1 style={{ color: '#2a1f1a', fontSize: '32px', fontFamily: 'var(--font-display)' }}>
          Send Us a <span style={{ fontStyle: 'italic', color: '#c0483a' }}>Postcard</span>
        </h1>
      </motion.div>

      {/* Postcard */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '90vw', maxWidth: '950px',
          background: '#faf5ed',
          borderRadius: '6px',
          boxShadow: '0 15px 50px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          border: '1px solid #e0d5c8',
        }}
      >
        <div className="flex flex-col md:flex-row" style={{ minHeight: '520px' }}>

          {/* LEFT SIDE — Havana illustration / lab info */}
          <div className="w-full md:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5ebe0, #efe5d8)', borderRight: '1px dashed #d0c0b0' }}>
            <CubanTilePattern opacity={0.06} />

            <div className="relative z-10" style={{ padding: '40px 35px' }}>
              {/* Postcard header */}
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#3a1a10', fontSize: '24px', marginBottom: '4px' }}>
                  Suárez-Fariñas Lab
                </h2>
                <p style={{ fontFamily: 'Georgia, serif', color: '#c0483a', fontSize: '13px', fontStyle: 'italic' }}>
                  Computational Biology & Systems Immunology
                </p>
              </div>

              {/* Address */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: '#2a1f1a', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
                  Visit Us
                </h3>
                <div style={{ fontFamily: 'Georgia, serif', color: '#5a4a3a', fontSize: '13px', lineHeight: '1.8' }}>
                  <p>Icahn School of Medicine at Mount Sinai</p>
                  <p>One Gustave L. Levy Place</p>
                  <p>New York, NY 10029</p>
                </div>
              </div>

              {/* Contact details */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: '#2a1f1a', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
                  Email
                </h3>
                <a href="mailto:mayte.suarez-farinas@mssm.edu"
                  style={{ fontFamily: 'Georgia, serif', color: '#c0483a', fontSize: '13px', textDecoration: 'none' }}
                >
                  mayte.suarez-farinas@mssm.edu
                </a>
              </div>

              {/* Departments */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: '#2a1f1a', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
                  Departments
                </h3>
                <div style={{ fontFamily: 'Georgia, serif', color: '#5a4a3a', fontSize: '12px', lineHeight: '1.8' }}>
                  <p>Population Health Science & Policy</p>
                  <p>Genetics & Genomic Sciences</p>
                  <p>AI & Human Health</p>
                </div>
              </div>

              {/* Academic links */}
              <div>
                <h3 style={{ color: '#2a1f1a', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
                  Find Us Online
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=BlGq3e4AAAAJ&hl=en' },
                    { label: 'ORCID', url: 'https://orcid.org/0000-0001-8712-3553' },
                    { label: 'Mount Sinai', url: 'https://profiles.mountsinai.org/mayte-suarez-farinas' },
                  ].map(link => (
                    <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                      style={{
                        padding: '5px 12px', fontSize: '11px', borderRadius: '9999px',
                        background: 'rgba(192,72,58,0.08)', color: '#8b5040',
                        border: '1px solid rgba(192,72,58,0.15)', textDecoration: 'none',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => { e.target.style.background = '#c0483a'; e.target.style.color = 'white' }}
                      onMouseLeave={(e) => { e.target.style.background = 'rgba(192,72,58,0.08)'; e.target.style.color = '#8b5040' }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Message / Form */}
          <div className="w-full md:w-1/2 relative" style={{ background: '#faf5ed' }}>
            {/* Stamp */}
            <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 5 }}>
              <Stamp />
            </div>

            {/* Postmark */}
            <PostmarkCircle />

            {/* Address lines at top */}
            <div style={{ padding: '25px 35px 0', position: 'relative', zIndex: 2 }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#a09080', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '15px' }}>
                To: Suárez-Fariñas Lab
              </p>
            </div>

            {/* Horizontal lines (like a real postcard) */}
            <div style={{ padding: '0 35px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ borderBottom: '1px solid #e0d5c8', marginBottom: '28px' }} />
              ))}
            </div>

            {/* Form */}
            <div style={{ padding: '0 35px 35px' }}>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center" style={{ padding: '40px 0' }}
                >
                  <p style={{ fontSize: '28px', marginBottom: '10px' }}>✉️</p>
                  <p style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#2a1f1a', fontSize: '20px', marginBottom: '8px' }}>
                    Postcard Sent!
                  </p>
                  <p style={{ color: '#8b7b6b', fontSize: '13px' }}>We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-3" style={{ marginBottom: '12px' }}>
                    <input
                      type="text" placeholder="Your Name" required
                      value={formData.name}
                      onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))}
                      style={{
                        flex: 1, padding: '10px 14px', fontSize: '13px', fontFamily: 'Georgia, serif',
                        border: 'none', borderBottom: '1px solid #d0c0b0', background: 'transparent',
                        color: '#2a1f1a', outline: 'none',
                      }}
                      onFocus={(e) => e.target.style.borderBottomColor = '#c0483a'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#d0c0b0'}
                    />
                    <input
                      type="email" placeholder="Email" required
                      value={formData.email}
                      onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
                      style={{
                        flex: 1, padding: '10px 14px', fontSize: '13px', fontFamily: 'Georgia, serif',
                        border: 'none', borderBottom: '1px solid #d0c0b0', background: 'transparent',
                        color: '#2a1f1a', outline: 'none',
                      }}
                      onFocus={(e) => e.target.style.borderBottomColor = '#c0483a'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#d0c0b0'}
                    />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData(d => ({ ...d, subject: e.target.value }))}
                      required
                      style={{
                        width: '100%', padding: '10px 14px', fontSize: '13px', fontFamily: 'Georgia, serif',
                        border: 'none', borderBottom: '1px solid #d0c0b0', background: 'transparent',
                        color: formData.subject ? '#2a1f1a' : '#a09080', outline: 'none', cursor: 'pointer',
                      }}
                    >
                      <option value="" disabled>What brings you here?</option>
                      <option value="Prospective Student">Prospective Student / Postdoc</option>
                      <option value="Collaboration">Research Collaboration</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Media / Speaking">Media / Speaking Request</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <textarea
                      placeholder="Write your message here..."
                      required rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(d => ({ ...d, message: e.target.value }))}
                      style={{
                        width: '100%', padding: '10px 14px', fontSize: '13px', fontFamily: 'Georgia, serif',
                        border: 'none', borderBottom: '1px solid #d0c0b0', background: 'transparent',
                        color: '#2a1f1a', outline: 'none', resize: 'vertical', lineHeight: '1.7',
                      }}
                      onFocus={(e) => e.target.style.borderBottomColor = '#c0483a'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#d0c0b0'}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      padding: '12px 32px', fontSize: '14px', borderRadius: '9999px',
                      background: '#c0483a', color: 'white', border: 'none',
                      cursor: 'pointer', fontWeight: '600', fontFamily: 'Georgia, serif',
                      letterSpacing: '0.05em', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#a83d30'}
                    onMouseLeave={(e) => e.target.style.background = '#c0483a'}
                  >
                    Send Postcard ✉️
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Join the Lab section below */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          width: '90vw', maxWidth: '950px', marginTop: '40px',
          background: 'white', borderRadius: '14px',
          border: '1px solid #e0d5c8', padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        <div className="text-center" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#2a1f1a', fontSize: '24px', marginBottom: '8px' }}>
            Join the <span style={{ fontStyle: 'italic', color: '#c0483a' }}>Lab</span>
          </h2>
          <p style={{ color: '#6b5548', fontSize: '14px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
            We're always looking for motivated researchers who are passionate about
            computational biology, immunology, and data science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              role: 'Postdoctoral Fellows',
              desc: 'Candidates with experience in biostatistics, bioinformatics, or computational biology. Background in inflammatory diseases is a plus.',
              color: '#c0483a',
            },
            {
              role: 'PhD Students',
              desc: 'Students enrolled in biostatistics, genetics, or related programs at Mount Sinai interested in translational research.',
              color: '#2c9e8c',
            },
            {
              role: 'Research Assistants',
              desc: 'Individuals with strong programming skills (R/Python) and interest in genomic data analysis and machine learning.',
              color: '#d4961a',
            },
          ].map((pos, i) => (
            <div key={pos.role} style={{
              padding: '24px', borderRadius: '12px', border: '1px solid #e8ddd5',
              borderTop: `3px solid ${pos.color}`,
            }}>
              <h3 style={{ color: '#2a1f1a', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>
                {pos.role}
              </h3>
              <p style={{ color: '#6b5548', fontSize: '12px', lineHeight: '1.6' }}>
                {pos.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center" style={{ marginTop: '24px', color: '#8b7b6b', fontSize: '13px' }}>
          Send your CV and a brief statement of interest to{' '}
          <a href="mailto:mayte.suarez-farinas@mssm.edu" style={{ color: '#c0483a', textDecoration: 'none' }}>
            mayte.suarez-farinas@mssm.edu
          </a>
        </p>
      </motion.div>
    </div>
  )
}
