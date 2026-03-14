import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { AnimatedText } from '../components/AnimatedText'
import { TiltCard } from '../components/TiltCard'
import styles from './Projects.module.css'

const t = {
  ru: { title: 'Проекты',  noDesc: 'Нет описания',  openRepo: 'Открыть на GitHub →', allRepos: 'Все репозитории на GitHub →', error: 'Не удалось загрузить репозитории. Попробуйте позже.' },
  en: { title: 'Projects', noDesc: 'No description', openRepo: 'Open on GitHub →',   allRepos: 'All repositories on GitHub →', error: 'Failed to load repositories. Please try again later.' },
}

const langColors = {
  JavaScript: '#F7DF1E',
  Python:     '#3776AB',
  TypeScript: '#3178C6',
  HTML:       '#E34F26',
  CSS:        '#1572B6',
  default:    '#7F77DD',
}

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden:  { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
}

function SkeletonCard() {
  return (
    <motion.div
      className={styles.card}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ gap: 16 }}
    >
      <div style={{ height: 20, width: '60%', borderRadius: 6, background: '#2a2a2a' }} />
      <div style={{ height: 14, width: '100%', borderRadius: 6, background: '#2a2a2a' }} />
      <div style={{ height: 14, width: '80%', borderRadius: 6, background: '#2a2a2a' }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <div style={{ height: 24, width: 64, borderRadius: 999, background: '#2a2a2a' }} />
        <div style={{ height: 24, width: 48, borderRadius: 999, background: '#2a2a2a' }} />
      </div>
    </motion.div>
  )
}

export default function Projects({ lang = 'ru' }) {
  const [repos, setRepos]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    fetch('https://api.github.com/users/poshkiri/repos?sort=updated&per_page=6')
      .then(res => {
        if (!res.ok) throw new Error('GitHub API error')
        return res.json()
      })
      .then(data => {
        const filtered = data.filter(
          r => !r.fork && r.name !== 'poshkiri'
        )
        setRepos(filtered)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const capitalize = str =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ')

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>

        <h2 className={styles.heading}>
          <AnimatedText text={t[lang].title} type="word" />
        </h2>

        {error && (
          <p style={{ color: 'var(--color-muted)', marginBottom: 24 }}>
            {t[lang].error}
          </p>
        )}

        {loading ? (
          <div className={styles.grid}>
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className={styles.grid}
            variants={grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {repos.map(repo => (
              <motion.div key={repo.id} variants={card}>
                <TiltCard className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.title}>{capitalize(repo.name)}</span>
                    {repo.stargazers_count > 0 && (
                      <span className={styles.statusDefault} style={{
                        padding: '3px 10px',
                        borderRadius: 999,
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}>
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                  </div>

                  <p className={styles.description}>
                    {repo.description || t[lang].noDesc}
                  </p>

                  <div className={styles.tags}>
                    {repo.language && (
                      <span className={styles.tag} style={{
                        color: langColors[repo.language] ?? langColors.default,
                        background: `${langColors[repo.language] ?? langColors.default}20`,
                      }}>
                        {repo.language}
                      </span>
                    )}
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repoLink}
                  >
                    {t[lang].openRepo}
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href="https://github.com/poshkiri"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1D9E75',
              textDecoration: 'none',
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
            }}
          >
            {t[lang].allRepos}
          </a>
        </div>

      </div>
    </section>
  )
}
