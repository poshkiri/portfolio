import { useEffect, useRef } from 'react'

export function Spotlight() {
  const spotRef = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      if (!spotRef.current) return
      spotRef.current.style.background = `radial-gradient(
        600px circle at ${e.clientX}px ${e.clientY}px,
        rgba(127, 119, 221, 0.08),
        transparent 40%
      )`
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={spotRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'background 0.1s ease',
      }}
    />
  )
}
