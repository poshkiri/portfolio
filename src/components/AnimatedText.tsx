import { motion } from 'motion/react'

interface AnimatedTextProps {
  text: string
  type?: 'word' | 'letter'
  delay?: number
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
}

const letterVariant = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function AnimatedText({ text, type = 'letter', delay = 0 }: AnimatedTextProps) {
  const items = type === 'word' ? text.split(' ') : text.split('')
  const isWord = type === 'word'

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{ display: 'inline-block' }}
      custom={delay}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={letterVariant}
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            color: 'var(--color-text)',
            WebkitTextFillColor: 'var(--color-text)',
            marginRight: isWord ? '0.25em' : 0,
          }}
        >
          {item}
        </motion.span>
      ))}
    </motion.span>
  )
}
