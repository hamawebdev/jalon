// The home page: every section of the brief, in the brief's order. Owner: lead.
import { PageMeta } from '@/components/site/PageMeta'
import { Compat } from './home/sections/Compat'
import { Faq } from './home/sections/Faq'
import { Hero } from './home/sections/Hero'
import { History } from './home/sections/History'
import { HowTo } from './home/sections/HowTo'
import { Install } from './home/sections/Install'
import { Pillars } from './home/sections/Pillars'
import { Pricing } from './home/sections/Pricing'
import { Renewal } from './home/sections/Renewal'
import { Reviews } from './home/sections/Reviews'
import { Sport } from './home/sections/Sport'
import { Vod } from './home/sections/Vod'
import { Why } from './home/sections/Why'

export default function Home() {
  return (
    <>
      <PageMeta page="home" />
      <Hero />
      <Why />
      <History />
      <Sport />
      <Vod />
      <Renewal />
      <HowTo />
      <Pricing />
      <Compat />
      <Install />
      <Pillars />
      <Reviews />
      <Faq />
    </>
  )
}
