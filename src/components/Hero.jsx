import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'

/* ── roles for typewriter cycle ── */
const ROLES = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Engineer',
]

/* ── tiny floating particle ── */
const Particle = ({ style }) => (
  <span className="hero-particle" style={style} />
)

const Hero = () => {
  const sectionRef = useRef(null)
  const greetRef = useRef(null)
  const nameRef = useRef(null)
  const roleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const socialRef = useRef(null)
  const cardRef = useRef(null)
  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)
  const blob3Ref = useRef(null)
  const scrollRef = useRef(null)
  const cursorRef = useRef(null)

  /* typewriter state */
  const [displayRole, setDisplayRole] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const typeTimerRef = useRef(null)

  /* ── Typewriter effect ── */
  useEffect(() => {
    const target = ROLES[roleIdx]
    const speed = isDeleting ? 45 : 90

    typeTimerRef.current = setTimeout(() => {
      setDisplayRole(prev => {
        if (!isDeleting) {
          const next = target.slice(0, prev.length + 1)
          if (next === target) {
            setTimeout(() => setIsDeleting(true), 1400)
          }
          return next
        } else {
          const next = prev.slice(0, -1)
          if (next === '') {
            setIsDeleting(false)
            setRoleIdx(i => (i + 1) % ROLES.length)
          }
          return next
        }
      })
    }, speed)

    return () => clearTimeout(typeTimerRef.current)
  }, [displayRole, roleIdx, isDeleting])

  /* ── GSAP entrance ── */
  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {

      /* blobs float */
      gsap.to(blob1Ref.current, { x: 50, y: -40, scale: 1.2, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(blob2Ref.current, { x: -60, y: 50, scale: 1.15, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 })
      gsap.to(blob3Ref.current, { x: 30, y: 30, scale: 1.1, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 })

      /* card gentle float */
      gsap.to(cardRef.current, {
        y: -14,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      /* entrance timeline */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(greetRef.current, { y: 30, opacity: 0, duration: 0.7 })
        .from(nameRef.current, { y: 50, opacity: 0, duration: 0.8 }, '-=0.4')
        .from(roleRef.current, { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(descRef.current, { y: 24, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(ctaRef.current?.querySelectorAll('.hero-btn'),
          { y: 28, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.3')
        .from(socialRef.current?.querySelectorAll('a'),
          { scale: 0, opacity: 0, stagger: 0.09, duration: 0.5 }, '-=0.3')
        .from(cardRef.current,
          { x: 60, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.6')
        .from(scrollRef.current,
          { opacity: 0, y: -10, duration: 0.6 }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* generate random particles once */
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      opacity: 0.15 + Math.random() * 0.25,
      animationDelay: `${Math.random() * 6}s`,
      animationDuration: `${4 + Math.random() * 5}s`,
    }))
  ).current

  return (
    <section
      ref={sectionRef}
      className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* ── Grid background ── */}
      <div className="hero-grid" aria-hidden />

      {/* ── Orb blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div ref={blob1Ref} className="hero-blob blob-blue" />
        <div ref={blob2Ref} className="hero-blob blob-purple" />
        <div ref={blob3Ref} className="hero-blob blob-pink" />
      </div>

      {/* ── Particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {particles.map((p, i) => <Particle key={i} style={p} />)}
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto max-w-6xl relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── LEFT: text ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* greeting badge */}
            <div ref={greetRef} className="inline-flex items-center gap-2 mb-6">
              <span className="hero-badge">
                <span className="badge-dot" /> Available for work
              </span>
            </div>

            {/* name */}
            <h1 ref={nameRef} className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
              <span className="block text-gray-400 dark:text-gray-500 text-xl sm:text-2xl font-medium mb-2 tracking-widest uppercase">
                Hi, I'm
              </span>
              <span className="gradient-text">Rohin Madhav</span>
            </h1>

            {/* typewriter role */}
            <div ref={roleRef} className="flex items-center gap-2 justify-center lg:justify-start mb-6 h-10">
              <span className="hero-role-text">
                {displayRole}
              </span>
              <span ref={cursorRef} className="hero-cursor">|</span>
            </div>

            {/* description */}
            <p ref={descRef} className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              I craft performant, scalable web experiences — from pixel-perfect UIs
              to robust back-end systems. Let's build something remarkable together.
            </p>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <a href="#projects" className="hero-btn hero-btn-primary">
                View Projects
                <ArrowDown className="w-4 h-4 ml-2 inline-block animate-bounce" />
              </a>
              <a href="#contact" className="hero-btn hero-btn-outline">
                Contact Me
                <Mail className="w-4 h-4 ml-2 inline-block" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="hero-btn hero-btn-ghost"
              >
                Résumé
                <Download className="w-4 h-4 ml-2 inline-block" />
              </a>
            </div>

            {/* socials */}
            <div ref={socialRef} className="flex gap-4 justify-center lg:justify-start">
              {[
                { href: 'https://github.com/Rohin-Madhav', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/rohin-madhav-2a551b358', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                { href: 'mailto:rohinmadhavk7@gmail.com', icon: <Mail className="w-5 h-5" />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="hero-social-btn"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: code card ── */}
          <div ref={cardRef} className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
            <div className="hero-code-card">
              {/* window dots */}
              <div className="flex gap-2 mb-5">
                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>

              {/* code snippet */}
              <pre className="hero-code text-sm leading-relaxed">
                <span className="c-keyword">const</span> <span className="c-var">developer</span> <span className="c-op">=</span> {'{'}
                {'\n'}  <span className="c-key">name</span><span className="c-op">:</span> <span className="c-str">"Rohin Madhav"</span><span className="c-op">,</span>
                {'\n'}  <span className="c-key">role</span><span className="c-op">:</span> <span className="c-str">"Full Stack Dev"</span><span className="c-op">,</span>
                {'\n'}  <span className="c-key">stack</span><span className="c-op">:</span> [
                {'\n'}    <span className="c-str">"React"</span><span className="c-op">,</span> <span className="c-str">"Node.js"</span><span className="c-op">,</span>
                {'\n'}    <span className="c-str">"MongoDB"</span><span className="c-op">,</span> <span className="c-str">"Express"</span>
                {'\n'}  ]<span className="c-op">,</span>
                {'\n'}  <span className="c-key">passion</span><span className="c-op">:</span> <span className="c-str">"Building cool things"</span><span className="c-op">,</span>
                {'\n'}  <span className="c-key">available</span><span className="c-op">:</span> <span className="c-bool">true</span>
                {'\n'}{'}'}<span className="c-op">;</span>
              </pre>

              {/* status bar */}
              <div className="hero-status-bar">
                <span className="status-dot" />
                <span className="text-xs text-green-400 font-medium">Open to opportunities</span>
                <span className="ml-auto text-xs text-gray-500">JS</span>
              </div>

              {/* glow ring */}
              <div className="hero-card-glow" aria-hidden />
            </div>

            {/* floating stat chips */}
            <div className="hero-chip chip-top">
              <span className="chip-icon">⚡</span>
              <span>End-to-End Dev</span>
            </div>
            <div className="hero-chip chip-bottom">
              <span className="chip-icon">🚀</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollRef} className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="text-xs text-gray-400 mt-2">Scroll</span>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* === Section base === */
        .hero-section {
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(100,120,255,0.08) 0%, transparent 70%);
        }
        .dark .hero-section {
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(80,100,255,0.12) 0%, transparent 70%);
        }

        /* === Grid === */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(120,130,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,130,255,0.06) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* === Blobs === */
        .hero-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          will-change: transform;
        }
        .blob-blue   { width: 500px; height: 500px; top: 5%;  left: 5%;  background: rgba(99,102,241,0.2); }
        .blob-purple { width: 400px; height: 400px; bottom: 5%; right: 5%; background: rgba(168,85,247,0.2); }
        .blob-pink   { width: 300px; height: 300px; top: 40%; left: 40%; background: rgba(236,72,153,0.12); }

        /* === Particles === */
        .hero-particle {
          position: absolute;
          border-radius: 9999px;
          background: rgba(139,155,255,0.6);
          animation: particleFloat var(--dur, 6s) ease-in-out var(--delay, 0s) infinite alternate;
        }
        @keyframes particleFloat {
          from { transform: translateY(0) scale(1); }
          to   { transform: translateY(-20px) scale(1.4); }
        }

        /* === Greeting badge === */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #86efac;
          background: rgba(134,239,172,0.1);
          border: 1px solid rgba(134,239,172,0.25);
          letter-spacing: 0.04em;
        }
        .badge-dot {
          width: 8px; height: 8px;
          border-radius: 9999px;
          background: #4ade80;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
        }

        /* === Typewriter === */
        .hero-role-text {
          font-size: 1.25rem;
          font-weight: 600;
          background: linear-gradient(90deg, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-cursor {
          font-size: 1.4rem;
          font-weight: 200;
          color: #818cf8;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* === CTA Buttons === */
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 14px;
          font-size: 0.92rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          white-space: nowrap;
        }
        .hero-btn:hover { transform: translateY(-3px); }

        .hero-btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          color: white;
          box-shadow: 0 4px 24px rgba(99,102,241,0.35);
        }
        .hero-btn-primary:hover {
          box-shadow: 0 8px 36px rgba(99,102,241,0.55);
        }

        .hero-btn-outline {
          background: transparent;
          color: #818cf8;
          border: 2px solid rgba(129,140,248,0.5);
        }
        .hero-btn-outline:hover {
          background: rgba(129,140,248,0.08);
          border-color: #818cf8;
          box-shadow: 0 4px 20px rgba(129,140,248,0.2);
        }

        .hero-btn-ghost {
          background: rgba(255,255,255,0.05);
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .hero-btn-ghost:hover {
          background: rgba(255,255,255,0.1);
          color: #e2e8f0;
        }

        /* === Social buttons === */
        .hero-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
          text-decoration: none;
          transition: transform 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s;
        }
        .hero-social-btn:hover {
          transform: translateY(-4px) scale(1.08);
          background: rgba(129,140,248,0.15);
          color: #818cf8;
          box-shadow: 0 4px 16px rgba(129,140,248,0.25);
        }

        /* === Code card === */
        .hero-code-card {
          position: relative;
          padding: 28px;
          border-radius: 24px;
          background: rgba(15,15,30,0.7);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .dark .hero-code-card {
          background: rgba(10,10,24,0.8);
        }

        /* code syntax colors */
        .hero-code { color: #94a3b8; font-family: 'Fira Code', 'Cascadia Code', 'Courier New', monospace; }
        .c-keyword  { color: #818cf8; font-weight: 700; }
        .c-var      { color: #38bdf8; }
        .c-key      { color: #34d399; }
        .c-str      { color: #fbbf24; }
        .c-op       { color: #94a3b8; }
        .c-bool     { color: #f472b6; font-weight: 700; }

        /* status bar */
        .hero-status-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .status-dot {
          width: 8px; height: 8px;
          border-radius: 9999px;
          background: #4ade80;
          animation: pulse 2s ease-in-out infinite;
        }

        /* glow ring */
        .hero-card-glow {
          position: absolute;
          inset: -1px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.2), rgba(236,72,153,0.15));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1px;
          pointer-events: none;
        }

        /* === Floating stat chips === */
        .hero-chip {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(15,15,30,0.85);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(16px);
          font-size: 0.78rem;
          font-weight: 600;
          color: #e2e8f0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          z-index: 10;
          animation: chipFloat 4s ease-in-out infinite alternate;
        }
        .chip-icon { font-size: 1rem; }

        /* position relative to card parent */
        .flex-shrink-0 { position: relative; }
        .chip-top    { top: -16px;  right: -12px; animation-delay: 0s; }
        .chip-bottom { bottom: -16px; left: -12px;  animation-delay: 1.5s; }

        @keyframes chipFloat {
          from { transform: translateY(0); }
          to   { transform: translateY(-8px); }
        }

        /* === Scroll indicator === */
        .hero-scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          z-index: 10;
        }
        .scroll-mouse {
          width: 22px;
          height: 36px;
          border-radius: 999px;
          border: 2px solid rgba(129,140,248,0.4);
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }
        .scroll-wheel {
          width: 4px;
          height: 8px;
          border-radius: 9999px;
          background: #818cf8;
          animation: scrollWheel 1.8s ease-in-out infinite;
        }
        @keyframes scrollWheel {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }

        /* === Responsive tweaks === */
        @media (max-width: 1023px) {
          .chip-top, .chip-bottom { display: none; }
          .hero-code-card { max-width: 420px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}

export default Hero