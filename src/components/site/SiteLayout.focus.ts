import { useEffect, type RefObject } from 'react'

/**
 * Closed sliding panel: off-screen and shadowless. Unlike the kit's panelClosedClass it stays
 * `visibility: visible`, so its words remain in the page text; `inert` and `aria-hidden` (set by the panel)
 * keep it out of the tab order and the accessibility tree.
 */
export const closedPanel = 'translate-x-full shadow-none'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Focus management of the side menu and the cart drawer: while `open`, focus moves into the panel, Tab cycles
 * inside it and Esc calls `onClose`; when it closes, focus returns to the element that opened it.
 * `onClose` must be stable (a state setter wrapper from useCallback).
 */
export function usePanelFocus(open: boolean, panel: RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    const el = panel.current
    if (!open || !el) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    el.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.getClientRects().length > 0)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !el.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !el.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      const active = document.activeElement
      const focusLeft = !active || active === document.body || el.contains(active)
      if (focusLeft && trigger?.isConnected && !el.contains(trigger)) trigger.focus({ preventScroll: true })
    }
  }, [open, panel, onClose])
}
