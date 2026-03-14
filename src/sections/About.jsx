import { motion } from 'motion/react'
import { AnimatedText } from '../components/AnimatedText'
import styles from './About.module.css'

const t = {
  ru: {
    title: 'Обо мне',
    badge: 'Открыт к удалённой работе',
    p1: <>Самостоятельно осваиваю веб-разработку уже{' '}<strong>5 месяцев</strong>. Работаю с{' '}<strong>React, Node.js, Supabase</strong> и Telegram-ботами — от идеи до деплоя на Vercel.</>,
    p2: <>Использую AI-инструменты (<strong>Cursor, ChatGPT</strong>) для ускорения обучения. Предпочитаю письменную коммуникацию — это делает меня идеальным кандидатом для удалённой async-команды.</>,
  },
  en: {
    title: 'About me',
    badge: 'Open to remote work',
    p1: <>Self-taught web developer for{' '}<strong>5 months</strong>. Working with{' '}<strong>React, Node.js, Supabase</strong> and Telegram bots — from idea to deploy on Vercel.</>,
    p2: <>I use AI tools (<strong>Cursor, ChatGPT</strong>) to accelerate learning. I prefer written communication — which makes me an ideal candidate for a remote async team.</>,
  },
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.05 },
  },
}

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const lineReveal = {
  hidden:  { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function About({ lang = 'ru' }) {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>

        <h2 className={styles.heading}>
          <AnimatedText text={t[lang].title} type="word" delay={0.2} />
        </h2>

        <motion.div
          className={styles.bio}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ borderLeft: 'none', position: 'relative', paddingLeft: '28px' }}
        >
          <motion.span
            aria-hidden="true"
            variants={lineReveal}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              borderRadius: '2px',
              background: 'var(--color-purple)',
            }}
          />

          <motion.p variants={item}>{t[lang].p1}</motion.p>
          <motion.p variants={item}>{t[lang].p2}</motion.p>

          <motion.div className={styles.badge} variants={item}>
            <span className={styles.badgeDot} />
            {t[lang].badge}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
