import { z } from 'astro/zod'

export const videosSchema = z.object({
  // TODO(HiDeoo)
  video: z
    .object({
      // TODO(HiDeoo)
      link: z.string().url(),
    })
    .optional(),
})
