import type { AstroConfig } from 'astro'

import { throwPluginError } from './error'
import { rehypeStarlightVideosTasks } from './rehype'
import { satteriStarlightVideosTasks } from './satteri'

export function applyMarkdownPlugin(processor: MarkdownProcessor) {
  if (isSatteriProcessor(processor)) {
    processor.options.hastPlugins.push(satteriStarlightVideosTasks())
  } else if (isUnifiedProcessor(processor)) {
    processor.options.rehypePlugins.push([rehypeStarlightVideosTasks])
  } else {
    throwPluginError("The configured 'markdown.processor' is not supported by the starlight-videos plugin.")
  }
}

function isSatteriProcessor(processor: unknown): processor is SatteriMarkdownProcessor {
  if (typeof processor !== 'object' || processor === null) return false
  const candidate = processor as { name?: unknown; options?: { hastPlugins?: unknown } }
  return candidate.name === 'satteri' && Array.isArray(candidate.options?.hastPlugins)
}

function isUnifiedProcessor(processor: unknown): processor is UnifiedMarkdownProcessor {
  if (typeof processor !== 'object' || processor === null) return false
  const candidate = processor as { name?: unknown; options?: { rehypePlugins?: unknown } }
  return candidate.name === 'unified' && Array.isArray(candidate.options?.rehypePlugins)
}

type MarkdownProcessor = NonNullable<AstroConfig['markdown']['processor']>

interface SatteriMarkdownProcessor {
  name: 'satteri'
  options: { hastPlugins: unknown[] }
}

interface UnifiedMarkdownProcessor {
  name: 'unified'
  options: { rehypePlugins: unknown[] }
}
