import { MotionConfig } from 'motion/react';
import Header from './components/Header.jsx';
import Hero from './sections/Hero.jsx';
import Philosophy from './sections/Philosophy.jsx';
import Ecosystem from './sections/Ecosystem.jsx';
import Work from './sections/Work.jsx';
import Talks from './sections/Talks.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';

export default function App() {
  return (
    // reducedMotion="user" makes every Motion animation honour the OS setting.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Philosophy />
        <Ecosystem />
        <Work />
        <Talks />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
