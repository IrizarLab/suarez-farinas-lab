import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedCounter from '../components/common/AnimatedCounter'
import useScholarData from '../hooks/useScholarData'

const AUTHOR_QUERY = 'Suarez-Farinas+M[Author]'
const isDev = import.meta.env.DEV

// In dev: use Vite proxy. In production: use static JSON + Cloudflare Worker
const SEARCH_URL = isDev
  ? `/pubmed-api/esearch.fcgi?db=pubmed&term=${AUTHOR_QUERY}&retmax=300&retmode=json`
  : `https://pubmed-proxy.suarezfarinas-lab.workers.dev/esearch?term=${AUTHOR_QUERY}&retmax=300`

const SUMMARY_URL = isDev
  ? '/pubmed-api/esummary.fcgi?db=pubmed&retmode=json&id='
  : 'https://pubmed-proxy.suarezfarinas-lab.workers.dev/esummary?id='

async function fetchPapersLive() {
  const searchRes = await fetch(SEARCH_URL).then(r => r.json())
  const allIds = searchRes.esearchresult.idlist
  const totalCount = parseInt(searchRes.esearchresult.count)

  const papers = []
  const batchSize = 50
  for (let i = 0; i < allIds.length; i += batchSize) {
    const batch = allIds.slice(i, i + batchSize)
    const res = await fetch(SUMMARY_URL + batch.join(',')).then(r => r.json())
    for (const uid of res.result.uids) {
      const p = res.result[uid]
      papers.push({
        pmid: uid,
        title: p.title,
        authors: (p.authors || []).map(a => a.name).join(', '),
        journal: p.fulljournalname || p.source || '',
        year: (p.pubdate || '').split(' ')[0],
        doi: (p.articleids || []).find(a => a.idtype === 'doi')?.value || '',
      })
    }
  }
  return { papers, totalCount }
}

async function fetchPapersStatic() {
  const res = await fetch(import.meta.env.BASE_URL + 'data/publications.json')
  return res.json()
}

async function fetchPapers() {
  try {
    return await fetchPapersLive()
  } catch (e) {
    console.warn('Live PubMed fetch failed, using static data:', e.message)
    return await fetchPapersStatic()
  }
}

function highlightAuthor(authors) {
  return authors.replace(
    /(Suárez-Fariñas M|Suarez-Farinas M)/gi,
    '<strong style="color: #c0483a">$1</strong>'
  )
}

export default function Publications() {
  const { data: scholar } = useScholarData()
  const [papers, setPapers] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [yearFilter, setYearFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(20)
  const [source, setSource] = useState('')

  useEffect(() => {
    fetchPapers()
      .then(({ papers, totalCount }) => {
        setPapers(papers)
        setTotalCount(totalCount)
        setSource(isDev ? 'PubMed (live)' : 'PubMed')
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const years = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a)

  const filtered = papers.filter(p => {
    const matchesSearch = !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.journal.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = yearFilter === 'all' || p.year === yearFilter
    return matchesSearch && matchesYear
  })

  const visible = filtered.slice(0, visibleCount)

  return (
    <div style={{ background: '#faf7f4', minHeight: '100vh', paddingTop: '110px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: '40px' }}
        >
          <p style={{ color: '#8b5c4a', fontSize: '12px', fontWeight: '600', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Our Work
          </p>
          <h1 style={{ color: '#2a1f1a', fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
            Publications
          </h1>
          <p style={{ color: '#8b7b6b', fontSize: '15px' }}>
            {loading ? 'Loading from PubMed...' : `${totalCount} peer-reviewed publications`}
          </p>
        </motion.div>

        {/* Two column layout: sidebar + papers */}
        <div className="flex gap-8" style={{ alignItems: 'flex-start' }}>

        {/* LEFT SIDEBAR — Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block"
          style={{ width: '260px', flexShrink: 0, position: 'sticky', top: '100px' }}
        >
          {!loading && papers.length > 0 && (() => {
            // Calculate stats
            const journalCount = {}
            const yearCount = {}
            papers.forEach(p => {
              journalCount[p.journal] = (journalCount[p.journal] || 0) + 1
              yearCount[p.year] = (yearCount[p.year] || 0) + 1
            })
            const topJournals = Object.entries(journalCount).sort((a, b) => b[1] - a[1]).slice(0, 6)
            const recentYears = Object.entries(yearCount).sort((a, b) => b[0] - a[0]).slice(0, 10).reverse()
            const maxYearCount = Math.max(...recentYears.map(y => y[1]))

            return (
              <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e8ddd5', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                {/* Total */}
                <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #f0e8e0' }}>
                  <p style={{ color: '#c0483a', fontSize: '36px', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}>
                    <AnimatedCounter target={totalCount} duration={2000} />
                  </p>
                  <p style={{ color: '#8b7b6b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Publications</p>
                </div>

                {/* Papers per year mini chart — animated */}
                <h4 style={{ color: '#2a1f1a', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  Papers Per Year
                </h4>
                <div style={{ marginBottom: '24px' }}>
                  {recentYears.map(([year, count], idx) => (
                    <div key={year} className="flex items-center gap-2" style={{ marginBottom: '4px' }}>
                      <span style={{ color: '#8b7b6b', fontSize: '10px', width: '32px', textAlign: 'right' }}>{year}</span>
                      <div style={{ flex: 1, height: '8px', background: '#f5efe8', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / maxYearCount) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          style={{ height: '100%', background: '#c0483a', borderRadius: '4px' }}
                        />
                      </div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 + idx * 0.08 }}
                        style={{ color: '#a09080', fontSize: '10px', width: '18px' }}
                      >{count}</motion.span>
                    </div>
                  ))}
                </div>

                {/* Citations per year — from OpenAlex */}
                {scholar?.citationsPerYear?.length > 0 && (() => {
                  const recent = scholar.citationsPerYear.slice(-10)
                  const maxCites = Math.max(...recent.map(y => y.citations))
                  return (
                    <>
                      <h4 style={{ color: '#2a1f1a', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                        Citations Per Year
                      </h4>
                      <div style={{ marginBottom: '24px' }}>
                        {recent.map(({ year, citations }, idx) => (
                          <div key={year} className="flex items-center gap-2" style={{ marginBottom: '4px' }}>
                            <span style={{ color: '#8b7b6b', fontSize: '10px', width: '32px', textAlign: 'right' }}>{year}</span>
                            <div style={{ flex: 1, height: '8px', background: '#f5efe8', borderRadius: '4px', overflow: 'hidden' }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(citations / maxCites) * 100}%` }}
                                transition={{ duration: 0.8, delay: 1.5 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                style={{ height: '100%', background: '#2c9e8c', borderRadius: '4px' }}
                              />
                            </div>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 1.8 + idx * 0.08 }}
                              style={{ color: '#a09080', fontSize: '9px', width: '30px' }}
                            >{citations.toLocaleString()}</motion.span>
                          </div>
                        ))}
                      </div>

                      {/* Total citations counter */}
                      <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #f0e8e0' }}>
                        <p style={{ color: '#2c9e8c', fontSize: '28px', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}>
                          <AnimatedCounter target={scholar.totalCitations} duration={2500} />
                        </p>
                        <p style={{ color: '#8b7b6b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Citations</p>
                      </div>
                    </>
                  )
                })()}

                {/* Top journals */}
                <h4 style={{ color: '#2a1f1a', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  Top Journals
                </h4>
                {topJournals.map(([journal, count]) => (
                  <div key={journal} style={{ marginBottom: '8px' }}>
                    <div className="flex justify-between items-baseline">
                      <p style={{ color: '#4a3a30', fontSize: '11px', lineHeight: '1.4', flex: 1, paddingRight: '8px' }}>{journal}</p>
                      <span style={{ color: '#c0483a', fontSize: '11px', fontWeight: '600', flexShrink: 0 }}>{count}</span>
                    </div>
                  </div>
                ))}

                {/* Source */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0e8e0', textAlign: 'center' }}>
                  <p style={{ color: '#b8a898', fontSize: '9px' }}>Papers: PubMed · NCBI</p>
                  <p style={{ color: '#b8a898', fontSize: '9px' }}>Citations: OpenAlex</p>
                </div>
              </div>
            )
          })()}
        </motion.div>

        {/* RIGHT — Papers list */}
        <div style={{ flex: 1, minWidth: 0 }}>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
          style={{ marginBottom: '32px' }}
        >
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by title, author, or journal..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(20) }}
              style={{
                width: '100%', padding: '12px 16px 12px 40px', fontSize: '14px',
                border: '1px solid #d8c8b8', borderRadius: '10px',
                background: 'white', color: '#2a1f1a', outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = '#c0483a'}
              onBlur={(e) => e.target.style.borderColor = '#d8c8b8'}
            />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#a09080', fontSize: '16px' }}>
              🔍
            </span>
          </div>

          <select
            value={yearFilter}
            onChange={(e) => { setYearFilter(e.target.value); setVisibleCount(20) }}
            style={{
              padding: '12px 16px', fontSize: '14px',
              border: '1px solid #d8c8b8', borderRadius: '10px',
              background: 'white', color: '#2a1f1a', outline: 'none',
              cursor: 'pointer', minWidth: '130px',
            }}
          >
            <option value="all">All Years</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </motion.div>

        {/* Results count */}
        {!loading && (
          <p style={{ color: '#a09080', fontSize: '13px', marginBottom: '20px' }}>
            Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} publications
            {searchTerm && ` matching "${searchTerm}"`}
            {yearFilter !== 'all' && ` from ${yearFilter}`}
            {source && <span style={{ marginLeft: '8px', fontSize: '11px' }}>· Source: {source}</span>}
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center" style={{ padding: '60px 0' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              style={{ width: '30px', height: '30px', border: '3px solid #e8ddd5', borderTopColor: '#c0483a', borderRadius: '50%', margin: '0 auto 16px' }}
            />
            <p style={{ color: '#8b7b6b', fontSize: '14px' }}>Fetching publications...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ padding: '40px', textAlign: 'center', background: '#fff5f5', borderRadius: '12px', border: '1px solid #ffd0d0' }}>
            <p style={{ color: '#c0483a', fontSize: '14px' }}>Failed to load: {error}</p>
          </div>
        )}

        {/* Papers */}
        {!loading && !error && (
          <div>
            {visible.map((paper, i) => (
              <motion.div
                key={paper.pmid}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.5) }}
                style={{
                  padding: '20px 24px', marginBottom: '8px', borderRadius: '10px',
                  background: 'white', border: '1px solid #e8ddd5', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c0483a40'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(192,72,58,0.06)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e8ddd5'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <a
                  href={paper.doi ? `https://doi.org/${paper.doi}` : `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
                  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}
                >
                  <h3 style={{ color: '#2a1f1a', fontSize: '15px', fontWeight: '600', lineHeight: '1.5', marginBottom: '6px' }}
                    onMouseEnter={(e) => e.target.style.color = '#c0483a'}
                    onMouseLeave={(e) => e.target.style.color = '#2a1f1a'}
                  >{paper.title}</h3>
                </a>

                <p style={{ color: '#6b5548', fontSize: '12px', lineHeight: '1.5', marginBottom: '6px' }}
                  dangerouslySetInnerHTML={{ __html: highlightAuthor(paper.authors) }}
                />

                <div className="flex flex-wrap items-center gap-3">
                  <span style={{ color: '#8b7b6b', fontSize: '12px', fontStyle: 'italic' }}>{paper.journal}</span>
                  <span style={{ color: '#c0483a', fontSize: '11px', fontWeight: '600', padding: '2px 8px', background: '#c0483a10', borderRadius: '4px' }}>{paper.year}</span>
                  <a href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`} target="_blank" rel="noopener noreferrer"
                    style={{ color: '#a09080', fontSize: '11px', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.target.style.color = '#c0483a'}
                    onMouseLeave={(e) => e.target.style.color = '#a09080'}
                  >PMID: {paper.pmid}</a>
                  {paper.doi && (
                    <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer"
                      style={{ color: '#a09080', fontSize: '11px', textDecoration: 'none' }}
                      onMouseEnter={(e) => e.target.style.color = '#c0483a'}
                      onMouseLeave={(e) => e.target.style.color = '#a09080'}
                    >DOI ↗</a>
                  )}
                </div>
              </motion.div>
            ))}

            {visibleCount < filtered.length && (
              <div className="text-center" style={{ marginTop: '24px' }}>
                <button
                  onClick={() => setVisibleCount(v => v + 20)}
                  style={{
                    padding: '12px 36px', fontSize: '14px', borderRadius: '9999px',
                    background: '#c0483a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '500',
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#a83d30'}
                  onMouseLeave={(e) => e.target.style.background = '#c0483a'}
                >
                  Load More ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  )
}
