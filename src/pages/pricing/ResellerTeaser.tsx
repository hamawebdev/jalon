import { ButtonLink, ChannelMosaic, DeviceFrame, Kw, Reveal, Section, WhatsAppButton } from '@/components/brand'
import { RESELLER_ON, whatsappButtonProps } from '@/lib/site'

// /abonnements/ › plans-reseller-teaser: it follows the reseller page (RESELLER_ON). In review mode it shows by
// default (APPROVAL §2.8) and goes if the owner answers reseller.offered = false; on the published site it stays
// out until the owner says yes (APPROVAL §2c.4). No credit, pack or panel claim here.

/** Decorative screens: one access, every screen. aria-hidden, no text nodes. */
function TeaserScreens() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative mx-auto w-full max-w-[560px] md:ml-0 md:pb-[9%] lg:mr-0 lg:ml-auto">
      <DeviceFrame kind="tv" className="w-full md:w-[88%]">
        <ChannelMosaic selected={9} />
      </DeviceFrame>
      <DeviceFrame kind="phone" className="absolute right-0 bottom-0 hidden w-[22%] rounded-[24px] p-1.5 md:block" screenClassName="rounded-[18px]">
        <div className="size-full pt-6">
          {/* No selected tile here: the drawing's one yellow square is the television's. */}
          <ChannelMosaic cols={3} rows={7} selected={0} osd={false} icons={['ti-movie', 'ti-ball-football', 'ti-news']} />
        </div>
      </DeviceFrame>
    </div>
  )
}

export function PlansResellerTeaser() {
  if (!RESELLER_ON) return null
  return (
    <Section zone="paper" dataSection="plans-reseller-teaser" containerClassName="grid items-center gap-y-12 md:gap-y-14 lg:grid-cols-12 lg:gap-x-grid">
      <Reveal className="lg:col-span-6">
        <h2 className="font-display text-display-md text-z-fg">
          <span className="block">Vous revendez des abonnements TV&nbsp;?</span>{' '}
          <span className="block">
            Travaillons <Kw>ensemble</Kw>.
          </span>
        </h2>
        <p className="mt-5 max-w-[46ch] font-sans text-copy text-z-soft">
          Le programme revendeur et ses conditions ont leur propre page. On répond aussi à vos questions sur WhatsApp.
        </p>
        {/* A teaser, not the page's main action: 48px buttons, which also sit side by side in the half-width column.
            Full width on phones without the arrow, so the label keeps one line at 320px. */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink to="/revendeur/" variant="primary" size="md" iconEnd="arrow" full className="sm:w-auto max-sm:[&_.ti-arrow-right]:hidden">
            Voir le programme revendeur
          </ButtonLink>
          <WhatsAppButton {...whatsappButtonProps()} size="md" full className="sm:w-auto" />
        </div>
      </Reveal>
      <Reveal index={1} className="lg:col-span-6">
        <TeaserScreens />
      </Reveal>
    </Section>
  )
}
