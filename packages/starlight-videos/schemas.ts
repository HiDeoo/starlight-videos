import { z } from 'astro/zod'
import { parse, toSeconds } from 'iso8601-duration'

const baseVideoSchema = z.object({
  // TODO(HiDeoo)
  link: z.string().url(),
  // TODO(HiDeoo)
  // TODO(HiDeoo) in seconds or ISO 8601 duration
  duration: z.union([z.number(), z.string()]).transform((value, context) => {
    if (typeof value === 'number') return value

    try {
      return toSeconds(parse(value))
    } catch {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid duration format',
      })
      return z.NEVER
    }
  }),
  // TODO(HiDeoo)
  difficulty: z.string().optional(),
  // TODO(HiDeoo)
  actions: z
    .object({
      // TODO(HiDeoo)
      text: z.string(),
      // TODO(HiDeoo)
      link: z.string(),
      // TODO(HiDeoo)
      variant: z.enum(['primary', 'secondary', 'minimal']).default('primary'),
      // TODO(HiDeoo)
      icon: z.string().optional(),
    })
    .array()
    .default([]),
})

const videoDefinitionSchema = baseVideoSchema.extend({
  // TODO(HiDeoo)
  type: z.literal('video'),
  // TODO(HiDeoo)
  // TODO(HiDeoo) mention fallback
  description: z.string().optional(),
  // TODO(HiDeoo)
  date: z.date().optional(),
})

const collectionVideoDefinitionSchema = baseVideoSchema.extend({
  // TODO(HiDeoo)
  type: z.literal('collection-video'),
  // TODO(HiDeoo)
  collection: z.string(),
  // TODO(HiDeoo)
  order: z.number().optional(),
})

const collectionDefinitionSchema = z.object({
  // TODO(HiDeoo)
  type: z.literal('collection'),
  // TODO(HiDeoo)
  collection: z.string(),
  // TODO(HiDeoo)
  // TODO(HiDeoo) mention fallback
  description: z.string().optional(),
  // TODO(HiDeoo)
  date: z.date().optional(),
})

const videosDefinitionSchema = z.object({
  // TODO(HiDeoo)
  type: z.literal('videos'),
})

const collectionsDefinitionSchema = z.object({
  // TODO(HiDeoo)
  type: z.literal('collections'),
})

export const videosSchema = z.object({
  // TODO(HiDeoo)
  video: z
    .discriminatedUnion('type', [
      videoDefinitionSchema,
      collectionVideoDefinitionSchema,
      collectionDefinitionSchema,
      videosDefinitionSchema,
      collectionsDefinitionSchema,
    ])
    .optional(),
})

export type Video = z.output<typeof videoDefinitionSchema>
export type CollectionVideo = z.output<typeof collectionVideoDefinitionSchema>
export type Collection = z.output<typeof collectionDefinitionSchema>
export type Videos = z.output<typeof videosDefinitionSchema>
export type Collections = z.output<typeof collectionsDefinitionSchema>

export type AnyVideo = Video | CollectionVideo | Collection | Videos | Collections
