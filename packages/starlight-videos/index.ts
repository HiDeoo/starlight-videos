import { fileURLToPath } from 'node:url'

import type { StarlightPlugin } from '@astrojs/starlight/types'

export default function starlightVideosPlugin(): StarlightPlugin {
  return {
    name: 'starlight-videos',
    hooks: {
      setup({ addIntegration }) {
        addIntegration({
          name: 'starlight-videos-integration',
          hooks: {
            'astro:config:setup': ({ updateConfig }) => {
              updateConfig({
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
