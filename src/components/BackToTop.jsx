import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const BackToTop = () => {
  const btnRef = useRef(null)
  const visible = useRef(false)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const onScroll = () => {
      const shouldShow = window.scrollY > 300
      if (shouldShow === visible.current) return
      visible.current = shouldShow
      if (shouldShow) {
        btn.style.display = 'flex'
        gsap.fromTo(btn, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' })
      } else {
        gsap.to(btn, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { btn.style.display = 'none' } })
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="back-to-top"
        aria-label="Back to top"
        style={{ display: 'none' }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <style>{`
        .back-to-top {
          position: fixed; bottom: 32px; right: 32px; z-index: 50;
          width: 48px; height: 48px; border-radius: 14px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .back-to-top:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(99,102,241,0.55);
        }
      `}</style>
    </>
  )
}

export default BackToTop
