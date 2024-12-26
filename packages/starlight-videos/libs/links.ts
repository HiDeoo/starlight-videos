import type { AstroConfig } from 'astro'
import starlightProject from 'virtual:starlight/project-context'
import starlightConfig from 'virtual:starlight/user-config'

import type { Locale } from './starlight'

const base = stripTrailingSlash(import.meta.env.BASE_URL)

const trailingSlashTransformers: Record<AstroConfig['trailingSlash'], (path: string) => string> = {
  always: ensureTrailingSlash,
  ignore: (href) => href,
  never: stripTrailingSlash,
}

const trailingSlashTransformer = trailingSlashTransformers[starlightProject.trailingSlash]

export function getLink(id: string, locale: Locale) {
  const link = getLinkWithLocale(id, locale)
  return trailingSlashTransformer(link ? `${base}/${link}` : `${base}/`)
}

function getLinkWithLocale(link: string, locale: Locale): string {
  const linkLocale = getLocaleFromLink(link)
  if (linkLocale === locale) return link
  locale = locale ?? ''
  if (linkLocale === link) return locale
  if (linkLocale) return stripTrailingSlash(link.replace(`${linkLocale}/`, locale ? `${locale}/` : ''))
  return link ? `${stripTrailingSlash(locale)}/${stripLeadingSlash(link)}` : locale
}

function getLocaleFromLink(link: string): Locale {
  const baseSegment = link.split('/')[0]
  return starlightConfig.locales && baseSegment && baseSegment in starlightConfig.locales ? baseSegment : undefined
}

export function stripLeadingSlash(link: string) {
  if (!link.startsWith('/')) return link
  return link.slice(1)
}

function stripTrailingSlash(link: string) {
  if (!link.endsWith('/')) return link
  return link.slice(0, -1)
}

function ensureTrailingSlash(link: string): string {
  if (link.endsWith('/')) return link
  return `${link}/`
}
