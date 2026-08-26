'use client'

export default function HeroHeadline() {
  return (
    <div className="hero-headline">
      <p className="hero-eyebrow font-bold">Hi, I am John Mark</p>

      <div className="hero-words-stack">
        <h1 className="hero-word text-shadow-md">Fullstack</h1>
        <h1 className="hero-word text-shadow-md">Software</h1>
        <h1 className="hero-word hero-word--highlight">Solutions</h1>
      </div>

      <p className="hero-sub font-bold">
        I design, code, and deploy
        <br />
        full-stack digital solutions.
      </p>

      <a href="#" className="hero-cta">
         Download Resume &rarr;
      </a>
    </div>
  )
}
