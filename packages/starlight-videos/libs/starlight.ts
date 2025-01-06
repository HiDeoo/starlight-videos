import type { StarlightUserConfig } from '@astrojs/starlight/types'
import type { AstroIntegrationLogger } from 'astro'

export function overrideStarlightComponent(
  components: StarlightUserConfig['components'],
  logger: AstroIntegrationLogger,
  component: keyof NonNullable<StarlightUserConfig['components']>,
) {
  if (components?.[component]) {
    logger.warn(`It looks like you already have a \`${component}\` component override in your Starlight configuration.`)
    logger.warn(
      `To use \`starlight-videos\`, either remove your override or update it to render the content from \`starlight-videos/components/${component}.astro\`.`,
    )

    return {}
  }

  return {
    [component]: `starlight-videos/overrides/${component}.astro`,
  }
}
