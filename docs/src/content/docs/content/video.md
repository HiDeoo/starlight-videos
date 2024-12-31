---
title: Video
description: // TODO(HiDeoo)
---

A video is the most basic type of content supported by the Starlight Videos plugin.
A video page displays a video player at the top of the page with additional content below it.
All videos can be listed in a [videos page](/content/videos/).

// TODO(HiDeoo) Link to example in aside, e.g. "See it in action" in https://starlight.astro.build/getting-started/

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

All the Markdown and MDX content will be displayed below the video player allowing you to provide additional information, instructions, examples, or any other content you want to share with your users.

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

**type:** [`StarlightVideosAction[]`](#action-configuration)

Optional call-to-action links displayed below the video player.
Check the [“Action configuration”](#action-configuration) section for more information.

## Action configuration

Actions are visually distinct call-to-action links displayed below the video player.
They can be used to link to related content, resources, or actions users can take after watching the video.

The following example demonstrates how to add two actions to a video page, one to download the source code related to the video and another to open a documentation page.

```md
---
video:
  actions:
    - text: Download code
      link: https://github.com/HiDeoo/starlight-videos
    - text: Documentation
      link: https://starlight.astro.build/
---
```

Actions are defined in the [`actions`](#actions) field of the `video` frontmatter and support the following fields:

### `text`

**required**  
**type:** `string`

The text displayed on the action link.

```md
---
video:
  actions:
    - text: Download code
---
```

### `link`

**required**  
**type:** `string`

The URL that the action link points to.

```md
---
video:
  actions:
    - link: https://github.com/HiDeoo/starlight-videos
---
```

### `variant`

**type:** `'primary' | 'secondary' | 'minimal'`  
**default:** `'primary'`

The appearance of the action link.
Use `primary` for a prominent call-to-action link using the theme’s accent color, `secondary` for a less prominent link, or `minimal` for a link with minimal styling.

```md
---
video:
  actions:
    - variant: secondary
---
```

### `icon`

**type:** `string`

The optional icon to display in the action link which must be the name of one of [Starlight’s built-in icons](https://starlight.astro.build/reference/icons/#all-icons).

```md
---
video:
  actions:
    - icon: external
---
```

### `iconPlacement`

**type:** `'start' | 'end'`  
**default:** `'end'`

The placement of the icon in relation to the action link text.

```md
---
video:
  actions:
    - iconPlacement: start
---
```
