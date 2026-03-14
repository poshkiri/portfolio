import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotsRef = useRef([])
  const mouse = useRef({ x: -999, y: -999 })
  const trail = useRef(Array.from({ length: 20 }, () => ({ x: -999, y: -999 })))

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMove)

    let animId
    function animate() {
      trail.current[0].x += (mouse.current.x - trail.current[0].x) * 0.4
      trail.current[0].y += (mouse.current.y - trail.current[0].y) * 0.4

      for (let i = 1; i < trail.current.length; i++) {
        trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * 0.35
        trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * 0.35
      }

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        const t = trail.current[i]
        const scale = 1 - i / trail.current.length
        const opacity = (1 - i / trail.current.length) * 0.8
        dot.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%) scale(${scale})`
        dot.style.opacity = opacity
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
      {trail.current.map((_, i) => (
        <div
          key={i}
          ref={el => { dotsRef.current[i] = el }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: i === 0 ? '10px' : `${Math.max(4, 10 - i * 0.4)}px`,
            height: i === 0 ? '10px' : `${Math.max(4, 10 - i * 0.4)}px`,
            borderRadius: '50%',
            background: i === 0
              ? '#ffffff'
              : `rgba(127, 119, 221, ${1 - i / 20})`,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
