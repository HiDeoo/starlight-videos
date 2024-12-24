import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [
    starlight({
      description: '// TODO(HiDeoo)',
      locales: {
        root: { label: 'English', lang: 'en' },
        fr: { label: 'Français', lang: 'fr' },
      },
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-videos/edit/main/docs/',
      },
      // TODO(HiDeoo)
      sidebar: [],
      social: {
        blueSky: 'https://bsky.app/profile/hideoo.dev',
        github: 'https://github.com/HiDeoo/starlight-videos',
      },
      title: 'Starlight Videos',
    }),
  ],
  site: 'https://starlight-videos.netlify.app/',
})
