import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { SiteLayout } from '@/components/site/SiteLayout'
import { RESELLER_ON } from '@/lib/site'

const Home = lazy(() => import('@/pages/Home'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const Product = lazy(() => import('@/pages/Product'))
const Services = lazy(() => import('@/pages/Services'))
const Download = lazy(() => import('@/pages/Download'))
const Help = lazy(() => import('@/pages/Help'))
const Contact = lazy(() => import('@/pages/Contact'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Legal = lazy(() => import('@/pages/Legal'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// The site's routes (structure INVENTORY §3.1). Links always end with a slash. Paths that are not listed here,
// the template's earlier paths included (APPROVAL §2.1), render the 404 page. A new route also needs its title and
// description in PAGE_META (src/lib/site.ts): the entry pages (scripts/static-head.mjs) and the sitemap
// (scripts/sitemap.mjs) take their route list from there, and the entry pages read this file to know which page
// chunk each route loads. Keep one <Route> per line, with its lazy component first in `element`.
//
// A page that waits for the owner's « yes » (APPROVAL §2c.4) keeps its route here and renders the 404 page until
// then: /revendeur/ while RESELLER_ON is false (HIDDEN_ROUTES in src/lib/site.ts lists them for the entry pages,
// the sitemap and the page meta).
function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="abonnements" element={<Pricing />} />
          <Route path="abonnements/:slug" element={<Product />} />
          <Route path="revendeur" element={RESELLER_ON ? <Services /> : <NotFound />} />
          <Route path="applications" element={<Download />} />
          <Route path="aide" element={<Help />} />
          <Route path="contact" element={<Contact />} />
          <Route path="commande" element={<Checkout />} />
          <Route path="mentions-legales" element={<Legal doc="mentions" />} />
          <Route path="conditions-generales-de-vente" element={<Legal doc="cgv" />} />
          <Route path="conditions-utilisation" element={<Legal doc="cgu" />} />
          <Route path="politique-de-confidentialite" element={<Legal doc="privacy" />} />
          <Route path="politique-de-remboursement" element={<Legal doc="refund" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
