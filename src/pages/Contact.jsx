import { useState } from 'react'
import { motion } from 'framer-motion'

// SVG illustration of a colorful Havana building facade
function HavanaBuilding() {
  return (
    <svg width="280" height="320" viewBox="0 0 280 320" fill="none" style={{ opacity: 0.9 }}>
      {/* Sky */}
      <rect width="280" height="100" fill="#d4e8f0" opacity="0.3" />

      {/* Building 1 — coral/pink */}
      <rect x="10" y="60" width="80" height="260" rx="2" fill="#d4786a" />
      <rect x="10" y="60" width="80" height="260" rx="2" stroke="#b86050" strokeWidth="1" fill="none" />
      {/* Door */}
      <rect x="35" y="250" width="30" height="70" rx="1" fill="#8b3028" />
      <path d="M35 250 Q50 238 65 250" fill="#8b3028" />
      <circle cx="58" cy="285" r="2" fill="#d4961a" />
      {/* Windows */}
      {[85, 140, 195].map(y => (
        <g key={y}>
          <rect x="22" y={y} width="22" height="35" rx="1" fill="#4a8090" opacity="0.6" />
          <rect x="56" y={y} width="22" height="35" rx="1" fill="#4a8090" opacity="0.6" />
          <line x1="33" y1={y} x2="33" y2={y + 35} stroke="#b86050" strokeWidth="0.5" />
          <line x1="67" y1={y} x2="67" y2={y + 35} stroke="#b86050" strokeWidth="0.5" />
          {/* Shutters */}
          <rect x="22" y={y} width="22" height="35" rx="1" stroke="#b86050" strokeWidth="0.8" fill="none" />
          <rect x="56" y={y} width="22" height="35" rx="1" stroke="#b86050" strokeWidth="0.8" fill="none" />
        </g>
      ))}
      {/* Balcony rails */}
      {[85, 140].map(y => (
        <g key={`b${y}`}>
          <rect x="18" y={y + 33} width="30" height="10" fill="none" stroke="#5a3a30" strokeWidth="1" rx="1" />
          <rect x="52" y={y + 33} width="30" height="10" fill="none" stroke="#5a3a30" strokeWidth="1" rx="1" />
        </g>
      ))}

      {/* Building 2 — yellow/ochre */}
      <rect x="95" y="40" width="90" height="280" rx="2" fill="#e8c864" />
      <rect x="95" y="40" width="90" height="280" rx="2" stroke="#c8a840" strokeWidth="1" fill="none" />
      {/* Door — arched */}
      <rect x="125" y="245" width="35" height="75" rx="1" fill="#6a4a20" />
      <path d="M125 245 Q142.5 228 160 245" fill="#6a4a20" />
      <circle cx="153" cy="282" r="2" fill="#d4961a" />
      {/* Windows */}
      {[65, 120, 180].map(y => (
        <g key={y}>
          <rect x="105" y={y} width="25" height="38" rx="1" fill="#4a8090" opacity="0.5" />
          <rect x="150" y={y} width="25" height="38" rx="1" fill="#4a8090" opacity="0.5" />
          <path d={`M105 ${y} Q117.5 ${y - 8} 130 ${y}`} fill="#e8c864" stroke="#c8a840" strokeWidth="0.5" />
          <path d={`M150 ${y} Q162.5 ${y - 8} 175 ${y}`} fill="#e8c864" stroke="#c8a840" strokeWidth="0.5" />
        </g>
      ))}
      {/* Decorative cornice */}
      <rect x="95" y="38" width="90" height="5" fill="#c8a840" opacity="0.5" rx="1" />

      {/* Building 3 — teal/turquoise */}
      <rect x="190" y="70" width="80" height="250" rx="2" fill="#6aada0" />
      <rect x="190" y="70" width="80" height="250" rx="2" stroke="#4a8a80" strokeWidth="1" fill="none" />
      {/* Door */}
      <rect x="215" y="255" width="30" height="65" rx="1" fill="#2a5a50" />
      <circle cx="238" cy="287" r="2" fill="#d4961a" />
      {/* Windows */}
      {[95, 150, 205].map(y => (
        <g key={y}>
          <rect x="200" y={y} width="22" height="32" rx="1" fill="#4a8090" opacity="0.5" />
          <rect x="238" y={y} width="22" height="32" rx="1" fill="#4a8090" opacity="0.5" />
        </g>
      ))}
      {/* Balcony */}
      <rect x="196" y="128" width="64" height="12" fill="none" stroke="#4a6a60" strokeWidth="1.5" rx="1" />

      {/* Street */}
      <rect x="0" y="315" width="280" height="5" fill="#a09080" opacity="0.3" />

      {/* Vintage car silhouette */}
      <g transform="translate(30, 298)" opacity="0.2">
        <path d="M0 15 Q5 5 15 3 L35 0 Q45 0 50 3 L65 5 Q70 8 70 15 Z" fill="#3a2a20" />
        <circle cx="15" cy="16" r="5" fill="#3a2a20" />
        <circle cx="55" cy="16" r="5" fill="#3a2a20" />
      </g>

      {/* Palm tree */}
      <g transform="translate(260, 20)" opacity="0.25">
        <line x1="5" y1="50" x2="5" y2="90" stroke="#5a4a30" strokeWidth="3" />
        <path d="M5 50 Q-15 30 -20 35 Q-5 38 5 50" fill="#4a8a50" />
        <path d="M5 50 Q25 30 30 35 Q15 38 5 50" fill="#4a8a50" />
        <path d="M5 50 Q5 25 0 20 Q3 35 5 50" fill="#4a8a50" />
        <path d="M5 50 Q-10 40 -15 45 Q0 42 5 50" fill="#3a7a40" />
        <path d="M5 50 Q20 40 25 45 Q10 42 5 50" fill="#3a7a40" />
      </g>
    </svg>
  )
}

function StampHavana() {
  return (
    <div style={{
      width: '75px', height: '90px', border: '2px dashed rgba(139,48,40,0.25)',
      borderRadius: '3px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', transform: 'rotate(2deg)',
      background: 'linear-gradient(135deg, #faf5ed, #f0e8dd)',
    }}>
      <div style={{
        width: '55px', height: '60px', borderRadius: '2px',
        border: '1px solid rgba(192,72,58,0.2)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #d4786a, #c0483a)',
      }}>
        <span style={{ color: 'white', fontSize: '7px', fontWeight: 'bold', letterSpacing: '0.1em' }}>REPÚBLICA</span>
        <span style={{ color: 'white', fontSize: '6px', letterSpacing: '0.1em' }}>DE CUBA</span>
        <span style={{ color: '#ffd700', fontSize: '11px', fontWeight: 'bold', marginTop: '2px' }}>5¢</span>
      </div>
      <p style={{ fontSize: '5px', color: '#a09080', marginTop: '2px', letterSpacing: '0.15em' }}>CORREOS</p>
    </div>
  )
}

function PostmarkHavana() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" style={{ position: 'absolute', top: '12px', right: '95px', opacity: 0.12, transform: 'rotate(-12deg)' }}>
      <circle cx="45" cy="45" r="40" fill="none" stroke="#2a1f1a" strokeWidth="2.5" />
      <circle cx="45" cy="45" r="32" fill="none" stroke="#2a1f1a" strokeWidth="1" />
      <text x="45" y="30" textAnchor="middle" fill="#2a1f1a" fontSize="7" fontWeight="bold" fontFamily="Georgia, serif">LA HABANA</text>
      <line x1="8" y1="42" x2="82" y2="42" stroke="#2a1f1a" strokeWidth="1.5" />
      <text x="45" y="52" textAnchor="middle" fill="#2a1f1a" fontSize="9" fontWeight="bold" fontFamily="Georgia, serif">CUBA</text>
      <text x="45" y="64" textAnchor="middle" fill="#2a1f1a" fontSize="6" fontFamily="Georgia, serif">VÍA AÉREA</text>
    </svg>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:mayte.suarezfarinas@mssm.edu?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
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
          Saludos desde el Laboratorio
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
          borderRadius: '4px',
          boxShadow: '0 15px 50px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          border: '1px solid #d8c8b8',
          // Aged paper texture
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4h1v1H2V4zm2-2h1v1H4V2z' fill='%23000000' fill-opacity='0.015'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="flex flex-col md:flex-row" style={{ minHeight: '520px' }}>

          {/* LEFT SIDE — Havana illustration */}
          <div className="w-full md:w-5/12 relative overflow-hidden" style={{
            background: 'linear-gradient(to bottom, #f0ebe4, #e8e0d5)',
            borderRight: '1px dashed #c8b8a8',
          }}>
            {/* Greetings header */}
            <div style={{ padding: '30px 28px 0', position: 'relative', zIndex: 2 }}>
              <p style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#c0483a', fontSize: '18px', fontStyle: 'italic', marginBottom: '2px' }}>
                Saludos desde
              </p>
              <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#2a1f1a', fontSize: '28px', lineHeight: '1.1' }}>
                New York City
              </h2>
              <div style={{ width: '40px', height: '2px', background: '#c0483a', marginTop: '10px', borderRadius: '1px' }} />
            </div>

            {/* Havana-style building illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <HavanaBuilding />
            </div>

            {/* Lab info overlaid at bottom */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(250,245,237,0.95), rgba(250,245,237,0.7), transparent)',
              padding: '40px 28px 24px',
            }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#3a1a10', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                Suárez-Fariñas Lab
              </p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#6b5548', fontSize: '11px', lineHeight: '1.6' }}>
                Icahn School of Medicine at Mount Sinai
                <br />One Gustave L. Levy Place, NYC 10029
              </p>
              <a href="mailto:mayte.suarezfarinas@mssm.edu"
                style={{ fontFamily: 'Georgia, serif', color: '#c0483a', fontSize: '11px', textDecoration: 'none' }}
              >
                mayte.suarezfarinas@mssm.edu
              </a>
            </div>
          </div>

          {/* RIGHT SIDE — Write your message */}
          <div className="w-full md:w-7/12 relative" style={{ background: '#faf5ed' }}>
            {/* Stamp */}
            <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 5 }}>
              <StampHavana />
            </div>

            {/* Postmark */}
            <PostmarkHavana />

            {/* Air mail stripes */}
            <div style={{ display: 'flex', height: '6px' }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} style={{ flex: 1, background: i % 2 === 0 ? '#c0483a' : '#2c5a8c', opacity: 0.25 }} />
              ))}
            </div>

            {/* To address */}
            <div style={{ padding: '20px 30px 0' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#a09080', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>
                VÍA AÉREA · AIR MAIL
              </p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#5a4a3a', fontSize: '14px', fontWeight: '600' }}>
                To: Suárez-Fariñas Lab
              </p>
            </div>

            {/* Ruled lines */}
            <div style={{ padding: '15px 30px 0' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ borderBottom: '1px solid #e0d5c8', marginBottom: '22px' }} />
              ))}
            </div>

            {/* Form */}
            <div style={{ padding: '0 30px 30px' }}>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center" style={{ padding: '30px 0' }}
                >
                  <p style={{ fontSize: '32px', marginBottom: '12px' }}>🌴</p>
                  <p style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#2a1f1a', fontSize: '20px', marginBottom: '6px' }}>
                    ¡Postcard Sent!
                  </p>
                  <p style={{ color: '#8b7b6b', fontSize: '13px', fontFamily: 'Georgia, serif' }}>
                    Gracias — we'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-3" style={{ marginBottom: '14px' }}>
                    <input type="text" placeholder="Your Name" required value={formData.name}
                      onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))}
                      style={{ flex: 1, padding: '10px 0', fontSize: '13px', fontFamily: 'Georgia, serif', border: 'none', borderBottom: '1px solid #d0c0b0', background: 'transparent', color: '#2a1f1a', outline: 'none' }}
                      onFocus={(e) => e.target.style.borderBottomColor = '#c0483a'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#d0c0b0'}
                    />
                    <input type="email" placeholder="Email" required value={formData.email}
                      onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
                      style={{ flex: 1, padding: '10px 0', fontSize: '13px', fontFamily: 'Georgia, serif', border: 'none', borderBottom: '1px solid #d0c0b0', background: 'transparent', color: '#2a1f1a', outline: 'none' }}
                      onFocus={(e) => e.target.style.borderBottomColor = '#c0483a'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#d0c0b0'}
                    />
                  </div>
                  <select value={formData.subject} required
                    onChange={(e) => setFormData(d => ({ ...d, subject: e.target.value }))}
                    style={{ width: '100%', padding: '10px 0', fontSize: '13px', fontFamily: 'Georgia, serif', border: 'none', borderBottom: '1px solid #d0c0b0', background: 'transparent', color: formData.subject ? '#2a1f1a' : '#a09080', outline: 'none', cursor: 'pointer', marginBottom: '14px' }}
                  >
                    <option value="" disabled>What brings you here?</option>
                    <option value="Prospective Student">Prospective Student / Postdoc</option>
                    <option value="Collaboration">Research Collaboration</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Media / Speaking">Media / Speaking Request</option>
                  </select>
                  <textarea placeholder="Write your message here..." required rows={3} value={formData.message}
                    onChange={(e) => setFormData(d => ({ ...d, message: e.target.value }))}
                    style={{ width: '100%', padding: '10px 0', fontSize: '13px', fontFamily: 'Georgia, serif', border: 'none', borderBottom: '1px solid #d0c0b0', background: 'transparent', color: '#2a1f1a', outline: 'none', resize: 'vertical', lineHeight: '1.7', marginBottom: '18px' }}
                    onFocus={(e) => e.target.style.borderBottomColor = '#c0483a'}
                    onBlur={(e) => e.target.style.borderBottomColor = '#d0c0b0'}
                  />
                  <button type="submit"
                    style={{ padding: '11px 30px', fontSize: '13px', borderRadius: '9999px', background: '#c0483a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '600', fontFamily: 'Georgia, serif', letterSpacing: '0.04em', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => e.target.style.background = '#a83d30'}
                    onMouseLeave={(e) => e.target.style.background = '#c0483a'}
                  >
                    Enviar Postcard ✉️
                  </button>
                </form>
              )}
            </div>

            {/* Academic links at bottom */}
            <div style={{ padding: '0 30px 20px', borderTop: '1px solid #e8ddd5', paddingTop: '16px' }}>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=BlGq3e4AAAAJ&hl=en' },
                  { label: 'ORCID', url: 'https://orcid.org/0000-0001-8712-3553' },
                  { label: 'Mount Sinai', url: 'https://profiles.mountsinai.org/mayte-suarez-farinas' },
                ].map(link => (
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '4px 10px', fontSize: '10px', borderRadius: '9999px', background: 'rgba(192,72,58,0.06)', color: '#8b5040', border: '1px solid rgba(192,72,58,0.12)', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.target.style.background = '#c0483a'; e.target.style.color = 'white' }}
                    onMouseLeave={(e) => { e.target.style.background = 'rgba(192,72,58,0.06)'; e.target.style.color = '#8b5040' }}
                  >{link.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Join the Lab */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ width: '90vw', maxWidth: '950px', marginTop: '40px', background: 'white', borderRadius: '14px', border: '1px solid #e0d5c8', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
      >
        <div className="text-center" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#2a1f1a', fontSize: '24px', marginBottom: '8px' }}>
            Join the <span style={{ fontStyle: 'italic', color: '#c0483a' }}>Lab</span>
          </h2>
          <p style={{ color: '#6b5548', fontSize: '14px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
            We're always looking for motivated researchers passionate about computational biology, immunology, and data science.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { role: 'Postdoctoral Fellows', desc: 'Candidates with experience in biostatistics, bioinformatics, or computational biology. Background in inflammatory diseases is a plus.', color: '#c0483a' },
            { role: 'PhD Students', desc: 'Students enrolled in biostatistics, genetics, or related programs at Mount Sinai interested in translational research.', color: '#2c9e8c' },
            { role: 'Research Assistants', desc: 'Individuals with strong programming skills (R/Python) and interest in genomic data analysis and machine learning.', color: '#d4961a' },
          ].map(pos => (
            <div key={pos.role} style={{ padding: '24px', borderRadius: '12px', border: '1px solid #e8ddd5', borderTop: `3px solid ${pos.color}` }}>
              <h3 style={{ color: '#2a1f1a', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{pos.role}</h3>
              <p style={{ color: '#6b5548', fontSize: '12px', lineHeight: '1.6' }}>{pos.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center" style={{ marginTop: '24px', color: '#8b7b6b', fontSize: '13px' }}>
          Send your CV and a brief statement of interest to{' '}
          <a href="mailto:mayte.suarezfarinas@mssm.edu" style={{ color: '#c0483a', textDecoration: 'none' }}>mayte.suarezfarinas@mssm.edu</a>
        </p>
      </motion.div>
    </div>
  )
}
