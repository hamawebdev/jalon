// The hero's use-case pills (brief pp. 4–5), in the brief's order.
export const USE_CASES = ['uptime', 'sport', 'vod', 'apps', 'support'] as const
export type UseCase = (typeof USE_CASES)[number]
/** Selected on first render (the same on the server and in the browser). */
export const INITIAL_USE_CASES: readonly UseCase[] = ['uptime', 'sport', 'vod']
