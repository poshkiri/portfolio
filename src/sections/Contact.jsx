import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import emailjs from '@emailjs/browser'
import { AnimatedText } from '../components/AnimatedText'
import styles from './Contact.module.css'

const t = {
  ru: {
    title:    'Связаться',
    subtitle: 'Открыт к стажировке и позиции junior-разработчика.\nПредпочитаю письменную коммуникацию — отвечу быстро.',
    name:     'Ваше имя',
    email:    'Ваш email',
    message:  'Сообщение',
    send:     'Отправить сообщение',
    sending:  'Отправляю...',
    success:  '✓ Отправлено!',
    error:    'Ошибка, попробуй снова',
  },
  en: {
    title:    'Contact',
    subtitle: 'Open to internship and junior developer positions.\nI prefer written communication — will respond quickly.',
    name:     'Your name',
    email:    'Your email',
    message:  'Message',
    send:     'Send message',
    sending:  'Sending...',
    success:  '✓ Sent!',
    error:    'Error, please try again',
  },
}

const SERVICE_ID  = 'service_esj7dcl'
const TEMPLATE_ID = 'template_eun07eo'
const PUBLIC_KEY  = 'a4WMtsgjFGQGmYbwr'

const LINKS = [
  { icon: '✈️', label: 'Telegram', url: 'https://t.me/poshkiri'              },
  { icon: '📧', label: 'Email',    url: 'mailto:mppamaksnm2018@gmail.com'     },
  { icon: '🐙', label: 'GitHub',   url: 'https://github.com/poshkiri'        },
]

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const linkItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const fieldStyle = {
  width: '100%',
  padding: '12px 16px',
  background: '#1a1a1a',
  border: '1px solid #ffffff15',
  borderRadius: 8,
  color: '#fff',
  fontSize: 14,
  fontFamily: 'inherit',
  marginBottom: 12,
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

const submitColors = {
  idle:     { bg: 'transparent',  text: '#7F77DD', border: '#7F77DD' },
  sending:  { bg: 'transparent',  text: '#888',    border: '#555'    },
  success:  { bg: '#1D9E75',      text: '#fff',    border: '#1D9E75' },
  error:    { bg: '#E24B4A',      text: '#fff',    border: '#E24B4A' },
}

const submitLabels = (tr) => ({
  idle:    tr.send,
  sending: tr.sending,
  success: tr.success,
  error:   tr.error,
})

export default function Contact({ lang = 'ru' }) {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const tr = t[lang]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      e.target.reset()
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const colors = submitColors[status]
  const labels = submitLabels(tr)

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>

        <h2 className={styles.heading}>
          <AnimatedText text={tr.title} type="word" />
        </h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          {tr.subtitle.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </motion.p>

        {/* ── Contact form ── */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: 480, margin: '0 auto 2rem' }}
        >
          <input
            name="from_name"
            type="text"
            placeholder={tr.name}
            required
            style={fieldStyle}
            onFocus={e => { e.target.style.borderColor = '#7F77DD' }}
            onBlur={e  => { e.target.style.borderColor = '#ffffff15' }}
          />
          <input
            name="from_email"
            type="email"
            placeholder={tr.email}
            required
            style={fieldStyle}
            onFocus={e => { e.target.style.borderColor = '#7F77DD' }}
            onBlur={e  => { e.target.style.borderColor = '#ffffff15' }}
          />
          <textarea
            name="message"
            placeholder={tr.message}
            rows={4}
            required
            style={{ ...fieldStyle, resize: 'vertical' }}
            onFocus={e => { e.target.style.borderColor = '#7F77DD' }}
            onBlur={e  => { e.target.style.borderColor = '#ffffff15' }}
          />
          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            style={{
              width: '100%',
              padding: '13px 24px',
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              color: colors.text,
              fontSize: '0.95rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              transition: 'background 0.25s, color 0.25s, border-color 0.25s',
            }}
          >
            {labels[status]}
          </motion.button>
        </motion.form>

        {/* ── Social links ── */}
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
