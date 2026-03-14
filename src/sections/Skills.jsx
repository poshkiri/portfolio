import { motion } from 'motion/react'
import styles from './Skills.module.css'

const SKILLS = [
  { icon: '⚛️',  name: 'React',        level: 'Изучаю активно'      },
  { icon: '🟨',  name: 'JavaScript',   level: 'Базовый уровень'     },
  { icon: '🐍',  name: 'Python',       level: 'Базовый уровень'     },
  { icon: '🟢',  name: 'Node.js',      level: 'Базовый уровень'     },
  { icon: '🗄️', name: 'Supabase',     level: 'Работаю с БД и auth' },
  { icon: '🤖',  name: 'Telegram Bots',level: 'Пишу с нуля'        },
  { icon: '🚀',  name: 'Vercel',       level: 'Деплой проектов'     },
  { icon: '🐙',  name: 'GitHub',       level: 'Версионирование'     },
  { icon: '🧠',  name: 'Cursor / AI',  level: 'Vibe engineering'    },
]

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Навыки
        </motion.h2>

        <motion.div
          className={styles.grid}
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SKILLS.map(({ icon, name, level }) => (
            <motion.div
              key={name}
              className={styles.card}
              variants={card}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className={styles.icon} aria-hidden="true">{icon}</span>
              <span className={styles.name}>{name}</span>
              <span className={styles.level}>{level}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
