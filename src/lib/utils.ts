import { createCn } from 'cn/config'

/**
 * Class joining + Tailwind conflict resolution, taught the brand tokens of src/index.css so that
 * e.g. cn('text-display-md', 'text-z-fg') keeps both (size vs colour) and cn('p-card', 'p-4') keeps the last.
 */
export const cn = createCn({
  extend: {
    theme: {
      text: [
        'display-xl', 'display-lg', 'display-md', 'display-sm', 'title-lg', 'title', 'lead', 'copy', 'small',
        'meta', 'micro', 'badge', 'faq', 'price-xl', 'price-lg', 'price-md', 'price-sm', 'stat-lg', 'stat-md', 'code',
        'time',
      ],
      // The whole radius ladder (HANDOFF §16): a name missing here would make cn() keep two radius classes.
      radius: ['micro', 'tag', 'control', 'inner', 'card', 'panel', 'button'],
      shadow: ['lift', 'float', 'bar'],
      spacing: ['gutter', 'section', 'section-sm', 'hero', 'head', 'grid', 'card'],
      container: ['content', 'wide', 'text'],
      ease: ['calm', 'drawer'],
    },
    classGroups: {
      eyebrow: ['eyebrow', 'eyebrow-center'],
    },
  },
})
