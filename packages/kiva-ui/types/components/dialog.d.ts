import Vue from 'vue'

export type DialogOptions = {
  /** 标题 */
  title?: string

  /** 内容文案 */
  message: string

  /** 取消按钮文案 */
  cancelText?: string

  /** 确认按钮文案 */
  confirmText?: string

  /** 是否显示取消按钮 */
  showCancel?: boolean

  /** 确认按钮回调 */
  confirm?: Function

  /** 取消按钮回调 */
  cancel?: Function
}

export class KivaDialog {
  /** 是否显示 dialog */
  show: boolean

  /** 标题 */
  title?: string

  /** 内容文案 */
  message: string

  /** 取消按钮文案 */
  cancelText?: string

  /** 确认按钮文案 */
  confirmText?: string

  /** 是否显示取消按钮 */
  showCancel?: boolean
}

export interface DialogFunc {
  (options: DialogOptions): KivaDialog
  install(vue: typeof Vue): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: DialogFunc
  }
}
