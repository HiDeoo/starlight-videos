---
title: Videos
description: // TODO(HiDeoo)
---

A videos page list all [videos](/content/video/) available in the project and not part of a [collection](/content/collection/).

// TODO(HiDeoo) Link to example in aside, e.g. "See it in action" in https://starlight.astro.build/getting-started/

## Create a videos page

To transform a documentation page into a videos page, add the `video` frontmatter field to a Markdown or MDX page with the `type` set to `videos`.

```md title="src/content/docs/videos.md" {3-4}
---
title: All videos
video:
  type: videos
---
```

Any Markdown or MDX content will not be rendered in the videos page.

## Frontmatter fields

The `video` frontmatter field does not support any additional fields when the `type` is set to `videos`.
