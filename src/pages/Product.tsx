import { lazy } from 'react'
import { useParams } from 'react-router'
import { PlanLanding } from './product/Landing'
import { productBySlug } from './product/data'
import { RenewalLanding } from './product/Renewal'

// Same lazy chunk as the router's 404 route.
const NotFound = lazy(() => import('./NotFound'))

/** /abonnements/:slug — the plan pages and the renewal page, from the product data; an unknown slug is a 404. */
export default function Product() {
  const { slug } = useParams()
  const product = productBySlug(slug)
  if (!product) return <NotFound />
  return product.kind === 'renewal' ? <RenewalLanding key={product.slug} /> : <PlanLanding key={product.slug} product={product} />
}
