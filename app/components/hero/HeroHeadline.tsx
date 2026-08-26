'use client'

export default function HeroHeadline() {
  return (
    <div className="hero-headline">
      <p className="hero-eyebrow font-bold text-sm text-shadow-sm tracking-tight">Hi, I am John Mark</p>

      <div className="hero-words-stack">
        <h1 className="hero-word text-shadow-md">Fullstack</h1>
        <h1 className="hero-word text-shadow-md">Developer</h1>
        <h1 className="hero-word hero-word--highlight">Builders</h1>
      </div>

      <p className="hero-sub text-shadow-sm capitalize">
        I design, code, and deploy
        <br />
        full-stack digital solutions.
      </p>

      <a href="#" className="hero-cta">
        Download Resume <span aria-hidden="true"></span>
      </a>
    </div>
  )
}
