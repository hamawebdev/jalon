// Jalon logo geometry, generated from .team/brand/assets/logo-paths.json (IDENTITY.md §2). Do not edit by hand:
// regenerate with .team/brand/tools/build_logo.py, then copy the JSON values here.
// Letters « alon »: Sofia Sans Semi Condensed (SIL OFL 1.1) wght 760 converted to outlines, tracking -6/1000 em plus the
// font's kerning; the j is drawn (stem, quarter-ring hook, square-cut terminal) and shared with the app mark.
// 1 unit = 1/100 em, baseline at y = 0. Outlines keep the logo independent of font loading and add no text node.

/** The letters of the wordmark: the drawn j and « alon » (one path, zone foreground). */
export const LETTERS_PATH =
  'M5.58 -49.34H18.24V2.29A16.88 16.88 0 0 1 1.36 19.17H-2.86V6.51H1.36A4.22 4.22 0 0 0 5.58 2.29ZM56.76 0Q55.76 0 55.52 -1.2Q55.27 -2.5 54.97 -4.83Q54.67 -7.16 54.52 -9.36L53.63 -12.9V-33.85Q53.63 -37.77 52.17 -39.33Q50.71 -40.89 47.04 -40.89Q40.3 -40.89 40.5 -35.27Q40.6 -34.07 39.4 -34.07H29.87Q28.77 -34.07 28.62 -35.62Q28.08 -42.75 32.97 -46.59Q37.86 -50.44 47.48 -50.49Q57.26 -50.49 61.77 -46.42Q66.29 -42.35 66.29 -33.46V-12.54Q66.29 -9.19 66.41 -6.44Q66.54 -3.69 66.79 -1.29Q66.99 0 65.69 0ZM38.51 1.1Q32.77 1.1 29.62 -2.47Q26.48 -6.05 26.48 -12.69Q26.48 -17.74 28.35 -20.99Q30.23 -24.24 34.5 -26.09Q38.78 -27.94 45.87 -28.59L54.93 -29.49L54.88 -22.32L47.59 -21.66Q42.61 -21.16 40.65 -19.48Q38.69 -17.8 38.69 -14.18Q38.69 -11.31 39.8 -9.91Q40.91 -8.5 43.27 -8.5Q46.02 -8.5 48.79 -10.31Q51.55 -12.11 55.33 -16.39L56.02 -8.76Q51.7 -4.09 47.7 -1.5Q43.7 1.1 38.51 1.1ZM78.02 0Q76.88 0 76.88 -1.19V-67.11Q76.88 -68.3 78.02 -68.3H88.39Q89.54 -68.3 89.54 -67.11V-1.19Q89.54 0 88.39 0ZM120.54 1.1Q110.3 1.1 104.64 -3.95Q98.98 -8.99 98.98 -18.93V-30.51Q98.98 -40.4 104.61 -45.44Q110.25 -50.49 120.54 -50.49Q130.77 -50.49 136.44 -45.44Q142.1 -40.4 142.1 -30.51V-18.93Q142.1 -8.99 136.49 -3.95Q130.87 1.1 120.54 1.1ZM120.54 -9.73Q125.11 -9.73 127.28 -12.14Q129.44 -14.55 129.44 -19.88V-29.46Q129.44 -34.78 127.28 -37.2Q125.11 -39.61 120.54 -39.61Q115.96 -39.61 113.77 -37.2Q111.59 -34.78 111.59 -29.46V-19.88Q111.59 -14.55 113.77 -12.14Q115.96 -9.73 120.54 -9.73ZM182.14 0Q180.95 0 180.95 -1.19V-32.22Q180.95 -35.99 179.54 -37.73Q178.13 -39.46 174.96 -39.46Q171.9 -39.46 168.91 -37.63Q165.92 -35.8 162.64 -32.42L161.71 -40.59Q164.32 -43.45 167.1 -45.67Q169.87 -47.9 173.09 -49.19Q176.31 -50.49 180.11 -50.49Q186.86 -50.49 190.23 -46.59Q193.61 -42.68 193.61 -34.54V-1.19Q193.61 0 192.46 0ZM152.67 0Q151.48 0 151.48 -1.19V-36.75Q151.48 -39.74 151.3 -42.75Q151.13 -45.75 150.93 -47.99Q150.73 -49.34 152.07 -49.34H161.11Q162.11 -49.34 162.35 -48.29Q162.65 -46.74 162.9 -44.26Q163.15 -41.78 163.25 -39.78L164.14 -35.56V-1.19Q164.14 0 162.94 0Z'

/**
 * Wordmark geometry. The tittle is the square « le jalon »: 17 units, its top on the font's i-dot line, with a
 * 3-unit ink keyline on light grounds (about 1px at the 32px header). Baseline at y = 0, descender 19.17.
 */
export const WORDMARK = {
  viewBox: '-3.86 -71.9 198.47 92.07',
  /** Top of the viewBox above the baseline and full height, in units (baseline position inside the box). */
  top: 71.9,
  height: 92.07,
  tittle: { x: 3.41, y: -70.9, size: 17, keyline: 3 },
} as const

/** App mark: ink plaque (radius 22/100), white j, yellow square, on a 100 grid snapped to whole pixels at 32px. */
export const MARK = {
  viewBox: '0 0 100 100',
  plaqueRx: 22,
  tittle: { x: 40.62, y: 9.38, size: 25 },
} as const

/** The mark's drawn j (stem 18.75 units, hook radii 6.25 and 25, flat terminal). */
export const J_PATH = 'M43.75 40.62H62.5V62.5A25 25 0 0 1 37.5 87.5H31.25V68.75H37.5A6.25 6.25 0 0 0 43.75 62.5Z'
