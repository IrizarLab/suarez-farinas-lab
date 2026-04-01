import { ImmuneNetwork } from '../common/LabLogos'

export default function Footer() {
  return (
    <footer style={{ background: '#c0483a' }}>
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto" style={{ padding: '60px 32px 40px' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Lab identity */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <ImmuneNetwork size={36} />
              <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', fontFamily: 'var(--font-display)' }}>
                Suárez-Fariñas Lab
              </h3>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.7' }}>
              Computational Biology &amp; Systems Immunology at the
              Icahn School of Medicine at Mount Sinai, New York.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Home', path: '/lab' },
                { label: 'Research', path: '/research' },
                { label: 'Team', path: '/team' },
                { label: 'Publications', path: '/publications' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: '10px' }}>
                  <a
                    href={`#${item.path}`}
                    style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Departments
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Population Health Science & Policy',
                'Genetics & Genomic Sciences',
                'AI & Human Health',
              ].map((dept) => (
                <li key={dept} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '10px', lineHeight: '1.5' }}>
                  {dept}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Get in Touch
            </h4>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8' }}>
              <p>Icahn School of Medicine</p>
              <p>at Mount Sinai</p>
              <p>One Gustave L. Levy Place</p>
              <p>New York, NY 10029</p>
              <a
                href="mailto:mayte.suarezfarinas@mssm.edu"
                style={{ color: '#ffffff', textDecoration: 'none', display: 'inline-block', marginTop: '12px', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                mayte.suarezfarinas@mssm.edu
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.2)', margin: '40px 0 24px' }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px' }}>
            &copy; {new Date().getFullYear()} Suárez-Fariñas Lab. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://profiles.mountsinai.org/mayte-suarez-farinas"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.45)'}
            >
              Mount Sinai Profile
            </a>
            <a
              href="https://scholar.google.com/citations?user=BlGq3e4AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.45)'}
            >
              Google Scholar
            </a>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
              Mount Sinai Health System
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
