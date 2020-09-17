// https://github.com/highlightjs/highlightjs-vue/blob/master/vue.js
// fork 自 https://github.com/highlightjs/highlightjs-vue
// 由于其打包产出代码不符合 cmd 规范,故而在这里 clone 一份, 也方便以后扩展

/*
Language: Vue.js
Requires: xml.js, javascript.js, typescript.js, css.js, stylus.js, scss.js
Author: Sara Lissette Luis Ibáñez <lissette.ibnz@gmail.com>
Description: Single-File Components of Vue.js Framework
*/
function hljsDefineVue(hljs) {
  return {
    subLanguage: "xml",
    contains: [
      hljs.COMMENT("<!--", "-->", {
        relevance: 10,
      }),
      {
        begin: /^(\s*)(<script>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: "javascript",
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        begin: /^(\s*)(<script lang=["']ts["']>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: "typescript",
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        begin: /^(\s*)(<style(\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "css",
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        begin: /^(\s*)(<style lang=["'](scss|sass)["'](\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "scss",
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        begin: /^(\s*)(<style lang=["']stylus["'](\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "stylus",
        excludeBegin: true,
        excludeEnd: true,
      },
    ],
  }
}

module.exports = function(hljs) {
  hljs.registerLanguage("vue", hljsDefineVue)
}
