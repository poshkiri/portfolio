import { motion } from 'motion/react'
import styles from './Contact.module.css'

const LINKS = [
  { icon: '✈️', label: 'Telegram', url: 'https://t.me/poshkiri'                   },
  { icon: '📧', label: 'Email',    url: 'mailto:mppamaksnm2018@gmail.com'          },
  { icon: '🐙', label: 'GitHub',   url: 'https://github.com/poshkiri'             },
]

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const linkItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Связаться
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          Открыт к стажировке и позиции junior-разработчика.
          <br />
          Предпочитаю письменную коммуникацию — отвечу быстро.
        </motion.p>

        <motion.div
          className={styles.buttons}
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {LINKS.map(({ icon, label, url }) => (
            <motion.a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
              variants={linkItem}
              style={{
                backgroundColor: 'rgba(127, 119, 221, 0)',
                color: '#7F77DD',
              }}
              whileHover={{
                backgroundColor: 'rgba(127, 119, 221, 1)',
                color: '#ffffff',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              data-cursor="hover"
            >
              <span className={styles.buttonIcon} aria-hidden="true">{icon}</span>
              {label}
            </motion.a>
          ))}
        </motion.div>

        <p className={styles.footer}>
          © 2025 Максим Петруха — сделано с React + Motion
        </p>

      </div>
    </section>
  )
}
