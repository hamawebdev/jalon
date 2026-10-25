// The dictionary type. French (./fr) is the source: every other language must have exactly the same keys and the
// same shapes, with its own text. Arrays keep their length and order.
import type frDict from './fr/index.ts'

export type Dict = typeof frDict
export type Area = keyof Dict
