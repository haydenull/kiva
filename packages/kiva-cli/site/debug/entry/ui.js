import { components } from './components'
import getStyles from './styles'

getStyles()

function install(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    const component = components[key]
    if (component.install) return component.install(Vue)
    Vue.component(component.name, component)
  })
}

export default {
  install,
}
