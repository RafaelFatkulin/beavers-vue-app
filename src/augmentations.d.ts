export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    type?: string
    order?: number
  }
}
