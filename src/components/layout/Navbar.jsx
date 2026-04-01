import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ImmuneNetwork } from '../common/LabLogos'

const navLinks = [
  { path: '/lab', label: 'Home' },
  { path: '/research', label: 'Research' },
  { path: '/team', label: 'Team' },
  { path: '/publications', label: 'Publications' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(250,247,244,0.85)', borderColor: 'rgba(180,160,145,0.3)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Lab name / logo */}
        <Link to="/" className="group flex items-center gap-3">
          <ImmuneNetwork size={40} />
          <div>
            <span className="font-semibold text-sm tracking-wide group-hover:text-coral-400 transition-colors" style={{ color: '#2a1f1a' }}>
              Suárez-Fariñas Lab
            </span>
            <span className="hidden sm:block text-xs" style={{ color: '#8b7b6b' }}>
              Icahn School of Medicine
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{ color: location.pathname === link.path ? '#c0483a' : '#5a4a3a' }}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? ''
                  : 'hover:text-coral-500'
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-coral-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-warm-300 hover:text-warm-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary-800/50 bg-primary-950/95 backdrop-blur-md"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-coral-400'
                      : 'text-warm-400 hover:text-warm-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
