import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
    // NOTE: 忽略第三方非注册组件入参结构
    type LibraryManagedAttributes<C, P> = { [name: string]: any }
  }
}
