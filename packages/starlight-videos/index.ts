import { fileURLToPath } from 'node:url'

import type { StarlightPlugin } from '@astrojs/starlight/types'

import { rehypeStarlightVideosTasks } from './libs/rehype'
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
                markdown: {
                  rehypePlugins: [[rehypeStarlightVideosTasks]],
                },
                vite: {
                  resolve: {
                    alias: [
                      {
                        find: /^\.\.\/components\/Page\.astro$/,
                        replacement: fileURLToPath(new URL('overrides/Page.astro', import.meta.url)),
                        customResolver(source, importer) {
                          return importer?.endsWith('starlight/routes/common.astro') ? source : undefined
                        },
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
