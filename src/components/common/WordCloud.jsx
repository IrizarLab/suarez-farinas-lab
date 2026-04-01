import { useEffect, useRef } from 'react'

const WORDS = [
  { text: 'Atopic Dermatitis', weight: 3 },
  { text: 'Psoriasis', weight: 3 },
  { text: 'IL-17', weight: 2 },
  { text: 'IL-4', weight: 2 },
  { text: 'IL-13', weight: 2 },
  { text: 'IL-22', weight: 2 },
  { text: 'RNA-seq', weight: 2 },
  { text: 'scRNA-seq', weight: 2 },
  { text: 'Th2', weight: 2 },
  { text: 'Th17', weight: 2 },
  { text: 'Genomics', weight: 3 },
  { text: 'Biomarkers', weight: 2 },
  { text: 'Machine Learning', weight: 3 },
  { text: 'Inflammation', weight: 3 },
  { text: 'Cytokines', weight: 2 },
  { text: 'Keratinocytes', weight: 1 },
  { text: 'TNF-α', weight: 1 },
  { text: 'IFN-γ', weight: 1 },
  { text: 'Dupilumab', weight: 1 },
  { text: 'Bioinformatics', weight: 2 },
  { text: 'Proteomics', weight: 1 },
  { text: 'Metabolomics', weight: 1 },
  { text: 'Biostatistics', weight: 2 },
  { text: 'Dendritic Cells', weight: 1 },
  { text: 'Molecular Phenotyping', weight: 2 },
  { text: 'Clinical Trials', weight: 1 },
  { text: 'IBD', weight: 2 },
  { text: 'Crohn\'s Disease', weight: 1 },
  { text: 'Ulcerative Colitis', weight: 1 },
  { text: 'XGBoost', weight: 1 },
  { text: 'Random Forest', weight: 1 },
  { text: 'GWAS', weight: 1 },
  { text: 'Multi-omics', weight: 1 },
  { text: 'Epidermal Barrier', weight: 1 },
  { text: 'Spongiosis', weight: 1 },
  { text: 'Microarrays', weight: 1 },
  { text: 'Treatment Response', weight: 1 },
  { text: 'Translational Medicine', weight: 2 },
  { text: 'Systems Biology', weight: 2 },
  { text: 'Deep Learning', weight: 1 },
  { text: 'Eczema', weight: 1 },
  { text: 'Heatmap', weight: 1 },
  { text: 'Volcano Plot', weight: 1 },
  { text: 'Gene Expression', weight: 2 },
  { text: 'T-cells', weight: 1 },
  { text: 'Skin Barrier', weight: 1 },
  { text: 'Acanthosis', weight: 1 },
  { text: 'Filaggrin', weight: 1 },
  { text: 'MELD', weight: 1 },
  { text: 'PCA', weight: 1 },
]

export default function WordCloud() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
      draw()
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Seed random for consistent placement
      let seed = 42
      const rand = () => {
        seed = (seed * 16807 + 0) % 2147483647
        return seed / 2147483647
      }

      const placed = []

      // Sort by weight (bigger words placed first)
      const sorted = [...WORDS].sort((a, b) => b.weight - a.weight)

      sorted.forEach((word) => {
        const fontSize = word.weight === 3 ? 28 + rand() * 14
          : word.weight === 2 ? 18 + rand() * 10
          : 12 + rand() * 6

        const angle = 0 // all horizontal

        ctx.font = `${Math.round(fontSize)}px Inter, sans-serif`
        const metrics = ctx.measureText(word.text)
        const textWidth = metrics.width
        const textHeight = fontSize

        // Content exclusion zone — the center area where actual content lives
        // max-w-6xl = 1152px, centered. We add padding so words stay in the margins.
        const contentWidth = Math.min(1152, canvas.width * 0.85)
        const contentLeft = (canvas.width - contentWidth) / 2
        const contentRight = contentLeft + contentWidth

        // Try to place in side margins only
        let bestX, bestY, found = false
        for (let attempt = 0; attempt < 100; attempt++) {
          let x, y
          // Place in left or right margin
          if (rand() > 0.5) {
            // Left margin
            x = rand() * Math.max(0, contentLeft - textWidth - 10) + 5
          } else {
            // Right margin
            x = contentRight + 10 + rand() * Math.max(0, canvas.width - contentRight - textWidth - 15)
          }
          y = rand() * (canvas.height - textHeight - 40) + textHeight + 20

          // Skip if x would put text in the content zone
          if (x + textWidth > contentLeft - 5 && x < contentRight + 5) continue

          // Check overlap with placed words
          let overlaps = false
          for (const p of placed) {
            if (
              x < p.x + p.w + 10 &&
              x + textWidth + 10 > p.x &&
              y - textHeight < p.y + 5 &&
              y + 5 > p.y - p.h
            ) {
              overlaps = true
              break
            }
          }

          if (!overlaps) {
            bestX = x
            bestY = y
            found = true
            break
          }
        }

        if (!found) {
          // Fallback: place in a margin anyway
          if (rand() > 0.5 && contentLeft > textWidth + 10) {
            bestX = rand() * (contentLeft - textWidth - 10) + 5
          } else if (canvas.width - contentRight > textWidth + 10) {
            bestX = contentRight + 10 + rand() * (canvas.width - contentRight - textWidth - 15)
          } else {
            return // skip this word if margins too narrow
          }
          bestY = rand() * (canvas.height - textHeight - 20) + textHeight + 10
        }

        placed.push({ x: bestX, y: bestY, w: textWidth, h: textHeight })

        // Draw
        ctx.save()
        ctx.translate(bestX + textWidth / 2, bestY - textHeight / 2)
        ctx.rotate(angle)

        const opacity = word.weight === 3 ? 0.14
          : word.weight === 2 ? 0.10
          : 0.07

        ctx.font = `${Math.round(fontSize)}px Inter, sans-serif`
        ctx.fillStyle = `rgba(120, 90, 70, ${opacity})`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(word.text, 0, 0)

        ctx.restore()
      })
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
