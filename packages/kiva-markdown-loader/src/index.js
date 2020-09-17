const loaderUtils = require('loader-utils')
const MarkdownIt = require('markdown-it')
const grayMatter = require('gray-matter')
const highlight = require('highlight.js')
const hljsDefineVue = require("highlightjs-vue")

const htmlToVue = require('./htmlToVue')
const cardWrapper = require('./kivaCardWrapper')
const addAuthor = require('./addAuthor')

hljsDefineVue(highlight)
const markdownParser = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight: (str, lang) => {
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

  },
})

module.exports = function(source) {
  let options = loaderUtils.getOptions(this) || {}

  const { content, data: frontMatter } = grayMatter(source)
  source = content

  // TODO: 为何重复调用 3 次
  // console.log('=== kiva markdown loader ===', frontMatter)
  let htmlString = markdownParser.render(source)

  htmlString = addAuthor(htmlString)

  if (options.useCardWrapper) htmlString = cardWrapper(htmlString)

  return htmlToVue(htmlString, frontMatter)

}
