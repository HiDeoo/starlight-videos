---
title: Video
description: // TODO(HiDeoo)
---

A video page displays a video player at the top of the page with additional content below it.
All videos can be listed in a [videos page](/content/videos/) and are unrelated to each other contrary to [collection videos](/content/collection-video/).

:::tip[See it in action]
Check out a [demo of a video page](/demo/video-guides/aliquam-sit-amet/) to get a preview.
:::

## Create a video page

To transform a documentation page into a video page, add the `video` frontmatter field to a Markdown or MDX page with the `type` set to `video` and at least a [`link`](#link) to the video and its [`duration`](#duration).

```md title="src/content/docs/videos/example.md" {3-6}
---
title: My video guide
video:
  type: video
  link: https://www.youtube.com/watch?v=5u0Ds7wzUeI
  duration: 180
---

## My video guide

Welcome to my video guide!
```

Any Markdown or MDX content will be displayed below the video player allowing you to provide additional information, instructions, examples, or any other content you want to share with your users.

## Frontmatter fields

The `video` frontmatter field supports the following fields when the `type` is set to `video`:

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

### `description`

**type:** `number | string`

An optional description of the video that will be displayed in [videos pages](/content/videos/) listing all videos.
When not provided, the Starlight [`description`](https://starlight.astro.build/reference/frontmatter/#description) frontmatter field will be used if present.

```md
---
video:
  description: A concise description of the video content to use in videos pages.
---
```

### `date`

**type:** `Date`

The optional publication date of the video which must be a valid YAML timestamp.
In [videos pages](/content/videos/) listing all videos, videos will be sorted by publication date and then by title.

```md
---
video:
  date: 2024-12-31
---
```

### `transcript`

**type:** `string`

The optional relative path from the root of the project to the transcript file of the video.
Transcripts are displayed at the bottom of the video page and can be used to provide a text version of the video content.
The transcript file must be in the [SubRip format](https://en.wikipedia.org/wiki/SubRip) (`.srt`).

```md
---
video:
  transcript: ./src/assets/transcripts/example.srt
---
```

### `difficulty`

**type:** `string`

An optional difficulty level of the video that will be displayed below the video player and in [videos pages](/content/videos/) listing all videos.

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
