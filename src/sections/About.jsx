import { motion } from 'motion/react'
import styles from './About.module.css'

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

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>

        <motion.h2
          className={styles.heading}
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Обо мне
        </motion.h2>

        <motion.div
          className={styles.bio}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ borderLeft: 'none', position: 'relative', paddingLeft: '28px' }}
        >
          {/* Animated accent line */}
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

          <motion.p variants={item}>
            Самостоятельно осваиваю веб-разработку уже{' '}
            <strong>5 месяцев</strong>. Работаю с{' '}
            <strong>React, Node.js, Supabase</strong> и Telegram-ботами —
            от идеи до деплоя на Vercel.
          </motion.p>

          <motion.p variants={item}>
            Использую AI-инструменты (<strong>Cursor, ChatGPT</strong>) для
            ускорения обучения. Предпочитаю письменную коммуникацию — это
            делает меня идеальным кандидатом для удалённой async-команды.
          </motion.p>

          <motion.div className={styles.badge} variants={item}>
            <span className={styles.badgeDot} />
            Открыт к удалённой работе
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
