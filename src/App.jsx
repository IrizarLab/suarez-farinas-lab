import { useState, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import InflammatoryTransition from './components/home/InflammatoryTransition'
import Landing from './pages/Landing'
import Lab from './pages/Lab'
import Research from './pages/Research'
import Team from './pages/Team'
import Publications from './pages/Publications'
import Contact from './pages/Contact'

function App() {
  const [transition, setTransition] = useState(null) // { x, y } or null
  const navigate = useNavigate()

  const triggerTransition = useCallback((x, y) => {
    setTransition({ x, y })
    // Navigate instantly — the canvas mask hides the landing,
    // and the expanding hole reveals the lab page underneath
    navigate('/lab')
  }, [navigate])

  const handleTransitionDone = useCallback(() => {
    setTransition(null)
  }, [])

  return (
    <>
      {/* Transition overlay — persists across route changes */}
      {transition && (
        <InflammatoryTransition
          originX={transition.x}
          originY={transition.y}
          onComplete={handleTransitionDone}
        />
      )}

      <Routes>
        <Route path="/" element={<Landing onEnter={triggerTransition} />} />
        <Route element={<Layout />}>
          <Route path="lab" element={<Lab />} />
          <Route path="research" element={<Research />} />
          <Route path="team" element={<Team />} />
          <Route path="publications" element={<Publications />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
