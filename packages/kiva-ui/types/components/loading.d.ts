import { VNode } from 'vue'
import { KivaUIComponent } from '../component'

export type LoadingMode = 'inline' | 'block'

export interface LoadingSlots {
  /** 自定义加载中 */
  default?: VNode[]

  [propName: string]: VNode[]
}

export class KivaLoading extends KivaUIComponent {
  /** 文字尺寸 */
  textSize?: string

  /** 文字颜色 */
  color?: string

  /** 是否单独占据一行 */
  mode?: LoadingMode

  $slots: LoadingSlots
}
