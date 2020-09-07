import Button from './components/button'

const components = {
  Button,
}

function install(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    const component = components[key]
    Vue.component(component.name, component)
  })
}

export default {
  install,
  ...components,
}
