import HeroSection from './components/hero/HeroSection'
import ProjectsSection from './components/projects/ProjectsSection'
import SkillsSection from './components/skills/SkillsSection'
import ContactSection from './components/contact/ContactSection'
import FaqsSection from './components/faqs/FaqsSection'
import CtaBanner from './components/cta/CtaBanner'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <FaqsSection />
      <CtaBanner />
    </main>
  )
}
