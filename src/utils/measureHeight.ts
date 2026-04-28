import { parseToPx } from './parseToPx.js'

/**
 * Returns the height in px for a template element.
 * The `height` attribute is required; callers validate before calling this.
 */
export function measureHeight(template: Element): number {
  const heightAttr = template.getAttribute('height')
  if (heightAttr === null) return 0
  return parseToPx(heightAttr, template)
}
