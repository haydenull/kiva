import { VNode } from 'vue'
import { KivaUIComponent } from '../component'

export interface ListSlots {
  /** 列表内容 */
  default: VNode[]

  [propName: string]: VNode[]
}

export class List extends KivaUIComponent {
  /** 是否处于加载中状态 */
  loading: boolean

  /** 是否已加载完成 */
  finished: boolean

  /** 是都加载失败 */
  error: boolean

  /** 滚动条与底部距离小于 offset 时触发 load 事件 */
  offset: number | string

  /** 是否初始化时立即检查滚动位置 */
  immediateCheck: boolean

  $slots: ListSlots

  /** 检查当前的滚动位置，若已滚动至底部，则会触发 load 事件 */
  check(): void
}
