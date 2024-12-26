import starlightConfig from 'virtual:starlight/user-config'

export const DefaultLocale =
  starlightConfig.defaultLocale.locale === 'root' ? undefined : starlightConfig.defaultLocale.locale

export type Locale = string | undefined
