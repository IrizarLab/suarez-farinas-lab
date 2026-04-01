import { useState, useEffect } from 'react'

const OPENALEX_AUTHOR_ID = 'A5074081568' // Mayte Suárez-Fariñas
const OPENALEX_URL = `https://api.openalex.org/authors/${OPENALEX_AUTHOR_ID}`

// Cache the data so multiple components don't re-fetch
let cachedData = null
let fetchPromise = null

async function fetchScholarData() {
  if (cachedData) return cachedData
  if (fetchPromise) return fetchPromise

  fetchPromise = fetch(OPENALEX_URL)
    .then(r => r.json())
    .then(data => {
      cachedData = {
        name: data.display_name,
        totalCitations: data.cited_by_count,
        totalWorks: data.works_count,
        hIndex: data.summary_stats?.h_index || 0,
        i10Index: data.summary_stats?.i10_index || 0,
        citationsPerYear: (data.counts_by_year || [])
          .map(y => ({ year: y.year, citations: y.cited_by_count, works: y.works_count }))
          .sort((a, b) => a.year - b.year),
      }
      return cachedData
    })
    .catch(err => {
      console.warn('OpenAlex fetch failed:', err)
      // Fallback data
      return {
        name: 'Mayte Suárez-Fariñas',
        totalCitations: 26000,
        totalWorks: 300,
        hIndex: 82,
        i10Index: 202,
        citationsPerYear: [],
      }
    })

  return fetchPromise
}

export default function useScholarData() {
  const [data, setData] = useState(cachedData || null)
  const [loading, setLoading] = useState(!cachedData)

  useEffect(() => {
    fetchScholarData().then(d => {
      setData(d)
      setLoading(false)
    })
  }, [])

  return { data, loading }
}
