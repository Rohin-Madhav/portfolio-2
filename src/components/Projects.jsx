import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Health Care System',
    description: 'A comprehensive healthcare management system with role-based authentication, admin and doctor dashboards, and integrated Stripe payment processing.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    liveUrl: '#', githubUrl: '#',
    accent: '#6366f1',
    icon: '🏥',
  },
  {
    title: 'E-commerce Inventory',
    description: 'Full-featured inventory management system with CRUD operations, RESTful API architecture, and MongoDB database integration.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST API'],
    liveUrl: '#', githubUrl: '#',
    accent: '#8b5cf6',
    icon: '🛒',
  },
  {
    title: 'Product Listing App',
    description: 'Modern product listing application with reusable components, advanced filtering capabilities, and a sleek, responsive UI design.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: '#', githubUrl: '#',
    accent: '#ec4899',
    icon: '📦',
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
          y: 100, opacity: 0, duration: 0.85, delay: i * 0.15, ease: 'power3.out',
        })
        const onMove = (e) => {
          const r = card.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          gsap.to(card, { rotationY: x * 10, rotationX: -y * 10, transformPerspective: 900, duration: 0.4, ease: 'power2.out' })
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
              className="project-card glass-strong rounded-2xl overflow-hidden"
              style={{ transformStyle: 'preserve-3d', '--accent': project.accent }}
            >
              {/* Header banner */}
              <div className="project-banner" style={{ background: `linear-gradient(135deg, ${project.accent}33, ${project.accent}11)` }}>
                <span className="project-emoji">{project.icon}</span>
                {/* glow orb */}
                <div className="project-banner-orb" style={{ background: project.accent }} />
              </div>

              <div className="p-7">
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                {/* tech tags */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {project.tech.map((t, ti) => (
                    <span key={ti} className="project-tag" style={{ color: project.accent, background: `${project.accent}15`, borderColor: `${project.accent}30` }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-fill" style={{ background: project.accent }}>
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-outline" style={{ color: project.accent, borderColor: `${project.accent}50` }}>
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </div>
              </div>

              {/* bottom accent line */}
              <div className="project-bottom-line" style={{ background: project.accent }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
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
        .project-card {
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .project-card:hover {
          box-shadow: 0 16px 48px color-mix(in srgb, var(--accent) 20%, transparent),
                      0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent);
        }
        .project-banner {
          position: relative; height: 140px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .project-emoji { font-size: 3.5rem; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4)); z-index: 1; }
        .project-banner-orb {
          position: absolute; width: 160px; height: 160px; border-radius: 50%;
          opacity: 0.15; filter: blur(40px); top: -20%; right: -10%;
        }
        .project-tag {
          padding: 3px 12px; border-radius: 999px; font-size: 0.72rem; font-weight: 600;
          border: 1px solid; letter-spacing: 0.03em;
        }
        .project-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 10px; font-size: 0.82rem; font-weight: 600;
          text-decoration: none; transition: transform 0.2s ease, box-shadow 0.2s ease;
          flex: 1; justify-content: center;
        }
        .project-btn:hover { transform: translateY(-2px); }
        .project-btn-fill { color: white; }
        .project-btn-fill:hover { box-shadow: 0 4px 16px color-mix(in srgb, var(--accent) 45%, transparent); }
        .project-btn-outline {
          background: transparent; border: 1px solid;
        }
        .project-btn-outline:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
        .project-bottom-line {
          height: 2px; width: 0%; transition: width 0.4s ease;
        }
        .project-card:hover .project-bottom-line { width: 100%; }
      `}</style>
    </section>
  )
}

export default Projects