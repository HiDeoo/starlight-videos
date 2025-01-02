---
title: Actions
description: Learn how to add call-to-action links to related content, resources, or actions related to a video.
---

Actions are visually distinct call-to-action links displayed below the video player.

Actions can be defined in the frontmatter of a [video](/content/video/) or [collection video](/content/collection-video/) page to link to related content, resources, or actions users can take after watching the video.

:::tip[See it in action]
Check out a [demo of a video page](/demo/video-guides/aliquam-sit-amet/) to get a preview of an action link to download the source code related to a video.
:::

## Create actions

The following example demonstrates how to add two actions, one to download the source code related to the video and another to open a documentation page.

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

## Frontmatter fields

Actions are defined in the [`actions`](#actions) field of the `video` frontmatter when the `type` is set to [`video`](/content/video/) or [`collection-video`](/content/collection-video/) and support the following fields:

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
