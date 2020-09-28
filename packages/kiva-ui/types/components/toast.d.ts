import Vue from 'vue'
import { KivaUIComponent } from '../component'

// export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export type ToastPosition = 'top' | 'center' | 'bottom'

export type ToastOptions = {
  /** 内容文案 */
  message: string

  /** 持续时间 */
  duration?: number

  /** toast 位置 */
  position?: ToastPosition
}

export class KivaToast extends Vue {
  /** 内容文案 */
  message: string

  /** 持续时间 */
  duration?: number

  /** toast 位置 */
  position?: ToastPosition
}

export interface ToastFunc {
  (message: ToastOptions | string): KivaToast
  install(vue: typeof Vue): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: ToastFunc
  }
}
