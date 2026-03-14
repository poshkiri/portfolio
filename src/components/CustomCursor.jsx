import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    function onMove(e) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    function onOver(e) {
      if (e.target.closest('[data-cursor="hover"]')) setIsHover(true)
    }

    function onOut(e) {
      if (e.target.closest('[data-cursor="hover"]')) setIsHover(false)
    }

    function onDown() { setIsClick(true)  }
    function onUp()   { setIsClick(false) }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout',  onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout',  onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [mouseX, mouseY])

  const dotScale  = isClick ? 0.8 : 1
  const ringScale = isClick ? 0.8 : isHover ? 2.5 : 1
  const ringColor = isHover ? '#1D9E75' : '#7F77DD'

  return (
    <>
      <motion.div
        className={styles.dot}
        style={{ x: mouseX, y: mouseY }}
        animate={{ scale: dotScale }}
        transition={{ duration: 0.12 }}
      />

      <motion.div
        className={styles.ring}
        style={{ x: springX, y: springY }}
        animate={{ scale: ringScale, borderColor: ringColor }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
