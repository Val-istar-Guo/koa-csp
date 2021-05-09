export interface Policy {
  'img-src'?: string[]
  'script-src'?: string[]
  'default-src'?: string[]
  'report-uri'?: string[]

  imgSrc?: string[]
  scriptSrc?: string[]
  defaultSrc?: string[]
  reportUri?: string[]

  [key: string]: string[] | undefined
}
