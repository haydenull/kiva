import Vue from 'vue'

import { KivaUIComponent } from './component'

export type Component = KivaUIComponent
export function install (vue: typeof Vue): void

import { KivaImage } from './components/image'
import { KivaToast } from './components/toast'

export class Image extends KivaImage {}
export class Toast extends KivaToast {}

declare module 'vue/types/vue' {
  interface Vue {
    $toast(options: object | string): Toast
  }
}