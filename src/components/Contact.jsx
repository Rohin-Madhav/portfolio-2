import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const leftRef = useRef(null)
  const formRef = useRef(null)
  const fieldsRef = useRef([])

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault()
    setSubmit(true)
    setTimeout(() => {
      setSubmit(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    }, 1200)
  }

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
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: leftRef.current, start: 'top 88%' },
        x: -60, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
      })
      gsap.from(formRef.current, {
        scrollTrigger: { trigger: formRef.current, start: 'top 88%' },
        x: 60, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
      })
      fieldsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
          y: 25, opacity: 0, duration: 0.5, delay: 0.35 + i * 0.08, ease: 'power2.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="contact-section py-24 sm:py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="contact-grid" aria-hidden />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="section-pill">Contact</div>
          <h2 ref={headingRef} className="text-4xl sm:text-5xl font-extrabold mb-4 gradient-text">
            Get In Touch
          </h2>
          <p ref={subRef} className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind? Let's work together to make it happen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT info */}
          <div ref={leftRef} className="space-y-5">
            {[
              { icon: Mail, label: 'Email', value: 'rohinmadhavk7@gmail.com', href: 'mailto:rohinmadhavk7@gmail.com', color: '#6366f1' },
              { icon: MapPin, label: 'Location', value: 'India', href: null, color: '#8b5cf6' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="contact-info-card glass-strong rounded-2xl p-6"
                style={{ '--c': color }}>
                <div className="flex items-center gap-4">
                  <div className="contact-info-icon" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    {href
                      ? <a href={href} className="font-semibold hover:underline" style={{ color }}>{value}</a>
                      : <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    }
                  </div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="contact-info-card glass-strong rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Find me on</p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com/Rohin-Madhav', label: 'GitHub', color: '#818cf8' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/rohin-madhav-2a551b358', label: 'LinkedIn', color: '#38bdf8' },
                  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram  ', color: '#f472b6' },
                ].map(({ icon: Icon, href, label, color }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer" aria-label={label} className="contact-social-btn"
                    style={{ '--s': color }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form glass-strong rounded-2xl p-8 space-y-5">
            {submitted && (
              <div className="contact-success">
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}

            {[
              { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Rohin Madhav' },
              { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
            ].map((f, i) => (
              <div key={f.id} ref={el => (fieldsRef.current[i] = el)}>
                <label htmlFor={f.id} className="contact-label">{f.label}</label>
                <input
                  type={f.type} id={f.id} name={f.id}
                  value={formData[f.id]} onChange={handleChange}
                  required placeholder={f.placeholder}
                  className="contact-input"
                />
              </div>
            ))}

            <div ref={el => (fieldsRef.current[2] = el)}>
              <label htmlFor="message" className="contact-label">Message</label>
              <textarea
                id="message" name="message" rows="5"
                value={formData.message} onChange={handleChange}
                required placeholder="Tell me about your project..."
                className="contact-input resize-none"
              />
            </div>

            <div ref={el => (fieldsRef.current[3] = el)}>
              <button type="submit" disabled={isSubmitting} className="contact-submit">
                {isSubmitting
                  ? <span className="flex items-center gap-2"><span className="contact-spinner" /> Sending...</span>
                  : <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: var(--bg-surface);
          background-image: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(236,72,153,0.07) 0%, transparent 70%);
        }
        .contact-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(120,130,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,130,255,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%);
        }
        .contact-info-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .contact-info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px color-mix(in srgb, var(--c, #6366f1) 15%, transparent);
        }
        .contact-info-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .contact-social-btn {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05); border: 1px solid var(--border);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
        }
        .contact-social-btn:hover {
          transform: translateY(-4px) scale(1.08);
          background: color-mix(in srgb, var(--s) 15%, transparent);
          box-shadow: 0 4px 16px color-mix(in srgb, var(--s) 30%, transparent);
        }
        .contact-form {
          border: 1px solid rgba(99,102,241,0.15);
          box-shadow: 0 24px 60px rgba(0,0,0,0.25);
        }
        .contact-label {
          display: block; font-size: 0.82rem; font-weight: 600;
          color: var(--text-secondary); margin-bottom: 8px; letter-spacing: 0.03em;
        }
        .contact-input {
          width: 100%; padding: 12px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.04); border: 1px solid var(--border-strong);
          color: var(--text-primary); font-size: 0.9rem; font-family: inherit;
          outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-input::placeholder { color: var(--text-muted); }
        .contact-input:focus {
          border-color: rgba(99,102,241,0.6);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
        .contact-submit {
          width: 100%; padding: 14px; border-radius: 12px; border: none; cursor: pointer;
          font-size: 0.95rem; font-weight: 700; color: white;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
          transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s;
        }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(99,102,241,0.55);
        }
        .contact-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .contact-spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: white;
          animation: spin 0.7s linear infinite; display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-success {
          padding: 12px 16px; border-radius: 10px; font-size: 0.88rem; font-weight: 600;
          background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.3); color: #4ade80;
        }
      `}</style>
    </section>
  )
}

export default Contact
