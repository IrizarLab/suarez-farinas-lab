import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

const teamMembers = [
  { name: 'Mayte Suárez-Fariñas', role: 'Principal Investigator', country: 'Cuba', flag: '🇨🇺', lonlat: [-79.5, 21.5], color: '#c0483a', bio: 'Professor of Population Health Science & Policy, Genetics & Genomic Sciences, and AI & Human Health.' },
  { name: 'Member Name', role: 'Postdoctoral Fellow', country: 'South Korea', flag: '🇰🇷', lonlat: [127.8, 36.5], color: '#2c9e8c', bio: 'Computational biology and machine learning applied to inflammatory skin diseases.' },
  { name: 'Member Name', role: 'Postdoctoral Fellow', country: 'Iran', flag: '🇮🇷', lonlat: [53.7, 32.4], color: '#d4961a', bio: 'Multi-omics integration and biomarker discovery in atopic dermatitis.' },
  { name: 'Member Name', role: 'PhD Student', country: 'South Korea', flag: '🇰🇷', lonlat: [127.8, 36.5], color: '#2c9e8c', bio: 'Single-cell RNA sequencing analysis of immune cell populations in psoriasis.' },
  { name: 'Member Name', role: 'PhD Student', country: 'USA', flag: '🇺🇸', lonlat: [-98.5, 39.8], color: '#6a7fa8', bio: 'Statistical methods for clinical trial analysis in inflammatory bowel disease.' },
  { name: 'Member Name', role: 'Research Assistant', country: 'Iran', flag: '🇮🇷', lonlat: [53.7, 32.4], color: '#d4961a', bio: 'Data pipeline development for high-throughput genomic data processing.' },
  { name: 'Member Name', role: 'Research Assistant', country: 'USA', flag: '🇺🇸', lonlat: [-98.5, 39.8], color: '#6a7fa8', bio: 'Machine learning model development for treatment response prediction.' },
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
    <div style={{ background: '#faf7f4', minHeight: '100vh', paddingTop: '110px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

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

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginBottom: '20px', borderRadius: '16px', overflow: 'hidden',
            border: '1px solid #e0d5c8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          <WorldMap hoveredCountry={hoveredCountry} />
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
                    <div style={{ padding: '24px' }}>
                      <div className="flex items-start gap-4">
                        <div style={{
                          width: role === 'Principal Investigator' ? '80px' : '56px',
                          height: role === 'Principal Investigator' ? '80px' : '56px',
                          borderRadius: '50%', flexShrink: 0,
                          background: `linear-gradient(135deg, ${member.color}20, ${member.color}08)`,
                          border: `2px solid ${member.color}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: role === 'Principal Investigator' ? '28px' : '20px' }}>{member.flag}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ color: '#2a1f1a', fontSize: role === 'Principal Investigator' ? '18px' : '15px', fontWeight: '600', marginBottom: '2px' }}>
                            {member.name}
                          </h3>
                          <p style={{ color: member.color, fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>{member.role}</p>
                          <p style={{ color: '#6b5548', fontSize: '12px', lineHeight: '1.6' }}>{member.bio}</p>
                          <div style={{ marginTop: '10px' }}>
                            <span style={{
                              padding: '3px 10px', fontSize: '10px', borderRadius: '9999px',
                              background: `${member.color}10`, color: member.color, border: `1px solid ${member.color}20`,
                            }}>
                              {member.flag} {member.country}
                            </span>
                          </div>
                        </div>
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
