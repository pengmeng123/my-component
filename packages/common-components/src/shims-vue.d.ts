/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.less?module' {
  const styles: Record<string, string>
  export = styles
}
declare module '*.less' {
  const styles: Record<string, string>
  export = styles
}

declare module '*.svg'
declare module '*.svg?resolve'
declare module '*.png'
