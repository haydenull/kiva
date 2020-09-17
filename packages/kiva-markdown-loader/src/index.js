const loaderUtils = require('loader-utils')
const MarkdownIt = require('markdown-it')
const grayMatter = require('gray-matter')

const highlight = require('./util/highlight')
const htmlToVue = require('./util/htmlToVue')
const cardWrapper = require('./util/kivaCardWrapper')
const addAuthor = require('./util/addAuthor')

const markdownParser = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight,
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
