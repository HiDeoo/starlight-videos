import type { CollectionEntry } from 'astro:content'

import type { AnyVideo, CollectionVideo, Video } from '../schemas'

export function isAnyVideoEntry(entry: CollectionEntry<'docs'>): entry is AnyVideoEntry {
  return entry.data.video !== undefined
}

export function isEntryWithVideo(entry: CollectionEntry<'docs'>): entry is EntryWithVideo {
  return (
    entry.data.video !== undefined &&
    (entry.data.video.type === 'video' || entry.data.video.type === 'collection-video')
  )
}

type EntryWithVideo = VideoCollectionEntry<Video | CollectionVideo>
type AnyVideoEntry = VideoCollectionEntry<AnyVideo>

type VideoCollectionEntry<T extends AnyVideo> = CollectionEntry<'docs'> & {
  data: CollectionEntry<'docs'>['data'] & {
    video: T
  }
}
