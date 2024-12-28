import { fileURLToPath } from 'node:url'

import type { StarlightPlugin } from '@astrojs/starlight/types'

import { overrideStarlightComponent } from './libs/starlight'
import { Translations } from './translations'

export default function starlightVideosPlugin(): StarlightPlugin {
  return {
    name: 'starlight-videos',
    hooks: {
      setup({ addIntegration, config, injectTranslations, logger, updateConfig }) {
        injectTranslations(Translations)

        updateConfig({
          components: {
            ...config.components,
            ...overrideStarlightComponent(config.components, logger, 'DraftContentNotice'),
            ...overrideStarlightComponent(config.components, logger, 'FallbackContentNotice'),
            ...overrideStarlightComponent(config.components, logger, 'MarkdownContent'),
            ...overrideStarlightComponent(config.components, logger, 'PageTitle'),
          },
        })

        addIntegration({
          name: 'starlight-videos-integration',
          hooks: {
            'astro:config:setup': ({ updateConfig: updateAstroConfig }) => {
              updateAstroConfig({
                vite: {
                  resolve: {
                    alias: [
                      {
                        find: /^\..*\/Page\.astro$/,
                        replacement: fileURLToPath(new URL('overrides/Page.astro', import.meta.url)),
                      },
                    ],
                  },
                },
              })
            },
          },
        })
      },
    },
  }
}
