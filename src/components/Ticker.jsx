import { motion } from 'motion/react'

const skills = [
  'React', 'JavaScript', 'Python', 'Node.js',
  'Supabase', 'Telegram Bots', 'Vercel', 'GitHub',
  'Cursor AI', 'HTML', 'CSS', 'REST API',
]

const items = [...skills, ...skills]

export function Ticker() {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '0.5px solid #ffffff15',
      borderBottom: '0.5px solid #ffffff15',
      padding: '14px 0',
      margin: '0',
    }}>
      <motion.div
        style={{ display: 'flex', gap: '2rem', width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((skill, i) => (
          <span
            key={i}
            style={{
              fontSize: '13px',
              color: i % 3 === 0 ? '#7F77DD' : i % 3 === 1 ? '#1D9E75' : '#ffffff40',
              whiteSpace: 'nowrap',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            {skill}{' '}
            <span style={{ color: '#ffffff20', margin: '0 0.5rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
