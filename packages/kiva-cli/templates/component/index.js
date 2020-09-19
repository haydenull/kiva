import <%= pascalCaseName %> from './src/index.vue'

<%= pascalCaseName %>.install = function(Vue) {
  Vue.component(<%= pascalCaseName %>.name, <%= pascalCaseName %>)
}

export default <%= pascalCaseName %>