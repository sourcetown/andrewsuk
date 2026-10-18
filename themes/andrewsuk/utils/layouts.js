const files = import.meta.glob('../layouts/*.json', { eager: true, import: 'default' })

/** Theme layouts. The id is the file name, so new layouts show up without a registry edit. */
export const layouts = Object.entries(files).map(([file, data]) => ({
  id: file.split('/').pop().replace(/\.json$/, ''),
  ...(data && typeof data === 'object' ? data : {})
}))

export function shellFor(all, layoutId) {
  const layout = all.find(item => item.id === layoutId) || null
  if (!layout || layout.kind === 'header' || layout.kind === 'footer') {
    return { layout, header: null, footer: null }
  }
  return {
    layout,
    header: all.find(item => item.id === layout.header && item.kind === 'header') || null,
    footer: all.find(item => item.id === layout.footer && item.kind === 'footer') || null
  }
}
