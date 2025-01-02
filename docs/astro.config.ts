import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightVideos from 'starlight-videos'

export default defineConfig({
  integrations: [
    starlight({
      description: 'Starlight plugin to quickly and easily enhance your documentation with video guides and courses.',
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-videos/edit/main/docs/',
      },
      plugins: [starlightVideos()],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started'],
        },
        {
          label: 'Content',
          items: [
            'content/video',
            'content/videos',
            'content/collection-video',
            'content/collection',
            'content/collections',
          ],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
        {
          label: 'Reference',
          items: ['reference/actions'],
        },
        {
          label: 'Resources',
          items: [{ label: 'Plugins and Tools', slug: 'resources/starlight' }],
        },
        {
          label: 'Demo',
          items: [],
        },
      ],
      social: {
        blueSky: 'https://bsky.app/profile/hideoo.dev',
        github: 'https://github.com/HiDeoo/starlight-videos',
      },
      title: 'Starlight Videos',
    }),
  ],
  site: 'https://starlight-videos.netlify.app/',
})
