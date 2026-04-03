import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

const teamMembers = [
  {
    name: 'Mayte Suárez-Fariñas',
    role: 'Principal Investigator',
    country: 'Cuba',
    flag: '🇨🇺',
    lonlat: [-79.5, 21.5],
    color: '#c0483a',
    bio: 'Professor of Population Health Science & Policy, Genetics & Genomic Sciences, and AI & Human Health.',
    photo: null,
    links: { scholar: 'https://scholar.google.com/citations?user=BlGq3e4AAAAJ&hl=en', orcid: 'https://orcid.org/0000-0001-8712-3553' },
  },
  {
    name: 'Samane Khoshbakht',
    role: 'Postdoctoral Fellow',
    country: 'Iran',
    flag: '🇮🇷',
    lonlat: [53.7, 32.4],
    color: '#d4961a',
    bio: 'Postdoctoral researcher in bioinformatics and biostatistics. Performs scRNA-seq analyses in IBD and immune-mediated diseases. Applies linear mixed-effects models for longitudinal clinical data and uses mediation analysis to dissect causal pathways.',
    photo: 'team/samane-khoshbakht.jpg',
    links: { scholar: 'https://scholar.google.com/citations?user=9znAJpsAAAAJ&hl=en', orcid: 'https://orcid.org/0000-0003-3253-7577' },
  },
  {
    name: 'Jingyang (Judy) Zhang',
    role: 'Postdoctoral Fellow',
    country: 'China',
    flag: '🇨🇳',
    lonlat: [104.2, 35.9],
    color: '#2c9e8c',
    bio: 'PhD in Statistics from Northwestern University. Works on the REVAMP project building interactive Shiny apps for vaccination policy visualization. Helps with grant proposals and organizes The Counterfactual Thinker\'s Club for causal inference study.',
    photo: 'team/judy-zhang.jpg',
    links: { linkedin: 'https://www.linkedin.com/in/jingyang-zhang-ph-d-07380464/' },
  },
  {
    name: 'Kyung Won Lee',
    role: 'Postdoctoral Fellow',
    country: 'South Korea',
    flag: '🇰🇷',
    lonlat: [127.8, 36.5],
    color: '#6a7fa8',
    bio: 'Develops machine learning and deep learning models for clinical applications, including disease prediction, diagnosis, and treatment response modeling using multimodal clinical and wearable data.',
    photo: null,
    links: { scholar: 'https://scholar.google.com/citations?user=cUwtSEcAAAAJ&hl=en' },
  },
]

const NYC = [-74.0, 40.7]

const uniqueCountries = teamMembers.reduce((acc, m) => {
  if (!acc.find(c => c.country === m.country)) {
    acc.push({ country: m.country, lonlat: m.lonlat, flag: m.flag, color: m.color, count: teamMembers.filter(t => t.country === m.country).length })
  }
  return acc
}, [])

const roleColors = {
  'Principal Investigator': '#c0483a',
  'Postdoctoral Fellow': '#2c9e8c',
  'PhD Student': '#6a7fa8',
  'Research Assistant': '#d4961a',
}

function WorldMap({ hoveredCountry }) {
  const [geoData, setGeoData] = useState(null)
  const width = 900
  const height = 450

  const projection = geoMercator()
    .scale(130)
    .center([20, 30])
    .translate([width / 2, height / 2])

  const pathGenerator = geoPath().projection(projection)

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/world.json')
      .then(r => r.json())
      .then(topo => {
        const countries = feature(topo, topo.objects.countries)
        setGeoData(countries)
      })
  }, [])

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* Background */}
      <rect width={width} height={height} fill="#f5f0ec" />

      {/* Countries */}
      {geoData && geoData.features.map((f, i) => (
        <path
          key={i}
          d={pathGenerator(f)}
          fill="#d8cec2"
          stroke="#c8b8a8"
          strokeWidth="0.5"
        />
      ))}

      {/* Connection lines */}
      {uniqueCountries.filter(c => c.country !== 'USA').map(c => {
        const from = projection(c.lonlat)
        const to = projection(NYC)
        if (!from || !to) return null
        const isHovered = hoveredCountry === c.country

        // Curved line
        const midX = (from[0] + to[0]) / 2
        const midY = Math.min(from[1], to[1]) - 40

        return (
          <g key={`line-${c.country}`}>
            <path
              d={`M ${from[0]} ${from[1]} Q ${midX} ${midY} ${to[0]} ${to[1]}`}
              fill="none"
              stroke={c.color}
              strokeWidth={isHovered ? 2.5 : 1}
              strokeDasharray={isHovered ? 'none' : '6,4'}
              opacity={isHovered ? 0.7 : 0.2}
              style={{ transition: 'all 0.4s' }}
            />
            {/* Animated dot */}
            {isHovered && (
              <circle r="3" fill={c.color} opacity="0.9">
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  path={`M ${from[0]} ${from[1]} Q ${midX} ${midY} ${to[0]} ${to[1]}`}
                />
              </circle>
            )}
          </g>
        )
      })}

      {/* Country pins */}
      {uniqueCountries.map(c => {
        const pos = projection(c.lonlat)
        if (!pos) return null
        const isHovered = hoveredCountry === c.country

        return (
          <g key={`pin-${c.country}`}>
            {/* Glow */}
            <circle cx={pos[0]} cy={pos[1]} r={isHovered ? 16 : 8}
              fill={c.color} opacity={isHovered ? 0.15 : 0.06}
              style={{ transition: 'all 0.3s' }}
            />
            {/* Outer ring */}
            <circle cx={pos[0]} cy={pos[1]} r={isHovered ? 7 : 5}
              fill={c.color} opacity={isHovered ? 0.8 : 0.5}
              style={{ transition: 'all 0.3s' }}
            />
            {/* Inner dot */}
            <circle cx={pos[0]} cy={pos[1]} r={isHovered ? 3 : 2}
              fill="white" opacity="0.9"
            />
            {/* Label */}
            <text x={pos[0]} y={pos[1] - 14} textAnchor="middle"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: isHovered ? '12px' : '10px',
                fontWeight: 600,
                fill: c.color,
                opacity: isHovered ? 1 : 0.6,
                transition: 'all 0.3s',
              }}
            >
              {c.flag} {c.country} ({c.count})
            </text>
          </g>
        )
      })}

      {/* NYC pin — always visible */}
      {(() => {
        const pos = projection(NYC)
        if (!pos) return null
        return (
          <g>
            <circle cx={pos[0]} cy={pos[1]} r="12" fill="#c0483a" opacity="0.1" />
            <circle cx={pos[0]} cy={pos[1]} r="7" fill="#c0483a" opacity="0.8" />
            <circle cx={pos[0]} cy={pos[1]} r="3" fill="white" />
            <text x={pos[0]} y={pos[1] - 16} textAnchor="middle"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, fill: '#c0483a' }}
            >
              📍 New York City
            </text>
          </g>
        )
      })()}

      {/* Graticule-like grid lines */}
      {[0, 30, 60, -30, -60].map(lat => {
        const from = projection([-170, lat])
        const to = projection([170, lat])
        if (!from || !to) return null
        return <line key={`lat${lat}`} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke="#e0d5c8" strokeWidth="0.3" />
      })}
    </svg>
  )
}

export default function Team() {
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const roles = ['Principal Investigator', 'Postdoctoral Fellow', 'PhD Student', 'Research Assistant']

  return (
    <div style={{ background: '#faf7f4', minHeight: '100vh', paddingTop: '110px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>

      {/* Full-page background map */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.15, pointerEvents: 'none' }}>
        <WorldMap hoveredCountry={hoveredCountry} />
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: '40px' }}
        >
          <p style={{ color: '#8b5c4a', fontSize: '12px', fontWeight: '600', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Our People
          </p>
          <h1 style={{ color: '#2a1f1a', fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
            The <span style={{ fontStyle: 'italic', color: '#c0483a' }}>Team</span>
          </h1>
          <p style={{ color: '#8b7b6b', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
            A global team united in New York City, decoding inflammation through data.
          </p>
        </motion.div>


        {/* Country legend */}
        <div className="flex flex-wrap justify-center gap-3" style={{ marginBottom: '40px' }}>
          {uniqueCountries.map(c => (
            <div
              key={c.country}
              className="flex items-center gap-2 cursor-default transition-all duration-200"
              style={{
                padding: '6px 14px', borderRadius: '9999px', background: 'white',
                border: hoveredCountry === c.country ? `1.5px solid ${c.color}` : '1px solid #e0d5c8',
                boxShadow: hoveredCountry === c.country ? `0 2px 8px ${c.color}20` : 'none',
              }}
              onMouseEnter={() => setHoveredCountry(c.country)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <span>{c.flag}</span>
              <span style={{ fontSize: '12px', color: '#4a3a30', fontWeight: '500' }}>{c.country}</span>
              <span style={{ fontSize: '11px', color: c.color, fontWeight: '600' }}>({c.count})</span>
            </div>
          ))}
        </div>

        {/* Team members */}
        {roles.map(role => {
          const members = teamMembers.filter(m => m.role === role)
          if (members.length === 0) return null

          return (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '40px' }}
            >
              <div className="flex items-center gap-3" style={{ marginBottom: '20px' }}>
                <div style={{ width: '4px', height: '24px', background: roleColors[role], borderRadius: '2px' }} />
                <h2 style={{ color: '#2a1f1a', fontSize: '20px', fontFamily: 'var(--font-display)' }}>
                  {role === 'Principal Investigator' ? 'Principal Investigator' : `${role}s`}
                </h2>
              </div>

              <div className={`grid gap-6 ${role === 'Principal Investigator' ? 'grid-cols-1 max-w-lg' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                {members.map((member, i) => (
                  <motion.div
                    key={`${member.name}-${i}`}
                    whileHover={{ y: -4, boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}
                    onMouseEnter={() => setHoveredCountry(member.country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      background: 'white', borderRadius: '14px', border: '1px solid #e8ddd5',
                      overflow: 'hidden', cursor: 'default', transition: 'all 0.3s',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ height: '4px', background: member.color }} />
                    <div className="flex" style={{ minHeight: '160px' }}>
                      {/* Left — Photo + Links */}
                      <div className="flex flex-col items-center justify-center" style={{ width: '130px', flexShrink: 0, padding: '16px 10px', background: `linear-gradient(135deg, ${member.color}06, ${member.color}02)` }}>
                        {member.photo ? (
                          <img
                            src={import.meta.env.BASE_URL + member.photo}
                            alt={member.name}
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${member.color}30` }}
                          />
                        ) : (
                          <div style={{
                            width: '100px', height: '100px',
                            borderRadius: '50%', flexShrink: 0,
                            background: `linear-gradient(135deg, ${member.color}20, ${member.color}08)`,
                            border: `3px solid ${member.color}30`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <span style={{ fontSize: '28px' }}>{member.flag}</span>
                          </div>
                        )}
                        {/* Links below photo */}
                        <div className="flex items-center gap-2" style={{ marginTop: '10px' }}>
                            {member.links?.scholar && (
                              <a href={member.links.scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: 'white', border: '1px solid #e0d5c8', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#4285f4'; e.currentTarget.style.borderColor = '#4285f4' }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e0d5c8' }}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285f4">
                                  <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
                                </svg>
                              </a>
                            )}
                            {member.links?.orcid && (
                              <a href={member.links.orcid} target="_blank" rel="noopener noreferrer" title="ORCID"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: 'white', border: '1px solid #e0d5c8', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#a6ce39'; e.currentTarget.style.borderColor = '#a6ce39' }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e0d5c8' }}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#a6ce39">
                                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-3.919-3.722z"/>
                                </svg>
                              </a>
                            )}
                            {member.links?.linkedin && (
                              <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: 'white', border: '1px solid #e0d5c8', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#0077b5'; e.currentTarget.style.borderColor = '#0077b5' }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e0d5c8' }}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#0077b5">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              </a>
                            )}
                        </div>
                      </div>
                      {/* Right — Content */}
                      <div style={{ flex: 1, padding: '20px 22px' }}>
                        <h3 style={{ color: '#2a1f1a', fontSize: '15px', fontWeight: '600', marginBottom: '2px' }}>
                          {member.name}
                        </h3>
                        <p style={{ color: member.color, fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>{member.role}</p>
                        <p style={{ color: '#6b5548', fontSize: '12px', lineHeight: '1.6', marginBottom: '10px' }}>{member.bio}</p>
                        <span style={{
                          padding: '3px 10px', fontSize: '10px', borderRadius: '9999px',
                          background: `${member.color}10`, color: member.color, border: `1px solid ${member.color}20`,
                        }}>
                          {member.flag} {member.country}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}

        {/* Alumni */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginTop: '40px', padding: '40px', background: '#f5f0ec', borderRadius: '14px', border: '1px solid #e8ddd5' }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', color: '#2a1f1a', fontSize: '20px', marginBottom: '8px' }}>
            Lab <span style={{ fontStyle: 'italic', color: '#c0483a' }}>Alumni</span>
          </h2>
          <p style={{ color: '#8b7b6b', fontSize: '13px' }}>
            Former members who have gone on to do amazing things. Coming soon.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
