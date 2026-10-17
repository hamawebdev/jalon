import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReveal } from './motion'

type RevealProps = {
  children: ReactNode
  /** Element to render (default div). */
  as?: ElementType
  /** Position in a group: 60 ms stagger per item, capped at 180 ms. */
  index?: number
  className?: string
}

/**
 * Fades its content in once when it scrolls into view (200 ms, 8px, ease-calm). Never wrap hero content,
 * prices, the offer card, the buy box, plan prices, forms, FAQ rows, nav or payment rows.
 */
export function Reveal({ children, as: Tag = 'div', index = 0, className }: RevealProps) {
  const { ref, className: revealClass, style } = useReveal<HTMLElement>(index)
  return (
    <Tag ref={ref} className={cn(revealClass, className)} style={style}>
      {children}
    </Tag>
  )
}
