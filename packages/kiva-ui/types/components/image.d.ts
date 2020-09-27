import { KivaUIComponent } from '../component'

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export declare class KivaImage extends KivaUIComponent {
  /** 图片资源地址 */
  src: 'string'

  /** 图片填充模式 */
  fit?: ImageFit

  /** 是否显示为圆角 */
  round?: boolean
}