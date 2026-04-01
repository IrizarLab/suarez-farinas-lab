import { useEffect, useRef } from 'react'

/*
  Inflammatory Cascade Reveal
  ============================
  Instead of covering with white, this creates a circular HOLE
  that expands outward. The new page is visible through the hole.
  The ring edge has the inflammatory red/golden effect.

  The canvas covers the screen and masks everything EXCEPT
  the expanding circle — revealing the page underneath.
*/

export default function InflammatoryTransition({ originX, originY, onComplete }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cx = originX || canvas.width / 2
    const cy = originY || canvas.height / 2

    const maxRadius = Math.sqrt(
      Math.max(cx, canvas.width - cx) ** 2 + Math.max(cy, canvas.height - cy) ** 2
    ) + 100

    let currentRadius = 0
    const speed = 10
    const ringWidth = 80
    let particles = []
    let done = false

    function spawnParticles(radius) {
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = radius + (Math.random() - 0.5) * ringWidth * 0.5
        particles.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          vx: Math.cos(angle) * (1 + Math.random() * 2),
          vy: Math.sin(angle) * (1 + Math.random() * 2),
          radius: 2 + Math.random() * 3,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          color: Math.random() > 0.5
            ? { r: 200, g: 60 + Math.random() * 30, b: 45 }
            : { r: 230, g: 130 + Math.random() * 50, b: 30 },
        })
      }
    }

    function animate() {
      if (done) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      currentRadius += speed

      if (currentRadius < maxRadius + ringWidth) {
        // Draw the MASK — cover everything except the expanding circle
        // This reveals the page underneath through the hole
        ctx.save()

        // Fill entire canvas with the landing page color
        ctx.fillStyle = '#f5f0ec'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Cut out the expanding circle (reveal hole)
        ctx.globalCompositeOperation = 'destination-out'
        const holeRadius = Math.max(0, currentRadius - ringWidth * 0.3)

        // Soft edge for the hole
        const holeGrad = ctx.createRadialGradient(cx, cy, Math.max(0, holeRadius - 20), cx, cy, holeRadius)
        holeGrad.addColorStop(0, 'rgba(0,0,0,1)')
        holeGrad.addColorStop(0.7, 'rgba(0,0,0,1)')
        holeGrad.addColorStop(1, 'rgba(0,0,0,0.8)')
        ctx.beginPath()
        ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2)
        ctx.fillStyle = holeGrad
        ctx.fill()

        ctx.restore()

        // Draw the inflammatory ring on top
        ctx.save()
        const innerR = Math.max(0, currentRadius - ringWidth)
        const outerR = currentRadius

        ctx.beginPath()
        ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
        if (innerR > 0) {
          ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true)
        }
        ctx.closePath()

        const intensity = Math.max(0.15, 1 - currentRadius / maxRadius)
        const grad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR)
        grad.addColorStop(0, `rgba(250, 240, 235, 0)`)
        grad.addColorStop(0.15, `rgba(220, 70, 55, ${0.5 * intensity})`)
        grad.addColorStop(0.4, `rgba(200, 50, 40, ${0.7 * intensity})`)
        grad.addColorStop(0.6, `rgba(240, 150, 40, ${0.4 * intensity})`)
        grad.addColorStop(0.85, `rgba(200, 50, 40, ${0.3 * intensity})`)
        grad.addColorStop(1, 'rgba(245, 240, 236, 0)')
        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()

        // Spawn particles
        if (currentRadius % 4 < speed) {
          spawnParticles(currentRadius)
        }
      } else {
        // Wave has passed — we're done
        done = true
        onComplete()
        return
      }

      // Draw particles (on top of everything)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.97
        p.vy *= 0.97
        p.life -= p.decay

        if (p.life > 0) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life * 0.7})`
          ctx.fill()
        }
      })
      particles = particles.filter((p) => p.life > 0)

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [originX, originY, onComplete])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
