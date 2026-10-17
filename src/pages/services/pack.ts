import { anyInScope } from '@/components/brand'

/**
 * The pack section is on the page: always in review mode; on the published site once the owner has given the pack's
 * credits or its price (a pack card with neither says nothing). The hero button and step 01 follow the same answer.
 */
export function packShown() {
  return anyInScope(['reseller.entryPack.credits', 'reseller.entryPack.price'])
}
