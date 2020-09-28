import Vue from 'vue'

import { KivaUIComponent } from './component'

export type Component = KivaUIComponent
export function install (vue: typeof Vue): void

import { KivaImage } from './components/image'

export { ToastFunc } from './components/toast'
export class Image extends KivaImage {}
