export interface Policy {
  'img-src'?: string[]
  'script-src'?: string[]
  'default-src'?: string[]
  'report-uri'?: string[]
  'frame-ancestors'?: string[]

  imgSrc?: string[]
  scriptSrc?: string[]
  defaultSrc?: string[]
  reportUri?: string[]
  frameAncestors?: string[]

  [key: string]: string[] | undefined
}
