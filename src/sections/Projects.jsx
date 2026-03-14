import { motion } from 'motion/react'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    title: 'Telegram-боты',
    description:
      'Разработка ботов на Python и Node.js — команды, логика, интеграции с внешними API.',
    tags: ['Python', 'Node.js', 'Telegram API'],
    status: 'В портфолио',
  },
  {
    title: 'Веб-приложения',
    description:
      'Фронтенд на React, бэкенд и база данных через Supabase, деплой на Vercel.',
    tags: ['React', 'Supabase', 'Vercel'],
    status: 'В портфолио',
  },
  {
    title: 'Это портфолио',
    description:
      'Личный лендинг с анимациями на Motion. Спроектирован и построен с нуля.',
    tags: ['React', 'Motion', 'Vite'],
    status: 'Текущий проект',
  },
]

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden:  { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Проекты
        </motion.h2>

        <motion.div
          className={styles.grid}
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map(({ title, description, tags, status }) => (
            <motion.div
              key={title}
              className={styles.card}
              variants={card}
              whileHover={{
                y: -4,
                boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.title}>{title}</span>
                <span
                  className={
                    status === 'Текущий проект'
                      ? `${styles.status} ${styles.statusCurrent}`
                      : `${styles.status} ${styles.statusDefault}`
                  }
                >
                  {status}
                </span>
              </div>

              <p className={styles.description}>{description}</p>

              <div className={styles.tags}>
                {tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
