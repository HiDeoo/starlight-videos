import { getCollection, getEntry, type CollectionEntry as AstroCollectionEntry } from 'astro:content'
import starlightProject from 'virtual:starlight/project-context'
import starlightConfig from 'virtual:starlight/user-config'

import type { AnyVideo, Collection, Collections, CollectionVideo, Video, Videos } from '../schemas'

import { DefaultLocale, getLangFromLocale, type Locale } from './i18n'
import { getLocaleFromPath, getPathWithLocale } from './path'

const contentPath = `${starlightProject.srcDir.replace(starlightProject.root, '')}content/docs/`

export async function getVideos(locale: Locale): Promise<VideoEntry[]> {
  const anyVideoEntries = await getAnyVideoEntries(locale)
  return anyVideoEntries.filter(isVideoEntry).sort((a, b) => orderByDateThenTitle(a, b, locale))
}

export async function getCollections(locale: Locale): Promise<CollectionEntry[]> {
  const anyVideoEntries = await getAnyVideoEntries(locale)
  return anyVideoEntries.filter(isCollectionEntry).sort((a, b) => orderByDateThenTitle(a, b, locale))
}

export async function getCollectionVideos(collection: Collection, locale: Locale): Promise<CollectionVideoEntry[]> {
  const anyVideoEntries = await getAnyVideoEntries(locale)
  return (
    anyVideoEntries.filter(
      (entry) => isCollectionVideoEntry(entry) && entry.data.video.collection === collection.collection,
    ) as CollectionVideoEntry[]
  ).sort((a, b) => orderByOrderThenTitle(a, b, locale))
}

export function getCollectionFromCollectionVideo(collectionVideo: CollectionVideo): Collection {
  return { type: 'collection', collection: collectionVideo.collection }
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

async function getAnyVideoEntries(locale: Locale): Promise<AnyVideoEntry[]> {
  const docEntries = await getCollection('docs')
  const anyVideoEntries: AnyVideoEntry[] = []

  for (const entry of docEntries) {
    if (!entry.filePath) continue
    if (import.meta.env.MODE === 'production' && entry.data.draft) continue
    if (!isAnyVideoEntry(entry)) continue

    // If the site is not multilingual, collect all entries.
    if (!starlightConfig.isMultilingual) {
      anyVideoEntries.push(entry)
      continue
    }

    const filePath = entry.filePath.replace(contentPath, '')
    const entryLocale = getLocaleFromPath(filePath)

    // If the entry has the same locale as the current one, collect it.
    if (entryLocale === locale) {
      anyVideoEntries.push(entry)
      continue
    }

    // If the entry does not use the default locale, skip it.
    if (entryLocale !== DefaultLocale) continue

    // Override `console.warn()` to silence logging when a localized entry is not found.
    const warn = console.warn
    console.warn = () => undefined

    // Check if the entry has a corresponding locale entry.
    try {
      const localizedEntry = await getEntry('docs', getPathWithLocale(entry.id, locale))
      if (!localizedEntry) throw new Error('Unavailable localized entry.')
      if (localizedEntry.data.draft === true) throw new Error('Draft localized entry.')
      if (!isAnyVideoEntry(localizedEntry)) throw new Error('Invalid localized entry.')
      // If the entry has a corresponding locale entry, it'll be collected automatically during the iteration.
    } catch {
      // If the entry does not have a corresponding locale entry, collect it as a fallback.
      anyVideoEntries.push(entry)
    }

    // Restore the original `console.warn()` implementation.
    console.warn = warn
  }

  return anyVideoEntries
}

function orderByDateThenTitle(a: EntryWithDate, b: EntryWithDate, locale: Locale): number {
  const dateA = a.data.video.date
  const dateB = b.data.video.date

  if (dateA && dateB) {
    if (dateA > dateB) return -1
    if (dateA < dateB) return 1
  }

  return a.data.title.localeCompare(b.data.title, getLangFromLocale(locale))
}

function orderByOrderThenTitle(a: CollectionVideoEntry, b: CollectionVideoEntry, locale: Locale): number {
  const orderA = a.data.video.order
  const orderB = b.data.video.order

  if (orderA && orderB) {
    if (orderA > orderB) return 1
    if (orderA < orderB) return -1
  }

  return a.data.title.localeCompare(b.data.title, getLangFromLocale(locale))
}

type EntryWithVideo = VideoCollectionEntry<Video | CollectionVideo>
type EntryWithDate = VideoCollectionEntry<Video | Collection>

type VideoEntry = VideoCollectionEntry<Video>
export type CollectionVideoEntry = VideoCollectionEntry<CollectionVideo>
type CollectionEntry = VideoCollectionEntry<Collection>
type VideosEntry = VideoCollectionEntry<Videos>
type CollectionsEntry = VideoCollectionEntry<Collections>

type AnyVideoEntry = VideoCollectionEntry<AnyVideo>

type VideoCollectionEntry<T extends AnyVideo> = AstroCollectionEntry<'docs'> & {
  data: AstroCollectionEntry<'docs'>['data'] & {
    video: T
  }
}
