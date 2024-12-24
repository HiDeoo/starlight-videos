import { z } from 'astro/zod'

export const videosSchema = z.object({
  // TODO(HiDeoo)
  video: z.string().optional(),
})
