import { VNode } from 'vue'
import { KivaUIComponent } from '../component'

export interface MaskSlots {
  /** mask 的内容 */
  default?: VNode[]

  [propName: string]: VNode[]
}

export class Mask extends KivaUIComponent {
  /** 是否显示 mask */
  show: boolean

  /** 是否允许蒙层内部滚动 */
  allowInnerScroll: boolean

  /** 组件 z-index */
  zIndex: number
}
