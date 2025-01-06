import type { AstroConfig } from 'astro'
import starlightProject from 'virtual:starlight/project-context'
import starlightConfig from 'virtual:starlight/user-config'

import type { Locale } from './i18n'

const base = stripTrailingSlash(import.meta.env.BASE_URL)

const trailingSlashTransformers: Record<AstroConfig['trailingSlash'], (path: string) => string> = {
  always: ensureTrailingSlash,
  ignore: (href) => href,
  never: stripTrailingSlash,
}

const trailingSlashTransformer = trailingSlashTransformers[starlightProject.trailingSlash]

export function getEntryPath(id: string, locale: Locale) {
  const path = getPathWithLocale(id, locale)
  return trailingSlashTransformer(path ? `${base}/${path}` : `${base}/`)
}

export function getPathWithLocale(path: string, locale: Locale): string {
  const pathLocale = getLocaleFromPath(path)
  if (pathLocale === locale) return path
  locale = locale ?? ''
  if (pathLocale === path) return locale
  if (pathLocale) return stripTrailingSlash(path.replace(`${pathLocale}/`, locale ? `${locale}/` : ''))
  return path ? `${stripTrailingSlash(locale)}/${stripLeadingSlash(path)}` : locale
}

export function getLocaleFromPath(path: string): Locale {
  const baseSegment = path.split('/')[0]
  return starlightConfig.locales && baseSegment && baseSegment in starlightConfig.locales ? baseSegment : undefined
}

export function stripLeadingSlash(path: string) {
  if (!path.startsWith('/')) return path
  return path.slice(1)
}

export function stripTrailingSlash(path: string) {
  if (!path.endsWith('/')) return path
  return path.slice(0, -1)
}

function ensureTrailingSlash(path: string): string {
  if (path.endsWith('/')) return path
  return `${path}/`
}
