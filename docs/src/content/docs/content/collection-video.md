---
title: Collection Video
description: // TODO(HiDeoo)
---

A collection video page displays a video player at the top of the page with additional content below it.
Collection videos are related to each other and are grouped in a [collection](/content/collection/).

:::tip[See it in action]
Check out a [demo of a collection video page](/demo/video-courses/donec-eleifend/consectetur-at-quis/) to get a preview.
:::

## Create a collection video page

To transform a documentation page into a collection video page, add the `video` frontmatter field to a Markdown or MDX page with the `type` set to `collection-video` and at least a [`link`](#link) to the video, its [`duration`](#duration) and the [`collection`](#collection) it belongs to.

```md title="src/content/docs/course/example.md" {3-7}
---
title: A video from my course
video:
  type: collection-video
  link: https://www.youtube.com/watch?v=5u0Ds7wzUeI
  duration: 180
  collection: course
---

## A video from my course

Welcome to a video from my course!
```

## Frontmatter fields

The `video` frontmatter field supports the following fields when the `type` is set to `collection-video`:

### `link`

**required**  
**type:** `string`

The link to the video to display in the video player at the top of the page.

:::note
Only YouTube videos are supported at the moment.
:::

```md
---
video:
  link: https://www.youtube.com/watch?v=5u0Ds7wzUeI
---
```

### `duration`

**required**  
**type:** `number | string`

The duration of the video which can be a number of seconds or a string representing a duration in the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601#Durations).

```md
---
video:
  duration: 180 # 3 minutes
---
```

```md
---
video:
  duration: P0Y0M0DT0H3M0S # 3 minutes
---
```

### `collection`

**required**  
**type:** `string`

The name of the [collection](/content/collection/) the video belongs to which groups related videos together.

```md
---
video:
  collection: course
---
```

### `order`

**type:** `number`

The optional order of the video in the collection.
In [collection pages](/content/collection/) listing all collection videos, videos are sorted by their order and then by title.

```md
---
video:
  order: 3
---
```

### `transcript`

**type:** `string`

The optional relative path from the root of the project to the transcript file of the video.
Transcripts are displayed at the bottom of the collection video page and can be used to provide a text version of the video content.
The transcript file must be in the [SubRip format](https://en.wikipedia.org/wiki/SubRip) (`.srt`).

```md
---
video:
  transcript: ./src/assets/transcripts/example.srt
---
```

### `difficulty`

**type:** `string`

An optional difficulty level of the video that will be displayed below the video player.

```md
---
video:
  difficulty: Beginner
---
```

### `actions`

**type:** [`StarlightVideosAction[]`](/reference/actions/)

Optional call-to-action links displayed below the video player.
Check the [actions refernce](/reference/actions/) for more information.
