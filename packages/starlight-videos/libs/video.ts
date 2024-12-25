import type { CollectionEntry } from 'astro:content'

export function isVideoEntry(entry: CollectionEntry<'docs'>): entry is VideoEntry {
  return entry.data.video !== undefined
}

type VideoEntry = CollectionEntry<'docs'> & {
  data: CollectionEntry<'docs'>['data'] & {
    video: NonNullable<CollectionEntry<'docs'>['data']['video']>
  }
}
