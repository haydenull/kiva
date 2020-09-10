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
    if (lang && highlight.getLanguage(lang)) {
      try {
        return highlight.highlight(lang, str).value
      } catch (error) {
        return str
      }
    }
    return str
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
