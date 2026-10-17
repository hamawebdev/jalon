import { useEffect } from 'react'

/**
 * After a navigation to /page/#anchor, scroll to the anchor once the (lazy) page has rendered it. React Router
 * does not do it for client-side navigations; the browser only does it on a full load. Gives up after ~3 s.
 */
export function useHashScroll(pathname: string, hash: string) {
  useEffect(() => {
    if (!hash || hash === '#') return
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer = 0
    const seek = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
      if (tries++ < 30) timer = window.setTimeout(seek, 100)
    }
    seek()
    return () => window.clearTimeout(timer)
  }, [pathname, hash])
}
