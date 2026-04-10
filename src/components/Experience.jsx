import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, Globe, Code, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const perks = [
  { icon: Globe, label: 'Remote Work', color: '#6366f1' },
  { icon: Code, label: 'Full Stack Dev', color: '#8b5cf6' },
  { icon: Zap, label: 'Fast Turnaround', color: '#ec4899' },
]

const Experience = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const cardRef = useRef(null)
  const perksRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
      })
      gsap.from(subRef.current, {
        scrollTrigger: { trigger: subRef.current, start: 'top 88%' },
        y: 30, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power3.out',
      })
      gsap.from(cardRef.current, {
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
        y: 60, opacity: 0, duration: 0.9, delay: 0.2, ease: 'power3.out',
      })
      perksRef.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%' },
          x: -30, opacity: 0, duration: 0.5, delay: 0.4 + i * 0.1, ease: 'power2.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="exp-section py-24 sm:py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="exp-grid" aria-hidden />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="section-pill">Availability</div>
          <h2 ref={headingRef} className="text-4xl sm:text-5xl font-extrabold mb-4 gradient-text">
            Experience &amp; Availability
          </h2>
          <p ref={subRef} className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Open to new opportunities and exciting collaborations
          </p>
        </div>

        {/* Main card */}
        <div ref={cardRef} className="exp-card glass-strong rounded-2xl p-8 md:p-10">
          {/* top row */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="exp-icon-wrap">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="exp-badge mb-2">
                <span className="exp-badge-dot" />
                Available Now
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Freelance &amp; Remote Opportunities
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Whether you need a full-stack application, API development, or frontend
                expertise — I'm ready to help bring your vision to life.
              </p>
            </div>
          </div>

          {/* divider */}
          <div className="exp-divider" />

          {/* perks */}
          <div className="flex flex-wrap gap-4 mt-6">
            {perks.map(({ icon: Icon, label, color }, i) => (
              <div
                key={i}
                ref={el => (perksRef.current[i] = el)}
                className="exp-perk"
                style={{ color, background: `${color}15`, borderColor: `${color}30` }}
              >
                <Icon className="w-4 h-4" />
                <span className="font-semibold text-sm">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="#contact" className="exp-cta mt-8">
            Let's Work Together →
          </a>
        </div>
      </div>

      <style>{`
        .exp-section {
          background: var(--bg-surface);
          background-image: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%);
        }
        .exp-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(120,130,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,130,255,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }
        .exp-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(99,102,241,0.2);
          box-shadow: 0 0 0 1px rgba(99,102,241,0.05), 0 24px 60px rgba(0,0,0,0.3);
          transition: box-shadow 0.3s ease;
        }
        .exp-card:hover {
          box-shadow: 0 0 0 1px rgba(99,102,241,0.2), 0 24px 80px rgba(99,102,241,0.15);
        }
        .exp-icon-wrap {
          width: 64px; height: 64px; border-radius: 18px; flex-shrink: 0;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(99,102,241,0.35);
        }
        .exp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 4px 14px; border-radius: 999px; font-size: 0.78rem; font-weight: 600;
          color: #4ade80; background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.25);
        }
        .exp-badge-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50%      { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
        }
        .exp-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2), transparent);
        }
        .exp-perk {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 18px; border-radius: 12px; border: 1px solid;
          transition: transform 0.2s ease;
        }
        .exp-perk:hover { transform: translateY(-3px); }
        .exp-cta {
          display: inline-block; margin-top: 28px;
          padding: 13px 32px; border-radius: 12px; font-weight: 700; font-size: 0.95rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          color: white; text-decoration: none;
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .exp-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 36px rgba(99,102,241,0.55);
        }
      `}</style>
    </section>
  )
}

export default Experience
