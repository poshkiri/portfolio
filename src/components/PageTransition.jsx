import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

export function PageTransition() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0e0e0e',
            zIndex: 99999,
            transformOrigin: 'top',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#7F77DD',
              letterSpacing: '0.05em',
            }}
          >
            MP
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
