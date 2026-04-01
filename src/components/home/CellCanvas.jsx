import { useEffect, useRef } from 'react'

/*
  H&E Stained Skin Tissue — Suárez-Fariñas Lab
  ==============================================
  Optimized: ~400-600 cells total, spatial grid for mouse interaction,
  only cells near mouse get full update.
*/

const PALETTE = {
  corneum:    { r: 220, g: 200, b: 185 },
  granulosum: { r: 210, g: 175, b: 165 },
  spinosum:   { r: 205, g: 160, b: 155 },
  basale:     { r: 190, g: 140, b: 140 },
  boundary:   { r: 170, g: 130, b: 120 },
  nucleus:    { r: 80,  g: 50,  b: 120 },
  nucleusDark:{ r: 50,  g: 30,  b: 90  },
  inflamed:   { r: 220, g: 80,  b: 70  },
  dermis:     { r: 235, g: 215, b: 210 },
  collagen:   { r: 210, g: 185, b: 180 },
  vessel:     { r: 180, g: 50,  b: 55  },
  rbc:        { r: 200, g: 60,  b: 60  },
  edema:      { r: 245, g: 240, b: 238 },
  th2:        { r: 170, g: 35,  b: 45  },
  th17:       { r: 35,  g: 50,  b: 150 },
  th22:       { r: 170, g: 120, b: 20  },
  dendritic:  { r: 180, g: 135, b: 20  },
  il4:        { r: 180, g: 40,  b: 35  },
  il13:       { r: 160, g: 70,  b: 30  },
  il17:       { r: 30,  g: 60,  b: 170 },
  il22:       { r: 160, g: 120, b: 10  },
  tnfa:       { r: 150, g: 20,  b: 20  },
}

function rgba(c, a) { return `rgba(${c.r}, ${c.g}, ${c.b}, ${a})` }
function lerp(a, b, t) { return a + (b - a) * t }
function lerpColor(c1, c2, t) {
  return { r: Math.round(lerp(c1.r, c2.r, t)), g: Math.round(lerp(c1.g, c2.g, t)), b: Math.round(lerp(c1.b, c2.b, t)) }
}

// ============================================================
// TISSUE CELL
// ============================================================
class TissueCell {
  constructor(cx, cy, layer, mouse) {
    this.mouse = mouse
    this.baseCx = cx; this.baseCy = cy; this.cx = cx; this.cy = cy
    this.layer = layer
    this.inflamed = 0; this.spongiosis = 0
    this.phase = Math.random() * Math.PI * 2

    this.nucleusOff = { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 }
    this.nucleusSize = layer === 'corneum' ? 0 : layer === 'basale' ? 5 : layer === 'spinosum' ? 4.5 : 3.5

    this.granules = []
    if (layer === 'granulosum') {
      for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
        this.granules.push({ x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 6, size: 1 + Math.random() })
      }
    }

    // Pre-compute vertices for polygon shape
    this.sides = layer === 'corneum' ? 4 : layer === 'basale' ? 4 : layer === 'spinosum' ? 6 : 5
    this.vertexOffsets = Array.from({ length: this.sides }, () => 0.8 + Math.random() * 0.4)
  }

  update() {
    const dx = this.mouse.x - this.baseCx, dy = this.mouse.y - this.baseCy
    const d = Math.sqrt(dx * dx + dy * dy)
    const radius = 220

    if (d < radius) {
      const strength = (1 - d / radius)
      this.inflamed = Math.min(1, this.inflamed + 0.1 * strength)
      this.spongiosis = Math.min(1, this.spongiosis + 0.06 * strength)
      const push = strength * 6
      if (d > 0) { this.cx = this.baseCx + (dx / d) * push * -1; this.cy = this.baseCy + (dy / d) * push * -1 }
    } else {
      this.inflamed = Math.max(0, this.inflamed - 0.02)
      this.spongiosis = Math.max(0, this.spongiosis - 0.012)
      this.cx += (this.baseCx - this.cx) * 0.1
      this.cy += (this.baseCy - this.cy) * 0.1
    }
  }

  draw(ctx, time) {
    const fillMap = { corneum: PALETTE.corneum, granulosum: PALETTE.granulosum, spinosum: PALETTE.spinosum, basale: PALETTE.basale }
    const baseColor = fillMap[this.layer]
    const color = lerpColor(baseColor, PALETTE.inflamed, this.inflamed * 0.8)

    // Cell sizes per layer
    const sizeMap = { corneum: [32, 8], granulosum: [24, 20], spinosum: [26, 24], basale: [18, 26] }
    const [bw, bh] = sizeMap[this.layer]
    const gap = this.spongiosis * 4
    const w = (bw - gap) * 0.5
    const h = (bh - gap) * 0.5

    const wobX = Math.sin(time * 0.4 + this.phase) * 0.3
    const wobY = Math.cos(time * 0.3 + this.phase) * 0.3

    ctx.save()
    ctx.translate(this.cx + wobX, this.cy + wobY)

    // Alpha based on layer (high for light bg)
    const alpha = this.layer === 'corneum' ? 0.75 : 0.85
    const infAlpha = alpha + this.inflamed * 0.15

    if (this.layer === 'corneum') {
      // Flat squame — elongated ellipse
      ctx.beginPath()
      ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2)
    } else if (this.layer === 'basale') {
      // Columnar — tall rectangle with rounded edges
      ctx.beginPath()
      ctx.moveTo(-w, -h); ctx.lineTo(w, -h)
      ctx.lineTo(w + 1, h); ctx.lineTo(-w - 1, h)
      ctx.closePath()
    } else {
      // Polygonal — spinosum or granulosum
      ctx.beginPath()
      for (let i = 0; i <= this.sides; i++) {
        const angle = (i / this.sides) * Math.PI * 2 + this.phase * 0.05
        const r = (i % 2 === 0 ? w : w * this.vertexOffsets[i % this.sides])
        const rh = (i % 2 === 0 ? h : h * this.vertexOffsets[i % this.sides])
        const px = Math.cos(angle) * r, py = Math.sin(angle) * rh
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.closePath()
    }

    ctx.fillStyle = rgba(color, infAlpha)
    ctx.fill()
    ctx.strokeStyle = rgba(PALETTE.boundary, 0.35 + this.inflamed * 0.2)
    ctx.lineWidth = this.layer === 'corneum' ? 0.5 : 0.8 + this.inflamed * 0.4
    ctx.stroke()

    // Desmosome spines (spinosum when inflamed/spongiosis)
    if (this.layer === 'spinosum' && this.spongiosis > 0.15) {
      for (let i = 0; i < 3; i++) {
        const ang = this.phase + (i / 3) * Math.PI * 2
        const spLen = 2 + this.spongiosis * 6
        ctx.beginPath()
        ctx.moveTo(Math.cos(ang) * w * 0.7, Math.sin(ang) * h * 0.7)
        ctx.lineTo(Math.cos(ang) * (w + spLen), Math.sin(ang) * (h + spLen))
        ctx.strokeStyle = rgba(PALETTE.boundary, 0.2 * this.spongiosis)
        ctx.lineWidth = 0.4; ctx.stroke()
        // Desmosome plaque
        ctx.beginPath()
        ctx.arc(Math.cos(ang) * (w + spLen), Math.sin(ang) * (h + spLen), 1, 0, Math.PI * 2)
        ctx.fillStyle = rgba(PALETTE.boundary, 0.25 * this.spongiosis); ctx.fill()
      }
    }

    // Nucleus
    if (this.nucleusSize > 0) {
      ctx.beginPath()
      const nElong = this.layer === 'basale' ? 0.65 : 0.85
      ctx.ellipse(this.nucleusOff.x, this.nucleusOff.y, this.nucleusSize, this.nucleusSize * nElong, 0, 0, Math.PI * 2)
      ctx.fillStyle = rgba(PALETTE.nucleus, 0.8 + this.inflamed * 0.15)
      ctx.fill()
      // Nucleolus
      ctx.beginPath()
      ctx.arc(this.nucleusOff.x + this.nucleusSize * 0.2, this.nucleusOff.y, this.nucleusSize * 0.25, 0, Math.PI * 2)
      ctx.fillStyle = rgba(PALETTE.nucleusDark, 0.75)
      ctx.fill()
    }

    // Granules (granulosum)
    this.granules.forEach((g) => {
      ctx.beginPath(); ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2)
      ctx.fillStyle = rgba(PALETTE.nucleus, 0.25); ctx.fill()
    })

    // Inflammation glow
    if (this.inflamed > 0.1) {
      ctx.beginPath()
      ctx.arc(0, 0, Math.max(w, h) * 1.5, 0, Math.PI * 2)
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(w, h) * 1.5)
      glow.addColorStop(0, rgba(PALETTE.inflamed, this.inflamed * 0.2))
      glow.addColorStop(1, 'rgba(220, 80, 70, 0)')
      ctx.fillStyle = glow; ctx.fill()
    }

    ctx.restore()
  }
}

// ============================================================
// IMMUNE CELL
// ============================================================
class ImmuneCell {
  constructor(canvas, mouse, startY, subtype) {
    this.canvas = canvas; this.mouse = mouse; this.subtype = subtype
    this.x = Math.random() * canvas.width
    this.y = startY + Math.random() * 120
    this.radius = subtype === 'DC' ? 14 : 8 + Math.random() * 4
    this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3
    this.activated = 0; this.trail = []; this.phase = Math.random() * Math.PI * 2
    this.cytokineTimer = 0
    this.color = subtype === 'Th2' ? PALETTE.th2 : subtype === 'Th17' ? PALETTE.th17 : subtype === 'Th22' ? PALETTE.th22 : PALETTE.dendritic
    this.cytokines = subtype === 'Th2' ? ['IL-4', 'IL-13'] : subtype === 'Th17' ? ['IL-17', 'IL-22'] : subtype === 'Th22' ? ['IL-22', 'TNF-α'] : []
    this.arms = subtype === 'DC' ? Array.from({ length: 7 }, () => ({
      angle: Math.random() * Math.PI * 2, length: 18 + Math.random() * 20, wobblePhase: Math.random() * Math.PI * 2,
    })) : []
  }

  update(time) {
    const dx = this.mouse.x - this.x, dy = this.mouse.y - this.y
    const d = Math.sqrt(dx * dx + dy * dy)
    const detectRadius = 800 // detect from far away
    if (this.mouse.x > 0 && d < detectRadius && d > 10) {
      // Stronger force when closer, still pulls from far
      const strength = (1 - d / detectRadius)
      const force = 0.15 + strength * 0.25 // much stronger attraction
      this.vx += (dx / d) * strength * force
      this.vy += (dy / d) * strength * force
      this.activated = Math.min(1, this.activated + 0.04)
    } else {
      this.activated = Math.max(0, this.activated - 0.01)
      // Wander randomly when not chasing
      this.vx += (Math.random() - 0.5) * 0.05
      this.vy += (Math.random() - 0.5) * 0.05
    }
    const sp = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
    const maxSpeed = 3 + this.activated * 3 // much faster (3-6 px/frame)
    if (sp > maxSpeed) { this.vx = (this.vx / sp) * maxSpeed; this.vy = (this.vy / sp) * maxSpeed }
    this.vx *= 0.985; this.vy *= 0.985 // less damping
    this.x += this.vx; this.y += this.vy
    if (this.activated > 0.1) this.trail.push({ x: this.x, y: this.y, age: 0 })
    this.trail = this.trail.filter((t) => { t.age += 0.03; return t.age < 1 })
    if (this.x < -20) this.x = this.canvas.width + 20
    if (this.x > this.canvas.width + 20) this.x = -20
    this.cytokineTimer += this.activated * 0.06
  }

  shouldReleaseCytokine() {
    if (this.subtype === 'DC') return false
    if (this.activated > 0.35 && this.cytokineTimer > 1) { this.cytokineTimer = 0; return true }
    return false
  }

  getRandomCytokine() { return this.cytokines[Math.floor(Math.random() * this.cytokines.length)] }

  draw(ctx, time) {
    const c = this.color; const alpha = 0.85 + this.activated * 0.15

    this.trail.forEach((t) => {
      ctx.beginPath(); ctx.arc(t.x, t.y, 1.2 * (1 - t.age), 0, Math.PI * 2)
      ctx.fillStyle = rgba(c, 0.12 * (1 - t.age)); ctx.fill()
    })

    ctx.save(); ctx.translate(this.x, this.y)

    // DC arms
    if (this.subtype === 'DC') {
      this.arms.forEach((arm) => {
        const angle = arm.angle + Math.sin(time * 0.8 + arm.wobblePhase) * 0.15
        const len = arm.length * (1 + this.activated * 0.3)
        ctx.beginPath(); ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(Math.cos(angle) * len * 0.4 + Math.sin(time + arm.wobblePhase) * 2, Math.sin(angle) * len * 0.4, Math.cos(angle) * len, Math.sin(angle) * len)
        ctx.strokeStyle = rgba(c, alpha * 0.7); ctx.lineWidth = 1; ctx.stroke()
        ctx.beginPath(); ctx.arc(Math.cos(angle) * len, Math.sin(angle) * len, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = rgba(c, alpha); ctx.fill()
      })
    }

    // T-cell pseudopods
    if (this.subtype !== 'DC' && this.activated > 0.3) {
      for (let i = 0; i < 2; i++) {
        const angle = time * 1.5 + this.phase + i * Math.PI
        ctx.beginPath(); ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(Math.cos(angle) * this.radius * 0.5, Math.sin(angle) * this.radius * 0.5, Math.cos(angle) * this.radius * 1.4, Math.sin(angle) * this.radius * 1.4)
        ctx.strokeStyle = rgba(c, alpha * 0.5 * this.activated); ctx.lineWidth = 2; ctx.stroke()
      }
    }

    // Body
    ctx.beginPath(); ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = rgba(c, alpha * 0.85); ctx.fill()

    // Dark nucleus
    ctx.beginPath(); ctx.arc(0, 0, this.radius * 0.55, 0, Math.PI * 2)
    ctx.fillStyle = rgba(PALETTE.nucleusDark, alpha * 0.8); ctx.fill()

    // Label
    ctx.font = 'bold 9px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'
    ctx.fillStyle = rgba(c, 0.5 + this.activated * 0.4)
    ctx.fillText(this.subtype, 0, -this.radius - 4)

    ctx.restore()
  }
}

// ============================================================
// CYTOKINE
// ============================================================
class Cytokine {
  constructor(x, y, type) {
    this.x = x + (Math.random() - 0.5) * 15; this.y = y + (Math.random() - 0.5) * 15
    this.type = type; this.radius = 4; this.life = 1
    this.decay = 0.002 + Math.random() * 0.002
    const angle = Math.random() * Math.PI * 2; const speed = 0.2 + Math.random() * 0.5
    this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed - 0.2
    const map = { 'IL-4': PALETTE.il4, 'IL-13': PALETTE.il13, 'IL-17': PALETTE.il17, 'IL-22': PALETTE.il22, 'TNF-α': PALETTE.tnfa }
    this.color = map[type] || PALETTE.il4
  }
  update() { this.x += this.vx; this.y += this.vy; this.life -= this.decay }
  draw(ctx) {
    if (this.life <= 0) return
    ctx.beginPath(); ctx.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2)
    ctx.fillStyle = rgba(this.color, this.life * 0.9); ctx.fill()
    ctx.strokeStyle = rgba(this.color, this.life * 0.5); ctx.lineWidth = 0.5; ctx.stroke()
    if (this.life > 0.25) {
      ctx.font = 'bold 9px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'
      ctx.fillStyle = rgba(this.color, this.life * 0.95)
      ctx.fillText(this.type, this.x, this.y - this.radius * this.life - 3)
    }
  }
}

// ============================================================
// MAIN CANVAS
// ============================================================
export default function CellCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const handleMouseMove = (e) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY }
    const handleMouseLeave = () => { mouseRef.current.x = -1000; mouseRef.current.y = -1000 }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const W = canvas.width, H = canvas.height

    // Larger cells = fewer total (~400-600)
    const layerConfig = {
      corneum:    { yStart: H * 0.06, yEnd: H * 0.14, cellW: 36, cellH: 10, jX: 3, jY: 1 },
      granulosum: { yStart: H * 0.14, yEnd: H * 0.24, cellW: 28, cellH: 24, jX: 4, jY: 3 },
      spinosum:   { yStart: H * 0.24, yEnd: H * 0.44, cellW: 30, cellH: 28, jX: 4, jY: 3 },
      basale:     { yStart: H * 0.44, yEnd: H * 0.52, cellW: 20, cellH: 28, jX: 2, jY: 2 },
    }
    const basementY = H * 0.54
    const dermisY = H * 0.57

    const tissueCells = []
    Object.entries(layerConfig).forEach(([layer, cfg]) => {
      const rows = Math.max(1, Math.round((cfg.yEnd - cfg.yStart) / cfg.cellH))
      const cols = Math.ceil(W / cfg.cellW) + 1
      for (let row = 0; row < rows; row++) {
        const offset = (row % 2) * (cfg.cellW * 0.5)
        for (let col = 0; col < cols; col++) {
          const cx = col * cfg.cellW + offset + (Math.random() - 0.5) * cfg.jX
          const cy = cfg.yStart + row * cfg.cellH + cfg.cellH * 0.5 + (Math.random() - 0.5) * cfg.jY
          tissueCells.push(new TissueCell(cx, cy, layer, mouseRef.current))
        }
      }
    })

    console.log(`Total tissue cells: ${tissueCells.length}`)

    // Immune cells
    const immuneCells = [
      ...Array.from({ length: 8 }, () => new ImmuneCell(canvas, mouseRef.current, dermisY, 'Th2')),
      ...Array.from({ length: 6 }, () => new ImmuneCell(canvas, mouseRef.current, dermisY, 'Th17')),
      ...Array.from({ length: 3 }, () => new ImmuneCell(canvas, mouseRef.current, dermisY, 'Th22')),
      ...Array.from({ length: 4 }, () => new ImmuneCell(canvas, mouseRef.current, dermisY, 'DC')),
    ]

    const vessels = [
      { x: W * 0.08, y: dermisY + H * 0.15, w: W * 0.2 },
      { x: W * 0.45, y: dermisY + H * 0.2, w: W * 0.28 },
      { x: W * 0.8, y: dermisY + H * 0.12, w: W * 0.15 },
    ]

    let cytokines = []

    const legend = [
      { label: 'Th2 — Atopic Dermatitis', color: PALETTE.th2 },
      { label: 'Th17 — Psoriasis', color: PALETTE.th17 },
      { label: 'Th22', color: PALETTE.th22 },
      { label: 'Dendritic Cell', color: PALETTE.dendritic },
    ]

    const animate = (timestamp) => {
      const time = timestamp * 0.001
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x, my = mouseRef.current.y

      // Blood vessels
      vessels.forEach((v) => {
        for (let side = -1; side <= 1; side += 2) {
          ctx.beginPath()
          for (let x = v.x; x <= v.x + v.w; x += 3) {
            const yy = v.y + side * (4 + Math.sin(x * 0.04 + time * 0.5) * 1.5)
            if (x === v.x) ctx.moveTo(x, yy); else ctx.lineTo(x, yy)
          }
          ctx.strokeStyle = rgba(PALETTE.vessel, 0.15); ctx.lineWidth = 0.8; ctx.stroke()
        }
        // RBCs
        for (let i = 0; i < 5; i++) {
          const rx = v.x + ((time * 20 + i * (v.w / 5)) % v.w)
          const ry = v.y + Math.sin(time * 2 + i) * 2.5
          ctx.beginPath(); ctx.ellipse(rx, ry, 3, 1.5, 0, 0, Math.PI * 2)
          ctx.fillStyle = rgba(PALETTE.rbc, 0.25); ctx.fill()
        }
      })

      // Update only cells near mouse (+ always slowly decay others)
      tissueCells.forEach((cell) => {
        const d = Math.abs(cell.baseCx - mx) + Math.abs(cell.baseCy - my) // Manhattan distance, fast
        if (d < 300) {
          cell.update()
        } else if (cell.inflamed > 0 || cell.spongiosis > 0) {
          // Slowly return to normal
          cell.inflamed = Math.max(0, cell.inflamed - 0.015)
          cell.spongiosis = Math.max(0, cell.spongiosis - 0.01)
          cell.cx += (cell.baseCx - cell.cx) * 0.08
          cell.cy += (cell.baseCy - cell.cy) * 0.08
        }
        cell.draw(ctx, time)
      })

      // Basement membrane
      ctx.beginPath()
      for (let x = 0; x <= W; x += 3) {
        const wave = Math.sin(x * 0.012 + time * 0.2) * 5 + Math.sin(x * 0.025 + time * 0.3) * 2
        if (x === 0) ctx.moveTo(x, basementY + wave); else ctx.lineTo(x, basementY + wave)
      }
      ctx.strokeStyle = rgba(PALETTE.basale, 0.3); ctx.lineWidth = 1.5; ctx.stroke()

      // Layer labels
      ctx.font = '8px Inter, sans-serif'; ctx.textAlign = 'right'
      ctx.fillStyle = 'rgba(140, 110, 100, 0.3)'
      ctx.fillText('Str. Corneum', W - 10, layerConfig.corneum.yStart + 14)
      ctx.fillText('Str. Granulosum', W - 10, layerConfig.granulosum.yStart + 14)
      ctx.fillText('Str. Spinosum', W - 10, layerConfig.spinosum.yStart + 16)
      ctx.fillText('Str. Basale', W - 10, layerConfig.basale.yStart + 14)
      ctx.fillText('Dermis', W - 10, dermisY + 14)

      // Immune cells + cytokines
      immuneCells.forEach((ic) => {
        ic.update(time)
        if (ic.shouldReleaseCytokine()) cytokines.push(new Cytokine(ic.x, ic.y, ic.getRandomCytokine()))
        ic.draw(ctx, time)
      })

      if (cytokines.length > 100) cytokines = cytokines.slice(-100)
      cytokines.forEach((c) => { c.update(); c.draw(ctx) })
      cytokines = cytokines.filter((c) => c.life > 0)

      // Legend
      ctx.textAlign = 'left'; ctx.font = '8px Inter, sans-serif'
      legend.forEach((item, i) => {
        const ly = H - 65 + i * 14
        ctx.beginPath(); ctx.arc(16, ly - 2, 3, 0, Math.PI * 2)
        ctx.fillStyle = rgba(item.color, 0.7); ctx.fill()
        ctx.fillStyle = rgba(item.color, 0.5)
        ctx.fillText(item.label, 25, ly)
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId); window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: 'transparent' }} />
}
