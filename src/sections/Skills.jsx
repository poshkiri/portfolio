import { motion } from 'motion/react'
import { AnimatedText } from '../components/AnimatedText'
import { TiltCard } from '../components/TiltCard'
import styles from './Skills.module.css'

const SKILLS = [
  { icon: '⚛️',  name: 'React',         level: { ru: 'Изучаю активно',       en: 'Actively learning'   } },
  { icon: '🟨',  name: 'JavaScript',    level: { ru: 'Базовый уровень',       en: 'Basic level'         } },
  { icon: '🐍',  name: 'Python',        level: { ru: 'Базовый уровень',       en: 'Basic level'         } },
  { icon: '🟢',  name: 'Node.js',       level: { ru: 'Базовый уровень',       en: 'Basic level'         } },
  { icon: '🗄️', name: 'Supabase',      level: { ru: 'Работаю с БД и auth',   en: 'DB & auth'           } },
  { icon: '🤖',  name: 'Telegram Bots', level: { ru: 'Пишу с нуля',           en: 'Building from scratch'} },
  { icon: '🚀',  name: 'Vercel',        level: { ru: 'Деплой проектов',       en: 'Project deploy'      } },
  { icon: '🐙',  name: 'GitHub',        level: { ru: 'Версионирование',       en: 'Version control'     } },
  { icon: '🧠',  name: 'Cursor / AI',   level: { ru: 'Vibe engineering',      en: 'Vibe engineering'    } },
]

const t = {
  ru: { title: 'Навыки' },
  en: { title: 'Skills' },
}

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Skills({ lang = 'ru' }) {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>

        <h2 className={styles.heading}>
          <AnimatedText text={t[lang].title} type="word" />
        </h2>

        <motion.div
          className={styles.grid}
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SKILLS.map(({ icon, name, level }) => (
            <motion.div key={name} variants={card}>
              <TiltCard className={styles.card}>
                <span className={styles.icon} aria-hidden="true">{icon}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text)' }}>
                    {name}
                  </span>
                  <span style={{ fontSize: '12px', color: '#1D9E75' }}>
                    {level[lang]}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
