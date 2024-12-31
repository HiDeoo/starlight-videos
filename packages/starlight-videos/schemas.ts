import { z } from 'astro/zod'
import { parse, toSeconds } from 'iso8601-duration'

const baseVideoSchema = z.object({
  /**
   * The link to the video to display in the video player.
   */
  link: z.string().url(),
  /**
   * The duration of the video which can be a number of seconds or a string representing a duration in the ISO 8601
   * format.
   *
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
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
  /**
   * The relative path from the root of the project to the transcript file of the video.
   * The transcript file must be in the SubRip format (`.srt`).
   *
   * @see https://en.wikipedia.org/wiki/SubRip
   */
  transcript: z.string().optional(),
  /**
   * The difficulty level of the video.
   */
  difficulty: z.string().optional(),
  /**
   * Call-to-action links displayed below the video player.
   */
  actions: z
    .object({
      /**
       * The text displayed on the action link.
       */
      text: z.string(),
      /**
       * The URL that the action link points to.
       */
      link: z.string(),
      /**
       * The appearance of the action link.
       */
      variant: z.enum(['primary', 'secondary', 'minimal']).default('primary'),
      /**
       * The icon displayed in the action link.
       *
       * @see https://starlight.astro.build/reference/icons/#all-icons
       */
      icon: z.string().optional(),
      /**
       * The placement of the icon in relation to the action link text.
       */
      iconPlacement: z.enum(['start', 'end']).default('start'),
    })
    .array()
    .optional(),
})

const videoDefinitionSchema = baseVideoSchema.extend({
  /**
   * Defines the type of video content which represents a single video.
   */
  type: z.literal('video'),
  /**
   * A short description of the video content.
   * When not provided, the Starlight `description` frontmatter field will be used as a fallback if available.
   */
  description: z.string().optional(),
  /**
   * The publication date of the video.
   * In videos pages, videos will be sorted by publication date and then by title.
   */
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
