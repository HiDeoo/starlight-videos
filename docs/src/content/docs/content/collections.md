---
title: Collections
description: Learn how to create a collections page to list all collections available in your project.
---

A collections page list all [collections](/content/collection/) available in the project.

:::tip[See it in action]
Check out a [demo of a collections page](/demo/video-courses/) to get a preview.
:::

## Create a collections page

To transform a documentation page into a collections page, add the `video` frontmatter field to a Markdown or MDX page with the `type` set to `collections`.

```md title="src/content/docs/videos.md" {3-4}
---
title: All videos
video:
  type: collections
---
```

Any Markdown or MDX content will not be rendered in the videos page.

## Frontmatter fields

The `video` frontmatter field does not support any additional fields when the `type` is set to `collections`.
