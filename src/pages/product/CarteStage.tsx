import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * The Carte d'accès on its stage, as a product page shows its product: a flat band tile with the card centred
 * (from md; on phone the card stands on the page ground, so the buy box stays close). Beside the buy box on tablet
 * the tile takes the height of that row. Panel corners (28px, 32px from lg): the stage stands level with the buy
 * box, and the home hero's visual has the same.
 */
export function CarteStage({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'relative flex min-w-0 items-center justify-center md:rounded-panel md:bg-band md:px-8 md:py-12 lg:px-12 lg:py-16',
        className,
      )}
    >
      {children}
    </div>
  )
}
