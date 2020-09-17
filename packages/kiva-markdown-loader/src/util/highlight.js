const highlight = require('highlight.js')
const hljsDefineVue = require('./highlight-vue')

hljsDefineVue(highlight)
module.exports = (str, lang) => {
  // let res = `<pre class="hljs"><code lang="${lang}">${str}<code></pre>`
  // if (lang && highlight.getLanguage(lang)) {
  //   try {
  //     // return highlight.highlight(lang, str).value
  //     // 此处不可换行,否则会重复生成 pre code 标签
  //     res = `<pre class="hljs"><code lang="${lang}">${highlight.highlight(lang, str, true).value}<code></pre>`
  //   } catch (error) {}
  // }
  // return res


  if (lang && highlight.getLanguage(lang)) {
    try {
      return '<pre><code class="hljs" lang="' + lang + '">'
      + highlight.highlight(lang, str, true).value
      + '</code></pre>';
    } catch (__) {}
  }

  return '<pre class="hljs"><code>' + markdownParser.utils.escapeHtml(str) + '</code></pre>';

}
