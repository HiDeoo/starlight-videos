import { z } from 'astro/zod'

const baseVideoSchema = z.object({
  // TODO(HiDeoo)
  link: z.string().url(),
  // TODO(HiDeoo)
  // TODO(HiDeoo) in seconds
  duration: z.number(),
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
