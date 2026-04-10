import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── skill data with SVG logo URLs from devicons / simpleicons ── */
const skills = [
  {
    name: 'HTML5',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    color: '#e34c26',
  },
  {
    name: 'CSS3',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    color: '#264de4',
  },
  {
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#f7df1e',
  },
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61dafb',
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: '#38bdf8',
  },
  {
    name: 'shadcn/ui',
    logo: 'https://avatars.githubusercontent.com/u/139895814?s=200&v=4',
    color: '#ffffff',
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#68a063',
  },
  {
    name: 'Express.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    color: '#ffffff',
  },
  {
    name: 'MongoDB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    color: '#4db33d',
  },
  {
    name: 'Git',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#f1502f',
  },
  {
    name: 'REST APIs',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    color: '#009688',
  },
  {
    name: 'JWT Auth',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#d63aff',
  },
  {
    name: 'OAuth 2.0',
    logo: 'https://www.svgrepo.com/show/448236/oauth.svg',
    color: '#eb5424',
  },
  {
    name: 'Stripe',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg',
    color: '#635bff',
  },
]

/* duplicate for seamless infinite loop */
const track = [...skills, ...skills]

const Skills = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const rowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, subRef.current, rowRef.current], {
        opacity: 1,
        y: 0,
      })

      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: { trigger: subRef.current, start: 'top 88%' },
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.15,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(
        rowRef.current,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: rowRef.current, start: 'top 90%' },
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.25,
          ease: 'power3.out',
        }
      )

      setTimeout(() => ScrollTrigger.refresh(), 100)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%), var(--bg-base)' }}>
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="section-pill">Tech Stack</div>
          <h2 ref={headingRef} className="text-4xl sm:text-5xl font-extrabold mb-4 gradient-text">
            Skills &amp; Technologies
          </h2>
          <p ref={subRef} className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Technologies I work with to bring ideas to life
          </p>
        </div>

        {/* Marquee strip */}
        <div ref={rowRef} className="skills-marquee-wrapper">
          {/* fade edges */}
          <div className="skills-fade-left" />
          <div className="skills-fade-right" />

          <div className="skills-track">
            {track.map((skill, i) => (
              <div key={i} className="skill-card" style={{ '--glow': skill.color }}>
                <div className="skill-icon-wrap">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="skill-logo"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
                <span className="skill-label">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        /* ── wrapper ── */
        .skills-marquee-wrapper {
          position: relative;
          overflow: hidden;
          padding: 12px 0;
        }

        /* soft edge fades */
        .skills-fade-left,
        .skills-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .skills-fade-left {
          left: 0;
          background: linear-gradient(to right, var(--bg-base, #07070f), transparent);
        }
        .skills-fade-right {
          right: 0;
          background: linear-gradient(to left, var(--bg-base, #07070f), transparent);
        }

        /* ── track: scrolls continuously ── */
        .skills-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: skillsScroll 32s linear infinite;
        }

        /* pause on hover */
        .skills-marquee-wrapper:hover .skills-track {
          animation-play-state: paused;
        }

        @keyframes skillsScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── individual card ── */
        .skill-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px 24px;
          border-radius: 18px;
          min-width: 110px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          cursor: default;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-8px) scale(1.06);
          background: rgba(255,255,255,0.12);
          box-shadow: 0 8px 32px color-mix(in srgb, var(--glow) 35%, transparent),
                      0 0 0 1px color-mix(in srgb, var(--glow) 40%, transparent);
        }

        /* dark mode cards */
        .dark .skill-card {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.08);
        }
        .dark .skill-card:hover {
          background: rgba(255,255,255,0.09);
        }

        /* ── icon ── */
        .skill-icon-wrap {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255,255,255,0.08);
          transition: background 0.3s ease;
        }
        .skill-card:hover .skill-icon-wrap {
          background: color-mix(in srgb, var(--glow) 18%, transparent);
        }

        .skill-logo {
          width: 34px;
          height: 34px;
          object-fit: contain;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .skill-card:hover .skill-logo {
          filter: drop-shadow(0 4px 12px color-mix(in srgb, var(--glow) 60%, transparent));
          transform: scale(1.12);
        }

        /* ── label ── */
        .skill-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #94a3b8;
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        .skill-card:hover .skill-label {
          color: var(--glow);
        }

        @media (max-width: 640px) {
          .skill-card {
            min-width: 90px;
            padding: 16px 16px;
          }
          .skill-logo {
            width: 28px;
            height: 28px;
          }
          .skill-icon-wrap {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </section>
  )
}

export default Skills
