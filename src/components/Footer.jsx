import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef(null)
  const textRef = useRef(null)
  const iconsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      })
      gsap.from(iconsRef.current?.querySelectorAll('a') || [], {
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
        y: 15, opacity: 0, stagger: 0.1, duration: 0.5, delay: 0.15, ease: 'power2.out',
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="footer-wrap py-10 px-4 sm:px-6 lg:px-8">
      {/* top line */}
      <div className="footer-line" />

      <div className="container mx-auto max-w-6xl pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* brand */}
          <div ref={textRef} className="text-center md:text-left">
            <p className="font-bold text-lg gradient-text mb-1">Rohin Madhav</p>
            <p className="text-sm flex items-center gap-1 justify-center md:justify-start" style={{ color: 'var(--text-muted)' }}>
              Crafted with <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 mx-0.5" /> &amp; React
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} · All rights reserved
            </p>
          </div>

          {/* socials */}
          <div ref={iconsRef} className="flex gap-3">
            {[
              { href: 'https://github.com/Rohin-Madhav', icon: <Github className="w-5 h-5" />, label: 'GitHub', color: '#818cf8' },
              { href: 'https://www.linkedin.com/in/rohin-madhav-2a551b358', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', color: '#38bdf8' },
              { href: 'mailto:rohinmadhavk7@gmail.com', icon: <Mail className="w-5 h-5" />, label: 'Email', color: '#f472b6' },
            ].map(({ href, icon, label, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="footer-social"
                style={{ '--s': color }}
              >
                <span style={{ color }}>{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrap {
          background: var(--bg-base);
          position: relative;
        }
        .footer-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(139,92,246,0.4), transparent);
        }
        .footer-social {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.04); border: 1px solid var(--border);
          text-decoration: none;
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
        }
        .footer-social:hover {
          transform: translateY(-4px) scale(1.1);
          background: color-mix(in srgb, var(--s) 15%, transparent);
          box-shadow: 0 4px 16px color-mix(in srgb, var(--s) 35%, transparent);
        }
      `}</style>
    </footer>
  )
}

export default Footer
