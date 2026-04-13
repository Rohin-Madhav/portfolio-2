import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github } from 'lucide-react'


gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Electronics E-commerce',
    description: 'Full-stack MERN shopping app with login, cart, orders, and Razorpay payments plus admin dashboard.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT', 'Razorpay'],
    liveUrl: 'https://zonyfy.netlify.app', githubUrl: 'https://github.com/Rohin-Madhav/zonify_audios',
    accent: '#8b5cf6',
    icon: '🛒',
  },
  {
    title: 'Health Care System',
    description: 'A comprehensive healthcare management system with role-based authentication, admin and doctor dashboards, and integrated Stripe payment processing.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    liveUrl: 'https://health-care-system-1.netlify.app', githubUrl: 'https://github.com/Rohin-Madhav/Health-Care-System',
    accent: '#6366f1',
    icon: '🏥',
  },
  {
    title: 'Employee Management System',
    description: 'Manage employee records with ease using this modern, responsive employee management system featuring advanced filtering and intuitive UI design.',
    tech: ['React', 'MongoDB', 'Express.js', 'Node.js','CRUD'],
    liveUrl: 'https://manage-employeeee.netlify.app', githubUrl: 'https://github.com/Rohin-Madhav/Employee-Management-System.git',
    accent: '#ec4899',
    icon: '👥',
  },
  {
    title: 'Football Club Website',
    description: 'A modern, responsive football club website featuring an intuitive UI design and advanced filtering capabilities.',
    tech: ['React', 'tailwindcss'],
    liveUrl: 'https://rmfc.netlify.app', githubUrl: 'https://github.com/Rohin-Madhav/football-academy.git',
    accent: '#ec4899',
    icon: '⚽',
  },
  {
    title: 'Expense Tracker',
    description: 'Track your daily expenses with ease using this modern, responsive expense tracker featuring an intuitive UI design and advanced filtering capabilities.',
    tech: ['React', 'tailwindcss'],
    liveUrl: 'https://mark-ur-expense.netlify.app', githubUrl: 'https://github.com/Rohin-Madhav/expense-tracker.git',
    accent: '#6366f1',
    icon: '💰',
  },
]

const Projects = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const cleanups = []
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
      })
      gsap.from(subRef.current, {
        scrollTrigger: { trigger: subRef.current, start: 'top 88%' },
        y: 30, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power3.out',
      })
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          y: 80, opacity: 0, duration: 0.85, delay: i * 0.15, ease: 'power3.out',
        })
        const onMove = (e) => {
          const r = card.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          gsap.to(card, { rotationY: x * 8, rotationX: -y * 8, transformPerspective: 900, duration: 0.4, ease: 'power2.out' })
        }
        const onLeave = () => gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' })
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) })
      })
    }, sectionRef)
    return () => { cleanups.forEach(fn => fn()); ctx.revert() }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="projects-section py-24 sm:py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="projects-grid" aria-hidden />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="section-pill">My Work</div>
          <h2 ref={headingRef} className="text-4xl sm:text-5xl font-extrabold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p ref={subRef} style={{ color: 'var(--text-secondary)' }} className="text-lg max-w-2xl mx-auto">
            A showcase of my recent work and projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => (cardRefs.current[index] = el)}
              className="pj-card"
              style={{ transformStyle: 'preserve-3d', '--accent': project.accent }}
            >
              {/* animated border glow layer */}
              <div className="pj-border-glow" />

              {/* ── Mock browser window preview ── */}
              <div className="pj-preview">
                <div className="pj-browser-bar">
                  <span className="pj-dot" style={{ background: '#ff5f57' }} />
                  <span className="pj-dot" style={{ background: '#febc2e' }} />
                  <span className="pj-dot" style={{ background: '#28c840' }} />
                  <div className="pj-url-bar">
                    {project.liveUrl.startsWith('#') ? 'localhost:5173' : project.liveUrl.replace('https://', '')}
                  </div>
                </div>
                <div className="pj-preview-body" style={{ background: `linear-gradient(135deg, ${project.accent}1a 0%, ${project.accent}08 100%)` }}>
                  <span className="pj-preview-icon">{project.icon}</span>
                  <div className="pj-preview-lines">
                    <div className="pj-line" style={{ width: '85%', background: `${project.accent}55` }} />
                    <div className="pj-line" style={{ width: '60%', background: `${project.accent}35` }} />
                    <div className="pj-line" style={{ width: '75%', background: `${project.accent}45` }} />
                    <div className="pj-line" style={{ width: '45%', background: `${project.accent}28` }} />
                  </div>
                </div>
              </div>

              {/* ── Card body ── */}
              <div className="pj-body">
                {/* numbered index badge */}
                <div className="pj-num" style={{ color: project.accent, borderColor: `${project.accent}40`, background: `${project.accent}12` }}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                <h3 className="pj-title">{project.title.trim()}</h3>
                <p className="pj-desc">{project.description}</p>

                {/* tech pill tags */}
                <div className="pj-tags">
                  {project.tech.map((t, ti) => (
                    <span key={ti} className="pj-tag" style={{ color: project.accent, background: `${project.accent}15`, borderColor: `${project.accent}30` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Footer action bar ── */}
              <div className="pj-footer" style={{ borderTopColor: `${project.accent}22` }}>
                <a
                  href={project.liveUrl.startsWith('#') ? '#' : project.liveUrl}
                  target={project.liveUrl.startsWith('#') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="pj-action-btn pj-btn-primary"
                  style={{ background: project.accent }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target={project.githubUrl === '#' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="pj-action-btn pj-btn-ghost"
                  style={{ color: project.accent, borderColor: `${project.accent}40` }}
                >
                  <Github className="w-3.5 h-3.5" /> Source
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .projects-section {
          background: var(--bg-base);
          background-image: radial-gradient(ellipse 70% 50% at 50% 100%, rgba(139,92,246,0.07) 0%, transparent 70%);
        }
        .projects-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(120,130,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,130,255,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%);
        }

        /* ── Card shell ── */
        .pj-card {
          position: relative;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .pj-card:hover {
          border-color: color-mix(in srgb, var(--accent) 40%, transparent);
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--accent) 30%, transparent),
            0 24px 64px color-mix(in srgb, var(--accent) 15%, transparent),
            0 4px 20px rgba(0,0,0,0.5);
        }

        /* animated conic border */
        .pj-border-glow {
          position: absolute; inset: -1px; border-radius: 21px;
          z-index: 0; pointer-events: none; opacity: 0;
          background: conic-gradient(
            from var(--angle, 0deg) at 50% 50%,
            var(--accent) 0deg,
            transparent 60deg,
            transparent 300deg,
            var(--accent) 360deg
          );
          transition: opacity 0.4s ease;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: 1px;
          animation: borderSpin 4s linear infinite paused;
        }
        .pj-card:hover .pj-border-glow { opacity: 1; animation-play-state: running; }
        @property --angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
        @keyframes borderSpin { to { --angle: 360deg; } }

        /* ── Browser mock preview ── */
        .pj-preview {
          position: relative; z-index: 1;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .pj-browser-bar {
          display: flex; align-items: center; gap: 5px;
          padding: 9px 14px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .pj-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .pj-url-bar {
          flex: 1; margin-left: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 5px;
          padding: 3px 10px;
          font-size: 0.62rem;
          color: #475569;
          letter-spacing: 0.02em;
          overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
          font-family: 'Fira Code', monospace;
        }
        .pj-preview-body {
          height: 116px;
          display: flex; align-items: center; justify-content: center; gap: 18px;
          padding: 0 20px;
          position: relative; overflow: hidden;
          transition: background 0.3s ease;
        }
        .pj-preview-icon {
          font-size: 2.8rem;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.5));
          transition: transform 0.3s ease;
        }
        .pj-card:hover .pj-preview-icon { transform: scale(1.1) rotate(-4deg); }
        .pj-preview-lines { display: flex; flex-direction: column; gap: 7px; flex: 1; }
        .pj-line { height: 7px; border-radius: 999px; transition: width 0.4s ease; }

        /* ── Body ── */
        .pj-body {
          padding: 20px 22px 14px;
          flex: 1; display: flex; flex-direction: column; gap: 9px;
          position: relative; z-index: 1;
        }
        .pj-num {
          align-self: flex-start;
          font-size: 0.67rem; font-weight: 800; letter-spacing: 0.12em;
          padding: 2px 9px; border-radius: 999px; border: 1px solid;
          font-family: 'Fira Code', monospace;
        }
        .pj-title {
          font-size: 1.1rem; font-weight: 700;
          color: var(--text-primary); line-height: 1.3;
        }
        .pj-desc {
          font-size: 0.8rem; line-height: 1.65;
          color: var(--text-secondary);
        }
        .pj-tags {
          display: flex; flex-wrap: wrap; gap: 5px; margin-top: 2px;
        }
        .pj-tag {
          padding: 3px 9px; border-radius: 999px;
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.04em;
          border: 1px solid;
        }

        /* ── Footer action bar ── */
        .pj-footer {
          display: flex; gap: 10px;
          padding: 13px 22px;
          border-top: 1px solid;
          background: rgba(255,255,255,0.018);
          position: relative; z-index: 1;
        }
        .pj-action-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 14px; border-radius: 9px;
          font-size: 0.76rem; font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          flex: 1; justify-content: center;
        }
        .pj-action-btn:hover { transform: translateY(-2px); opacity: 0.88; }
        .pj-btn-primary { color: #fff; }
        .pj-btn-primary:hover { box-shadow: 0 6px 24px color-mix(in srgb, var(--accent) 45%, transparent); }
        .pj-btn-ghost {
          background: transparent; border: 1px solid;
        }
        .pj-btn-ghost:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
      `}</style>
    </section>
  )
}

export default Projects