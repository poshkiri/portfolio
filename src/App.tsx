import { useState } from 'react'
import './styles/global.css'
import { PageTransition } from './components/PageTransition'
import { Spotlight } from './components/Spotlight'
import Navbar from './components/Navbar'
import { Ticker } from './components/Ticker'
import Hero from './sections/Hero'
import About from './sections/About'
import { Counter } from './components/Counter'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function App() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru')
  const toggleLang = () => setLang(l => l === 'ru' ? 'en' : 'ru')

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <PageTransition />
      <Spotlight />
      <Navbar lang={lang} onLangToggle={toggleLang} />
      <Hero lang={lang} />
      <Ticker />
      <About lang={lang} />
      <Counter />
      <Skills lang={lang} />
      <Projects lang={lang} />
      <Contact lang={lang} />
    </div>
  )
}
