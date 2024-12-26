import { getCollection, type CollectionEntry as AstroCollectionEntry } from 'astro:content'

import type { AnyVideo, Collection, Collections, CollectionVideo, Video, Videos } from '../schemas'

const anyVideoEntries = await getAnyVideoEntries()
const videoEntries = anyVideoEntries.filter(isVideoEntry)
const collectionVideoEntries = anyVideoEntries.filter(isCollectionVideoEntry)
const collectionEntries = anyVideoEntries.filter(isCollectionEntry)

export function getVideos(): VideoEntry[] {
  return videoEntries
}

export function getCollections(): CollectionEntry[] {
  return collectionEntries
}

export function getCollectioNVideos(collectionEntry: CollectionEntry): CollectionVideoEntry[] {
  return collectionVideoEntries.filter((entry) => entry.data.video.collection === collectionEntry.data.video.collection)
}

export function isAnyVideoEntry(entry: AstroCollectionEntry<'docs'>): entry is AnyVideoEntry {
  return entry.data.video !== undefined
}

function isVideoEntry(entry: AstroCollectionEntry<'docs'>): entry is VideoEntry {
  return isAnyVideoEntry(entry) && entry.data.video.type === 'video'
}

function isCollectionVideoEntry(entry: AstroCollectionEntry<'docs'>): entry is CollectionVideoEntry {
  return isAnyVideoEntry(entry) && entry.data.video.type === 'collection-video'
}

export function isCollectionEntry(entry: AstroCollectionEntry<'docs'>): entry is CollectionEntry {
  return isAnyVideoEntry(entry) && entry.data.video.type === 'collection'
}

export function isVideosEntry(entry: AstroCollectionEntry<'docs'>): entry is VideosEntry {
  return isAnyVideoEntry(entry) && entry.data.video.type === 'videos'
}

export function isCollectionsEntry(entry: AstroCollectionEntry<'docs'>): entry is CollectionsEntry {
  return isAnyVideoEntry(entry) && entry.data.video.type === 'collections'
}

export function isEntryWithVideo(entry: AstroCollectionEntry<'docs'>): entry is EntryWithVideo {
  return isAnyVideoEntry(entry) && (entry.data.video.type === 'video' || entry.data.video.type === 'collection-video')
}

function getAnyVideoEntries(): Promise<AnyVideoEntry[]> {
  return getCollection('docs', (entry) => {
    if (import.meta.env.MODE === 'production' && entry.data.draft) return false
    return isAnyVideoEntry(entry)
  }) as Promise<AnyVideoEntry[]>
}

type EntryWithVideo = VideoCollectionEntry<Video | CollectionVideo>

type VideoEntry = VideoCollectionEntry<Video>
type CollectionVideoEntry = VideoCollectionEntry<CollectionVideo>
export type CollectionEntry = VideoCollectionEntry<Collection>
type VideosEntry = VideoCollectionEntry<Videos>
type CollectionsEntry = VideoCollectionEntry<Collections>

type AnyVideoEntry = VideoCollectionEntry<AnyVideo>

type VideoCollectionEntry<T extends AnyVideo> = AstroCollectionEntry<'docs'> & {
  data: AstroCollectionEntry<'docs'>['data'] & {
    video: T
  }
}
