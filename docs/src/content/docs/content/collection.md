---
title: Collection
description: // TODO(HiDeoo)
---

A collection page list all [collection videos](/content/collection-video/) available in the project for a specific collection.

// TODO(HiDeoo) Link to example in aside, e.g. "See it in action" in https://starlight.astro.build/getting-started/

## Create a collection page

To transform a documentation page into a collection page, add the `video` frontmatter field to a Markdown or MDX page with the `type` set to `collection` and at least a [`collection`](#collection) to define the collection.

```md title="src/content/docs/course/index.md" {3-5}
---
title: My video course
video:
  type: collection
  collection: course
---
```

Any Markdown or MDX content will be displayed alongside the collection videos allowing you to provide additional information related to the collection you want to share with your users.

## Frontmatter fields

The `video` frontmatter field supports the following fields when the `type` is set to `collection`:

### `collection`

**required**  
**type:** `string`

The name of the collection for which to display the collection videos.
The collection name must match the collection name defined in the [`collection`](/content/collection-video/#collection) field of all collection videos related to that collection.

```md
---
video:
  collection: course
---
```

### `description`

**type:** `number | string`

An optional description of the collection that will be displayed in [collections pages](/content/collections/) listing all collections.
When not provided, the Starlight [`description`](https://starlight.astro.build/reference/frontmatter/#description) frontmatter field will be used if present.

```md
---
video:
  description: A concise description of the collection to display in the collections page.
---
```

### `date`

**type:** `Date`

The optional publication date of the collection which must be a valid YAML timestamp.
In [collections pages](/content/collections/) listing all collections, collections will be sorted by publication date and then by title.

```md
---
video:
  date: 2024-12-31
---
```
