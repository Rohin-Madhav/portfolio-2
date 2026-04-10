import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  const btnRef = useRef(null)

  useEffect(() => {
    if (!btnRef.current) return
    gsap.from(btnRef.current, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.6,
      delay: 0.6,
      ease: 'back.out(1.4)',
    })
  }, [])

  return (
    <button
      ref={btnRef}
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-6 right-6 z-50 p-3 rounded-full glass-strong shadow-lg hover:shadow-glow transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  )
}

export default ThemeToggle
