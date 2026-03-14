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
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <PageTransition />
      <Spotlight />
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Counter />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}
