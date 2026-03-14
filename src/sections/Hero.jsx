import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { AnimatedText } from '../components/AnimatedText'
import { ParticleBackground } from '../components/ParticleBackground'
import styles from './Hero.module.css'

const TITLES = {
  ru: ['Junior Developer', 'React & Node.js', 'Telegram-боты', 'Ищу первую работу'],
  en: ['Junior Developer', 'React & Node.js', 'Telegram bots', 'Looking for first job'],
}

const t = {
  ru: { greeting: 'ПРИВЕТ, Я', button: 'Связаться',   scroll: '↓ листай вниз'  },
  en: { greeting: "HI, I'M",   button: 'Contact me',  scroll: '↓ scroll down'  },
}

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

export default function Hero({ lang = 'ru' }) {
  const title = useTypewriter(TITLES[lang])
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY       = useTransform(scrollYProgress, [0, 1],   [0, -100])
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  function handleContactClick(e) {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className={styles.hero}>
      <ParticleBackground />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ y: parallaxY, opacity: parallaxOpacity, width: '100%', textAlign: 'center' }}
      >
        <motion.p className={styles.greeting} variants={item}>
          {t[lang].greeting}
        </motion.p>

        <h1 className={styles.name} style={{ WebkitTextFillColor: 'unset' }}>
          <AnimatedText text="Максим Петруха" type="letter" />
        </h1>

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
          data-cursor="hover"
        >
          {t[lang].button}
        </motion.a>
      </motion.div>
      </div>

      <motion.div
        className={styles.scrollHint}
        style={{ position: 'relative', zIndex: 1 }}
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {t[lang].scroll}
      </motion.div>
    </section>
  )
}
