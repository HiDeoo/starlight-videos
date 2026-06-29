import type { ElementContent } from 'hast'
import { defineHastPlugin, type HastPluginDefinition } from 'satteri'

export function satteriStarlightVideosTasks(): HastPluginDefinition {
  return defineHastPlugin({
    name: 'starlight-videos-tasks',
    element: {
      filter: ['li'],
      visit(node) {
        if (!Array.isArray(node.properties['className']) || !node.properties['className'].includes('task-list-item')) {
          return
        }

        const children = transformTaskListItemChildren(node.children)
        if (!children) return

        return { ...node, children }
      },
    },
  })
}

function transformTaskListItemChildren(children: ElementContent[]): ElementContent[] | undefined {
  for (const [index, child] of children.entries()) {
    if (child.type !== 'element') continue

    if (child.tagName === 'input') {
      return [
        {
          type: 'element',
          tagName: 'label',
          properties: {},
          children: [{ ...child, properties: { ...child.properties, disabled: false } }, ...children.slice(index + 1)],
        },
      ]
    }

    const transformedChildren = transformTaskListItemChildren(child.children)

    if (transformedChildren) {
      return [...children.slice(0, index), { ...child, children: transformedChildren }, ...children.slice(index + 1)]
    }
  }

  return
}
