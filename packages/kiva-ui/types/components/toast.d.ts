import { KivaUIComponent } from '../component'

// export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export declare class KivaToast extends KivaUIComponent {
  /** 内容文案 */
  message: string

  /** 持续时间 */
  duration?: number
}