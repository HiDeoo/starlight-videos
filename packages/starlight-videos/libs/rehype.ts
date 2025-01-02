import type { Root } from 'hast'
import { h } from 'hastscript'
import type { Plugin } from 'unified'
import { CONTINUE, EXIT, SKIP, visit } from 'unist-util-visit'

export const rehypeStarlightVideosTasks: Plugin<[], Root> = function () {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName !== 'li' ||
        !Array.isArray(node.properties['className']) ||
        !node.properties['className'].includes('task-list-item')
      )
        return CONTINUE

      visit(node, 'element', (child, index, parent) => {
        if (child.tagName !== 'input' || index === undefined || !parent) return CONTINUE

        const checkbox = parent.children.at(index)
        if (!checkbox || checkbox.type !== 'element') return CONTINUE
        checkbox.properties['disabled'] = false

        parent.children = [h('label', {}, checkbox, ...parent.children.slice(index + 1))]

        return EXIT
      })

      return SKIP
    })
  }
}
