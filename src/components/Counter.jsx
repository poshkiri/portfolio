import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

function AnimatedNumber({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export function Counter() {
  const stats = [
    { number: 5,   suffix: '+',  label: 'месяцев опыта'      },
    { number: 3,   suffix: '',   label: 'проекта в портфолио' },
    { number: 10,  suffix: '+',  label: 'технологий в стеке'  },
    { number: 100, suffix: '%',  label: 'удалённая работа'    },
  ]

  return (
    <section style={{
      padding: '4rem 2rem',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
        borderTop: '0.5px solid #ffffff10',
        borderBottom: '0.5px solid #ffffff10',
        padding: '3rem 0',
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: 700,
              color: i % 2 === 0 ? '#7F77DD' : '#1D9E75',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              <AnimatedNumber
                target={stat.number}
                suffix={stat.suffix}
                duration={1800}
              />
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: '#ffffff50',
              letterSpacing: '0.05em',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
