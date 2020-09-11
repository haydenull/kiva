const loaderUtils = require('loader-utils')
const MarkdownIt = require('markdown-it')
const grayMatter = require('gray-matter')
const highlight = require('highlight.js')

const htmlToVue = require('./htmlToVue')
const cardWrapper = require('./kivaCardWrapper')

const markdownParser = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight: (str, lang) => {
    // let res = `
    //   <pre class="hljs" lang="${lang}">
    //   <code>${str}<code>
    // </pre>
    // `
    // if (lang && highlight.getLanguage(lang)) {
    //   try {
    //     // return highlight.highlight(lang, str).value
    //     res = `
    //       <pre class="hljs" lang="${lang}">
    //         <code>${highlight.highlight(lang, str, true).value}<code>
    //       </pre>
    //     `
    //   } catch (error) {}
    // }
    // return res
    if (lang && highlight.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
        highlight.highlight(lang, str, true).value +
               '</code></pre>';
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

  if (options.useCardWrapper) htmlString = cardWrapper(htmlString)

  return htmlToVue(htmlString, frontMatter)

}
