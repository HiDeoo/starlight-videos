import { z } from 'astro/zod'

const videoDefinitionSchema = z.object({
  // TODO(HiDeoo)
  type: z.literal('video'),
  // TODO(HiDeoo)
  link: z.string().url(),
})

const collectionVideoDefinitionSchema = z.object({
  // TODO(HiDeoo)
  type: z.literal('collection-video'),
  // TODO(HiDeoo)
  collection: z.string(),
  // TODO(HiDeoo)
  link: z.string().url(),
})

const collectionDefinitionSchema = z.object({
  // TODO(HiDeoo)
  type: z.literal('collection'),
  // TODO(HiDeoo)
  collection: z.string(),
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
