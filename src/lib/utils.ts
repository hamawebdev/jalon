import { createCn } from 'cn/config'

/** Joins class names and resolves Tailwind conflicts (the last one wins), aware of the site's own tokens. */
export const cn = createCn({
  extend: {
    theme: {
      shadow: ['card', 'glow', 'pill'],
      container: ['site'],
    },
  },
})
