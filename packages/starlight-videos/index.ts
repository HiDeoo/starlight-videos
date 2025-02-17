import type { StarlightPlugin } from '@astrojs/starlight/types'

import { rehypeStarlightVideosTasks } from './libs/rehype'
import { overrideStarlightComponent } from './libs/starlight'
import { Translations } from './translations'

export default function starlightVideosPlugin(): StarlightPlugin {
  return {
    name: 'starlight-videos',
    hooks: {
      'i18n:setup'({ injectTranslations }) {
        injectTranslations(Translations)
      },
      'config:setup'({ addIntegration, addRouteMiddleware, config, logger, updateConfig }) {
        addRouteMiddleware({ entrypoint: 'starlight-videos/middleware' })

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
              })
            },
          },
        })
      },
    },
  }
}
