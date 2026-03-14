import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import styles from './Navbar.module.css'

const LINKS = [
  { label: 'Обо мне',  id: 'about'    },
  { label: 'Навыки',   id: 'skills'   },
  { label: 'Проекты',  id: 'projects' },
  { label: 'Связаться',id: 'contact'  },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const topLine    = { closed: { rotate: 0,   y: 0  }, open: { rotate: 45,  y: 7  } }
const midLine    = { closed: { opacity: 1, scaleX: 1 }, open: { opacity: 0, scaleX: 0 } }
const bottomLine = { closed: { rotate: 0,   y: 0  }, open: { rotate: -45, y: -7 } }

const mobileMenu = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -16, transition: { duration: 0.22, ease: 'easeIn' } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let prevY = window.scrollY

    function onScroll() {
      const y = window.scrollY
      if (y < 20)       setScrolled(false)
      else if (y > prevY) setScrolled(true)
      else                setScrolled(false)
      prevY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLink(id) {
    setOpen(false)
    setTimeout(() => scrollTo(id), open ? 300 : 0)
  }

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <span className={styles.logo}>MP</span>

          <nav className={styles.links}>
            {LINKS.map(({ label, id }) => (
              <button key={id} className={styles.link} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </nav>

          <motion.button
            className={styles.burger}
            onClick={() => setOpen(v => !v)}
            animate={open ? 'open' : 'closed'}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            <motion.span className={styles.burgerLine} variants={topLine}
              transition={{ duration: 0.3 }} />
            <motion.span className={styles.burgerLine} variants={midLine}
              transition={{ duration: 0.2 }} />
            <motion.span className={styles.burgerLine} variants={bottomLine}
              transition={{ duration: 0.3 }} />
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileMenu}
            variants={mobileMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {LINKS.map(({ label, id }) => (
              <button key={id} className={styles.mobileLink} onClick={() => handleLink(id)}>
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
