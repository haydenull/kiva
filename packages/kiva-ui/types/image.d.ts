import { VNode } from 'vue'
import { KivaUIComponent } from './component'

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export interface ImageSlots {
  /** 自定义加载中 */
  loading: VNode[]

  /** 自定义加载失败 */
  error: VNode[]

  [propName: string]: VNode[]
}

export declare class KivaImage extends KivaUIComponent {
  /** 图片资源地址 */
  src: 'string'

  /** 图片填充模式 */
  fit?: ImageFit

  /** 是否显示为圆角 */
  round?: boolean

  $slots: ImageSlots
}
