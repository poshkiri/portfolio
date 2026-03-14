import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import styles from './Hero.module.css'

const TITLES = ['Junior Developer', 'React & Node.js', 'Telegram-боты', 'Ищу первую работу']

function useTypewriter(texts, typeSpeed = 80, deleteSpeed = 45, pause = 1600) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[index]

    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setIndex(i => (i + 1) % texts.length)
      return
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed
    const next = isDeleting
      ? current.slice(0, displayed.length - 1)
      : current.slice(0, displayed.length + 1)

    const t = setTimeout(() => setDisplayed(next), speed)
    return () => clearTimeout(t)
  }, [displayed, isDeleting, index, texts, typeSpeed, deleteSpeed, pause])

  return displayed
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const item = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  const title = useTypewriter(TITLES)

  function handleContactClick(e) {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p className={styles.greeting} variants={item}>
          Привет, я
        </motion.p>

        <motion.h1 className={styles.name} variants={item}>
          Максим Петруха
        </motion.h1>

        <motion.div className={styles.typewriterRow} variants={item}>
          <span className={styles.typewriter}>{title}</span>
          <span className={styles.cursor} aria-hidden="true">|</span>
        </motion.div>

        <motion.a
          href="#contact"
          className={styles.button}
          variants={item}
          onClick={handleContactClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Связаться
        </motion.a>
      </motion.div>

      <motion.div
        className={styles.scrollHint}
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        ↓ листай вниз
      </motion.div>
    </section>
  )
}
