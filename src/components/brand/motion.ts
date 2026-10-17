// Motion helpers (IDENTITY.md §5.2): the js-motion gate and the reveal-once hook. Calm motion: reveals 200 ms over
// 8px, colour 150 ms, shape and position 180 to 200 ms, sheets 200 ms; no bounce, no parallax, nothing blinks.
import { useCallback, useLayoutEffect, useState, type CSSProperties, type RefCallback, type RefObject } from 'react'
import { revealDelay } from './recipes'

/**
 * Adds `js-motion` to <html> when the visitor allows motion. Only then may `.reveal` hide content
 * (index.css: `html.js-motion .reveal:not(.is-in):not([data-reveal="in"])`); without JS or with reduced motion nothing is hidden.
 * Called once from src/main.tsx before the first render.
 */
export function enableMotionGate() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    document.documentElement.classList.add('js-motion')
  }
}

function motionAllowed() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('js-motion')
}

/**
 * Reveal once on scroll: opacity 0 → 1 and translateY(8px → 0) over 200 ms, threshold .15,
 * rootMargin "0px 0px -10% 0px". Elements already in view at mount are never hidden; keyboard focus inside
 * (focusin) reveals at once, and index.css also shows `.reveal:focus-within` / `:target` and print.
 * Spread `ref`, `className` and `style` on one element. `ref` is a callback ref, so an element that mounts
 * later (conditional, async) is still observed. The revealed state is a DOM attribute (data-reveal="in")
 * that React never rewrites, so re-renders cannot hide the element again.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  index = 0,
): { ref: RefCallback<T>; className: string; style: CSSProperties } {
  const ref = useCallback((el: T | null) => {
    if (!el) return
    const show = () => el.setAttribute('data-reveal', 'in')
    if (el.getAttribute('data-reveal') === 'in') return
    if (!motionAllowed() || typeof IntersectionObserver === 'undefined') return show()
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return show()
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) done()
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    const done = () => {
      show()
      cleanup()
    }
    const cleanup = () => {
      io.disconnect()
      el.removeEventListener('focusin', done)
    }
    el.addEventListener('focusin', done)
    io.observe(el)
    return cleanup
  }, [])

  return { ref, className: 'reveal', style: { '--reveal-delay': revealDelay(index) } as CSSProperties }
}

/** True while the element intersects the viewport (used for the buy bar and the opt-in mosaic step). No IO → false. */
export function useInView<T extends HTMLElement>(ref: RefObject<T | null>, threshold = 0, rootMargin = '0px') {
  const [inView, setInView] = useState(false)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), {
      threshold,
      rootMargin,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, rootMargin])
  return inView
}
