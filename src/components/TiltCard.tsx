import { useRef, CSSProperties, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

interface TiltCardProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export function TiltCard({ children, style, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const glowBackground = useTransform(
    [xSpring, ySpring],
    ([lx, ly]: number[]) =>
      `radial-gradient(circle at ${(lx + 0.5) * 100}% ${(ly + 0.5) * 100}%, rgba(127,119,221,0.15) 0%, transparent 70%)`
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: glowBackground,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  )
}
