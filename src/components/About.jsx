import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, Database, Server, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { icon: Code, title: 'Frontend Excellence', description: 'Crafting beautiful, pixel-perfect & responsive UIs', color: '--indigo' },
  { icon: Server, title: 'Backend Expertise', description: 'Building robust, scalable server-side applications', color: '--violet' },
  { icon: Database, title: 'Database Design', description: 'Efficient data modeling and query optimization', color: '--pink' },
  { icon: Shield, title: 'Security First', description: 'Implementing secure auth & data protection systems', color: '--cyan' },
]

const ICON_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#38bdf8']

const About = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: textRef.current, start: 'top 88%' },
        y: 40, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 92%' },
          y: 80, rotationX: -18, opacity: 0, scale: 0.92,
          duration: 0.8, delay: i * 0.1, ease: 'back.out(1.1)', overwrite: 'auto',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about-section py-24 sm:py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* subtle grid */}
      <div className="about-grid" aria-hidden />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="section-pill">About Me</div>
          <h2 ref={headingRef} className="text-4xl sm:text-5xl font-extrabold mb-6 gradient-text">
            Who I Am
          </h2>
          <p ref={textRef} className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I'm a passionate Full Stack Web Developer with expertise in building scalable
            web applications using modern technologies. I specialize in creating seamless
            user experiences while ensuring robust backend functionality. My approach combines
            clean code, best practices, and innovative solutions to deliver high-quality
            applications that meet both user needs and business objectives.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon
            const color = ICON_COLORS[index]
            return (
              <div
                key={index}
                ref={el => (cardsRef.current[index] = el)}
                className="about-card glass-strong rounded-2xl p-7 group"
                style={{ '--card-glow': color }}
              >
                {/* icon circle */}
                <div className="about-icon-wrap mb-5" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>

                {/* bottom glow line */}
                <div className="about-card-line" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .about-section {
          background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%),
                      var(--bg-surface);
        }
        .about-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(120,130,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,130,255,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%);
        }
        .about-card {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .about-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 12px 40px color-mix(in srgb, var(--card-glow) 25%, transparent);
        }
        .about-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s ease;
        }
        .about-card:hover .about-icon-wrap { transform: scale(1.12) rotate(-4deg); }
        .about-card-line {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .about-card:hover .about-card-line { opacity: 1; }
      `}</style>
    </section>
  )
}

export default About
