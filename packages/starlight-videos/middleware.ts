import { defineRouteMiddleware } from '@astrojs/starlight/route-data'

import { isAnyVideoEntry } from './libs/video'

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals
  const { entry } = starlightRoute

  if (isAnyVideoEntry(entry)) {
    entry.data = {
      ...entry.data,
      template: 'splash',
    }
    starlightRoute.hasSidebar = false
    starlightRoute.pagination = { prev: undefined, next: undefined }
    starlightRoute.toc = undefined
  }
})
