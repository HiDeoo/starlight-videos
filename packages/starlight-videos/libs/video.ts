import { getCollection, type CollectionEntry } from 'astro:content'

import type { AnyVideo, Collection, Collections, CollectionVideo, Video, Videos } from '../schemas'

const anyVideoEntries = await getAnyVideoEntries()
const videoEntries = anyVideoEntries.filter(isVideoEntry)

export function isAnyVideoEntry(entry: CollectionEntry<'docs'>): entry is AnyVideoEntry {
  return entry.data.video !== undefined
}

function isVideoEntry(entry: CollectionEntry<'docs'>): entry is VideoEntry {
  return isAnyVideoEntry(entry) && entry.data.video.type === 'video'
}

export function isEntryWithVideo(entry: CollectionEntry<'docs'>): entry is EntryWithVideo {
  return isAnyVideoEntry(entry) && (entry.data.video.type === 'video' || entry.data.video.type === 'collection-video')
}

export function isEntryWithCustomContent(entry: CollectionEntry<'docs'>): entry is EntryWithCustomContent {
  return (
    isAnyVideoEntry(entry) &&
    (entry.data.video.type === 'collection' ||
      entry.data.video.type === 'videos' ||
      entry.data.video.type === 'collections')
  )
}

function getAnyVideoEntries(): Promise<AnyVideoEntry[]> {
  return getCollection('docs', (entry) => {
    if (import.meta.env.MODE === 'production' && entry.data.draft) return false
    return isAnyVideoEntry(entry)
  }) as Promise<AnyVideoEntry[]>
}

type EntryWithVideo = VideoCollectionEntry<Video | CollectionVideo>
type EntryWithCustomContent = VideoCollectionEntry<Collection | Videos | Collections>

type VideoEntry = VideoCollectionEntry<Video>

type AnyVideoEntry = VideoCollectionEntry<AnyVideo>

type VideoCollectionEntry<T extends AnyVideo> = CollectionEntry<'docs'> & {
  data: CollectionEntry<'docs'>['data'] & {
    video: T
  }
}
