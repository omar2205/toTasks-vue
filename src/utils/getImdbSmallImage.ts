const defaultOptions = {
  q: 75,
  h: 120,
}

export function getImdbSmallImage(imageUrl: string, opts = defaultOptions) {
  if (!imageUrl) return ''
  const url = imageUrl.split('jpg')
  // url[1] = 'QL75_UX140_CR0,0,140,207_.jpg'
  url[1] = `QL${opts.q}_UX${opts.h}_.jpg`
  return url.join('')
}
