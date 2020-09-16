import { components } from './components'
import getStyles from './styles'

getStyles()
console.log('=== components ===', components)

function install(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    const component = components[key]
    Vue.component(component.name, component)
  })
}

export default {
  install,
}
